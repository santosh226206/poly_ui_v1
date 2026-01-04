import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 4200;

// Parse proxy config
const proxyConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'proxy.conf.json'), 'utf8'));

// Apply proxy middleware BEFORE static files
Object.keys(proxyConfig).forEach(context => {
  const options = proxyConfig[context];
  app.use(context, createProxyMiddleware(options));
});

// Serve static files from dist/poly_ui_v1/browser
const staticPath = path.join(__dirname, 'dist/poly_ui_v1/browser');
app.use(express.static(staticPath));

// History API fallback - serve index.html for all unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✓ Dev server running at http://localhost:${PORT}`);
  console.log(`✓ Proxying /users to http://localhost:8081`);
  console.log(`✓ Proxying /auth to http://localhost:8084\n`);
});
