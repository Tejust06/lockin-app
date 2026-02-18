import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Warn if Gemini API key is not configured
    if (!env.GEMINI_API_KEY) {
      console.warn('⚠️  GEMINI_API_KEY is not set. Gemini API proxy will not work.');
    }
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/gemini': {
            target: 'https://generativelanguage.googleapis.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
            headers: {
              'x-goog-api-key': env.GEMINI_API_KEY || '',
            },
          },
        },
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      test: {
        globals: true,
        environment: 'jsdom',
      },
    };
});
