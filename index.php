<?php
/**
 * Ponto de Entrada para Produção - Projeto 2+DOIS= Aprender!
 * 
 * Suporta múltiplos caminhos de compilação (dist/, build/, out/, etc.),
 * resolução inteligente de recursos estáticos, fallback para SPAs e
 * compatibilidade total com servidores Apache/LiteSpeed (Hostinger).
 */

// Obter URI limpa da requisição (sem query string)
$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$requestUri = rawurldecode($requestUri);

// -----------------------------------------------------------------------------
// 1. RESOLUÇÃO DIRETA DE RECURSOS ESTÁTICOS VIA PHP (Caso o rewrite envie para cá)
// -----------------------------------------------------------------------------
$extension = strtolower(pathinfo($requestUri, PATHINFO_EXTENSION));

$mimeTypes = [
    'js'    => 'application/javascript; charset=utf-8',
    'mjs'   => 'application/javascript; charset=utf-8',
    'css'   => 'text/css; charset=utf-8',
    'json'  => 'application/json; charset=utf-8',
    'svg'   => 'image/svg+xml',
    'png'   => 'image/png',
    'jpg'   => 'image/jpeg',
    'jpeg'  => 'image/jpeg',
    'gif'   => 'image/gif',
    'webp'  => 'image/webp',
    'ico'   => 'image/x-icon',
    'woff'  => 'font/woff',
    'woff2' => 'font/woff2',
    'ttf'   => 'font/ttf',
    'eot'   => 'application/vnd.ms-fontobject',
    'map'   => 'application/json'
];

if (!empty($extension) && isset($mimeTypes[$extension])) {
    $cleanPath = ltrim($requestUri, '/');
    $basename = basename($cleanPath);

    // Múltiplos caminhos possíveis onde o recurso físico pode estar
    $assetCandidates = [
        __DIR__ . '/' . $cleanPath,
        __DIR__ . '/dist/' . $cleanPath,
        __DIR__ . '/build/' . $cleanPath,
        __DIR__ . '/assets/' . $basename,
        __DIR__ . '/dist/assets/' . $basename,
        __DIR__ . '/build/assets/' . $basename
    ];

    foreach ($assetCandidates as $candidate) {
        if (file_exists($candidate) && is_file($candidate)) {
            http_response_code(200);
            header('Content-Type: ' . $mimeTypes[$extension]);
            header('Content-Length: ' . filesize($candidate));
            header('Cache-Control: public, max-age=31536000, immutable');
            readfile($candidate);
            exit;
        }
    }
}

// -----------------------------------------------------------------------------
// 2. BUSCA DO HTML COMPILADO EM MÚLTIPLOS CAMINHOS DE COMPILAÇÃO
// -----------------------------------------------------------------------------
$buildHtmlCandidates = [
    __DIR__ . '/dist/index.html',
    __DIR__ . '/build/index.html',
    __DIR__ . '/public/index.html',
    __DIR__ . '/out/index.html',
    __DIR__ . '/public_html/dist/index.html',
    __DIR__ . '/public_html/build/index.html'
];

$loadedHtml = null;
$detectedBuildDir = null;

foreach ($buildHtmlCandidates as $candidatePath) {
    if (file_exists($candidatePath) && is_readable($candidatePath)) {
        $content = file_get_contents($candidatePath);
        // Verifica se é o HTML compilado de produção
        if (strpos($content, '<div id="root"></div>') !== false && strpos($content, '<script') !== false) {
            $loadedHtml = $content;
            $detectedBuildDir = basename(dirname($candidatePath)); // ex: 'dist' ou 'build'
            break;
        }
    }
}

// -----------------------------------------------------------------------------
// 3. SE ENCONTROU O HTML COMPILADO: AJUSTA CAMINHOS E ENVIA
// -----------------------------------------------------------------------------
if ($loadedHtml !== null) {
    http_response_code(200);
    header('Content-Type: text/html; charset=UTF-8');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');

    // Determinar prefixo de assets conforme disponibilidade em disco
    $hasRootAssets = is_dir(__DIR__ . '/assets');
    $hasDistAssets = is_dir(__DIR__ . '/dist/assets');
    $hasBuildAssets = is_dir(__DIR__ . '/build/assets');

    // Se os assets estiverem apenas em dist/assets ou build/assets e não na raiz
    if (!$hasRootAssets) {
        if ($hasDistAssets) {
            $loadedHtml = str_replace('src="./assets/', 'src="./dist/assets/', $loadedHtml);
            $loadedHtml = str_replace('href="./assets/', 'href="./dist/assets/', $loadedHtml);
            $loadedHtml = str_replace('src="/assets/', 'src="/dist/assets/', $loadedHtml);
            $loadedHtml = str_replace('href="/assets/', 'href="/dist/assets/', $loadedHtml);
        } elseif ($hasBuildAssets) {
            $loadedHtml = str_replace('src="./assets/', 'src="./build/assets/', $loadedHtml);
            $loadedHtml = str_replace('href="./assets/', 'href="./build/assets/', $loadedHtml);
            $loadedHtml = str_replace('src="/assets/', 'src="/build/assets/', $loadedHtml);
            $loadedHtml = str_replace('href="/assets/', 'href="/build/assets/', $loadedHtml);
        }
    }

    echo $loadedHtml;
    exit;
}

// -----------------------------------------------------------------------------
// 4. DETECÇÃO DINÂMICA DE ARQUIVOS INDEX-*.JS E INDEX-*.CSS
// -----------------------------------------------------------------------------
$jsFile = null;
$cssFile = null;

$assetsDirs = [
    './assets'        => __DIR__ . '/assets',
    './dist/assets'   => __DIR__ . '/dist/assets',
    './build/assets'  => __DIR__ . '/build/assets'
];

foreach ($assetsDirs as $publicPrefix => $diskDir) {
    if (is_dir($diskDir)) {
        $files = scandir($diskDir);
        if ($files) {
            foreach ($files as $file) {
                if (!$jsFile && preg_match('/^index-.*\.js$/i', $file)) {
                    $jsFile = $publicPrefix . '/' . $file;
                }
                if (!$cssFile && preg_match('/^index-.*\.css$/i', $file)) {
                    $cssFile = $publicPrefix . '/' . $file;
                }
            }
        }
    }
}

if ($jsFile && $cssFile) {
    http_response_code(200);
    header('Content-Type: text/html; charset=UTF-8');
    header('Cache-Control: no-cache, no-store, must-revalidate');
?>
<!doctype html>
<html lang="pt-BR" class="h-full">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Projeto 2+DOIS= Aprender!</title>
    <meta name="description" content="Plataforma educacional para gestão escolar, turmas, alunos, atividades, notas, mural de avisos e rankings de desempenho." />
    <meta property="og:title" content="Projeto 2+DOIS= Aprender!" />
    <meta property="og:description" content="Plataforma educacional para gestão escolar, turmas, alunos, atividades, notas, mural de avisos e rankings de desempenho." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script type="module" crossorigin src="<?php echo htmlspecialchars($jsFile); ?>"></script>
    <link rel="stylesheet" crossorigin href="<?php echo htmlspecialchars($cssFile); ?>">
  </head>
  <body class="h-full bg-zinc-50 text-zinc-900 antialiased font-sans selection:bg-indigo-500 selection:text-white">
    <div id="root" class="h-full"></div>
  </body>
</html>
<?php
    exit;
}

// -----------------------------------------------------------------------------
// 5. FALLBACK AMIGÁVEL COM STATUS 200 OK (Sem quebrar o deploy na hospedagem)
// -----------------------------------------------------------------------------
http_response_code(200);
header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projeto 2+DOIS= Aprender - Hostinger</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #0f172a;
      color: #f8fafc;
      text-align: center;
      padding: 1.5rem;
    }
    .card {
      background: #1e293b;
      padding: 2.5rem 2rem;
      border-radius: 1.25rem;
      max-width: 540px;
      border: 1px solid #334155;
      box-shadow: 0 25px 40px -15px rgba(0,0,0,0.6);
    }
    h1 { color: #a78bfa; margin: 0 0 0.75rem; font-size: 1.6rem; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0.6rem 0; }
    code { background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 0.375rem; color: #38bdf8; font-size: 0.9em; }
    .badge { display: inline-block; background: #059669; color: white; padding: 0.35rem 0.9rem; border-radius: 9999px; font-size: 0.8rem; font-weight: bold; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Servidor Hostinger Conectado</div>
    <h1>Projeto 2+DOIS= Aprender!</h1>
    <p>O servidor está ativo e respondendo normalmente.</p>
    <p>Para carregar a aplicação completa, envie os arquivos da pasta <code>dist/</code> para o seu repositório no GitHub e clique em <strong>Implantar</strong> no painel da Hostinger.</p>
  </div>
</body>
</html>
