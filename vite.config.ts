import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { emailApiPlugin } from './vite-plugins/emailApi';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Only use email plugin in development (for local dev server)
    // In production (Vercel), use the serverless function in api/
    const plugins = mode === 'development' 
      ? [react(), emailApiPlugin(env.MAILERSEND_KEY)]
      : [react()];
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins,
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.OPENAI_API_KEY': JSON.stringify(env.OPENAI_API_KEY),
        'process.env.MAILERSEND_KEY': JSON.stringify(env.MAILERSEND_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
