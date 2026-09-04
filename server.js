import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Locate production build folder (dist or build)
let staticDir = path.join(__dirname, 'dist');
if (!fs.existsSync(staticDir) && fs.existsSync(path.join(__dirname, 'build'))) {
  staticDir = path.join(__dirname, 'build');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

if (fs.existsSync(staticDir)) {
  app.use(express.static(staticDir));

  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
  });
} else {
  // Graceful fallback if build hasn't run yet
  app.get('*', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Iniciando Aplicação...</title></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc;">
          <div style="text-align: center; max-width: 480px; padding: 24px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h2 style="color: #4f46e5;">Projeto 2+DOIS= Aprender!</h2>
            <p style="color: #64748b;">A aplicação está inicializando. Por favor, certifique-se de executar <code>npm run build</code> ou recarregar em instantes.</p>
          </div>
        </body>
      </html>
    `);
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Hostinger Server] Servidor iniciado na porta ${PORT}`);
  console.log(`[Hostinger Server] Diretório estático: ${staticDir}`);
});
