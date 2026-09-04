<?php
/**
 * Ponto de Entrada Hostinger - Projeto 2+DOIS= Aprender!
 * Carrega a aplicação SPA React compilada em dist/
 */

$distIndex = __DIR__ . '/dist/index.html';
$buildIndex = __DIR__ . '/build/index.html';

if (file_exists($distIndex)) {
    header('Content-Type: text/html; charset=UTF-8');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    $html = file_get_contents($distIndex);
    
    // Se a pasta assets estiver apenas dentro de dist/
    if (!file_exists(__DIR__ . '/assets') && file_exists(__DIR__ . '/dist/assets')) {
        $html = str_replace('src="./assets/', 'src="./dist/assets/', $html);
        $html = str_replace('href="./assets/', 'href="./dist/assets/', $html);
    }
    
    echo $html;
    exit;
}

if (file_exists($buildIndex)) {
    header('Content-Type: text/html; charset=UTF-8');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    $html = file_get_contents($buildIndex);
    
    if (!file_exists(__DIR__ . '/assets') && file_exists(__DIR__ . '/build/assets')) {
        $html = str_replace('src="./assets/', 'src="./build/assets/', $html);
        $html = str_replace('href="./assets/', 'href="./build/assets/', $html);
    }
    
    echo $html;
    exit;
}

// Mensagem informativa amigável caso a pasta dist/ ainda não tenha sido gerada
http_response_code(503);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projeto 2+DOIS= Aprender - Configuração Hostinger</title>
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
      padding: 1rem;
    }
    .box {
      background: #1e293b;
      padding: 2.5rem 2rem;
      border-radius: 1.25rem;
      max-width: 520px;
      border: 1px solid #334155;
      box-shadow: 0 20px 35px -10px rgba(0,0,0,0.5);
    }
    h1 { color: #8b5cf6; margin: 0 0 0.75rem; font-size: 1.6rem; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0.5rem 0; }
    code { background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 0.375rem; color: #38bdf8; font-size: 0.9em; }
    .badge { display: inline-block; background: #059669; color: white; padding: 0.3rem 0.8rem; border-radius: 9999px; font-size: 0.8rem; font-weight: bold; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="box">
    <div class="badge">Hostinger Conectada com Sucesso</div>
    <h1>Projeto 2+DOIS= Aprender!</h1>
    <p>O repositório do GitHub foi clonado no servidor.</p>
    <p>Certifique-se de executar <code>npm run build</code> e enviar a pasta <code>dist/</code> para o repositório para inicializar a aplicação.</p>
  </div>
</body>
</html>
