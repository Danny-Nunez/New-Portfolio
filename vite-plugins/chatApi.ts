import type { Plugin } from 'vite';
import OpenAI from 'openai';

export function chatApiPlugin(openaiApiKey: string | undefined): Plugin {
  return {
    name: 'chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            if (!openaiApiKey) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Chat service not configured. Set OPENAI_API_KEY in .env' }));
              return;
            }

            const { messages } = JSON.parse(body || '{}');
            if (!Array.isArray(messages) || messages.length === 0) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Missing or invalid messages' }));
              return;
            }

            const openai = new OpenAI({ apiKey: openaiApiKey });
            const response = await openai.chat.completions.create({
              model: 'gpt-4o',
              messages,
              temperature: 0.7,
              max_tokens: 150,
            });

            const text =
              response.choices[0]?.message?.content ?? "I'm sorry, I couldn't process that. Please try again!";
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ content: text }));
          } catch (err: unknown) {
            console.error('Chat API error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : 'Technical error. Please try again later.',
              })
            );
          }
        });
      });
    },
  };
}
