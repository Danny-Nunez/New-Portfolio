import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY not set on server');
    res.status(500).json({ error: 'Chat service not configured' });
    return;
  }

  try {
    const { messages } = req.body as {
      messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Missing or invalid messages' });
      return;
    }

    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 150,
    });

    const text = response.choices[0]?.message?.content ?? "I'm sorry, I couldn't process that. Please try again!";
    res.status(200).json({ content: text });
  } catch (err: unknown) {
    console.error('Chat API error:', err);
    res.status(500).json({ error: 'Technical error. Please try again later.' });
  }
}
