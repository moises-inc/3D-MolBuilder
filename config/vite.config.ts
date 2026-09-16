import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',
  root: path.resolve(__dirname, '..'),
  plugins: [
    react(),
    {
      name: 'lan-server-check',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            // Comprobar rápido en 150ms si el servidor LAN en 3001 está activo
            const checkReq = http.request(
              { host: '127.0.0.1', port: 3001, path: '/health', method: 'GET', timeout: 150 },
              (checkRes) => {
                if (checkRes.statusCode === 200) {
                  next();
                } else {
                  res.statusCode = 503;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ offline: true, message: 'Servidor LAN offline' }));
                }
              }
            );
            checkReq.on('error', () => {
              // Servidor 3001 inactivo: responder HTTP 503 silenciosamente sin log de error proxy en rojo
              res.statusCode = 503;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ offline: true, message: 'Servidor LAN offline' }));
            });
            checkReq.end();
            return;
          }
          next();
        });
      },
    },
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: path.resolve(__dirname, './tailwind.config.js') }),
        autoprefixer(),
      ],
    },
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 5174,
    host: '0.0.0.0',
  },
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
});

