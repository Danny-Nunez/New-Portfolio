import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { emailApiPlugin } from './vite-plugins/emailApi';
import { chatApiPlugin } from './vite-plugins/chatApi';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Only use API plugins in development (for local dev server)
    // In production (Vercel), use the serverless functions in api/
    const plugins = mode === 'development'
      ? [react(), emailApiPlugin(env.MAILERSEND_KEY), chatApiPlugin(env.OPENAI_API_KEY)]
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
        // OPENAI_API_KEY is never exposed to the client; chat uses server-side /api/chat
        'process.env.MAILERSEND_KEY': JSON.stringify(env.MAILERSEND_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
