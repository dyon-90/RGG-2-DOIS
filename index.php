<?php
/**
 * Ponto de Entrada Hostinger - Projeto 2+DOIS= Aprender!
 * Carrega a aplicação SPA React compilada
 */

// Sempre responder com status HTTP 200 OK
http_response_code(200);
header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: public, max-age=3600');

// Procurar o index.html compilado em vários caminhos possíveis
$possiblePaths = [
    __DIR__ . '/dist/index.html',
    __DIR__ . '/build/index.html',
    __DIR__ . '/index.html'
];

$loadedHtml = null;

foreach ($possiblePaths as $path) {
    if (file_exists($path) && is_readable($path)) {
        $content = file_get_contents($path);
        // Se contém scripts compilados de produção
        if (strpos($content, '<div id="root"></div>') !== false) {
            $loadedHtml = $content;
            break;
        }
    }
}

if ($loadedHtml !== null) {
    // Ajustar caminhos de assets caso o servidor tenha apenas dist/assets
    if (!is_dir(__DIR__ . '/assets') && is_dir(__DIR__ . '/dist/assets')) {
        $loadedHtml = str_replace('src="./assets/', 'src="./dist/assets/', $loadedHtml);
        $loadedHtml = str_replace('href="./assets/', 'href="./dist/assets/', $loadedHtml);
        $loadedHtml = str_replace('src="/assets/', 'src="/dist/assets/', $loadedHtml);
        $loadedHtml = str_replace('href="/assets/', 'href="/dist/assets/', $loadedHtml);
    }
    echo $loadedHtml;
    exit;
}

// Busca dinâmica dos arquivos JS e CSS nos diretórios de assets
$jsFile = null;
$cssFile = null;

$assetsDirs = [
    __DIR__ . '/assets',
    __DIR__ . '/dist/assets',
    __DIR__ . '/build/assets'
];

foreach ($assetsDirs as $dir) {
    if (is_dir($dir)) {
        $files = scandir($dir);
        if ($files) {
            foreach ($files as $f) {
                if (!$jsFile && preg_match('/^index-.*\.js$/', $f)) {
                    $jsFile = (strpos($dir, 'dist') !== false ? './dist/assets/' : './assets/') . $f;
                }
                if (!$cssFile && preg_match('/^index-.*\.css$/', $f)) {
                    $cssFile = (strpos($dir, 'dist') !== false ? './dist/assets/' : './assets/') . $f;
                }
            }
        }
    }
}

if ($jsFile && $cssFile) {
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

// Fallback informativo limpo (Status 200 OK)
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
    .box {
      background: #1e293b;
      padding: 2.5rem 2rem;
      border-radius: 1.25rem;
      max-width: 520px;
      border: 1px solid #334155;
      box-shadow: 0 20px 35px -10px rgba(0,0,0,0.5);
    }
    h1 { color: #a78bfa; margin: 0 0 0.75rem; font-size: 1.5rem; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0.6rem 0; }
    code { background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 0.375rem; color: #38bdf8; font-size: 0.9em; }
    .badge { display: inline-block; background: #059669; color: white; padding: 0.35rem 0.9rem; border-radius: 9999px; font-size: 0.8rem; font-weight: bold; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="box">
    <div class="badge">Servidor Hostinger Ativo</div>
    <h1>Projeto 2+DOIS= Aprender!</h1>
    <p>O repositório do GitHub foi conectado com sucesso.</p>
    <p>Envie os arquivos compilados da pasta <code>dist/</code> para o seu repositório no GitHub para inicializar a plataforma.</p>
  </div>
</body>
</html>
