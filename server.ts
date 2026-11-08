import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the helpful customer & sales assistant for NAD Furniture UAE (NAD Group of Companies).
Key company details:
- Brand: NAD Furniture UAE
- Location: NAD Building, Naif Street, Dubai, UAE (delivering across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain)
- Contact Email: info@nad.furniture
- Phone / WhatsApp: +971 50 631 6560
- Delivery: Prompt delivery across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Both individual orders and bulk project supply are available.
- Core Product Categories:
  1. Labour Camp & Staff Accommodation Furniture: Heavy-duty steel bunk beds (2-tier & 3-tier), single steel beds, 2-door/3-door/4-door/6-door/8-door/12-door steel lockers, and staff room wardrobes.
  2. Office Furniture: Executive office tables, office tables with drawers, L-shaped workstations, 4-person & 6-person modular workstations, ergonomic mesh chairs, and steel filing cabinets.
  3. Bedroom & Home Furniture: King & queen size beds, wooden 2-door and 3-door wardrobes, and coordinated bedroom sets.
- Industries Served: Construction companies, facility management, manpower agencies, real estate developers, labour camps, and government housing projects.

Keep responses concise, helpful, and professional. When customers ask for exact pricing or large bulk orders, encourage them to use the "Request a Bulk Quote" form on the website, email info@nad.furniture, or message +971 50 631 6560 on WhatsApp.`;

interface ChatMessageInput {
  role: 'user' | 'model';
  text: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body as { messages?: ChatMessageInput[] };
      if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'Messages array is required.' });
        return;
      }

      const contents = messages.map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.text || '') }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const reply =
        response.text?.trim() ||
        'Thank you for contacting NAD Furniture UAE. Please reach out to info@nad.furniture or +971 50 631 6560 on WhatsApp for immediate assistance.';

      res.json({ reply });
    } catch (err: unknown) {
      const errorObj = err as { status?: number; message?: string };
      const status = errorObj?.status || 500;
      const message =
        errorObj?.message || 'Unable to process your request right now.';
      res.status(status).json({ error: message });
    }
  });

  const publicDataDir = path.resolve(__dirname, 'public/data');
  const catalogFilePath = path.join(publicDataDir, 'catalog.json');
  if (!fs.existsSync(publicDataDir)) {
    try {
      fs.mkdirSync(publicDataDir, { recursive: true });
    } catch {}
  }

  app.get('/api/catalog', (_req, res) => {
    try {
      if (fs.existsSync(catalogFilePath)) {
        const raw = fs.readFileSync(catalogFilePath, 'utf-8');
        res.json(JSON.parse(raw));
      } else {
        res.json({ products: [] });
      }
    } catch {
      res.json({ products: [] });
    }
  });

  app.post('/api/catalog', (req, res) => {
    try {
      const { products } = req.body;
      if (!Array.isArray(products)) {
        res.status(400).json({ error: 'Expected products array' });
        return;
      }
      fs.writeFileSync(catalogFilePath, JSON.stringify(products, null, 2), 'utf-8');
      res.json({ success: true, count: products.length });
    } catch (err: unknown) {
      res.status(500).json({ error: 'Failed to write catalog file' });
    }
  });

  const publicPath = path.resolve(__dirname, 'public');
  const publicVideosPath = path.resolve(__dirname, 'public/videos');

  app.get('/sitemap.xml', (_req, res) => {
    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.sendFile(path.join(publicPath, 'sitemap.xml'));
  });

  app.get('/robots.txt', (_req, res) => {
    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.sendFile(path.join(publicPath, 'robots.txt'));
  });

  app.use(
    '/videos',
    express.static(publicVideosPath, {
      acceptRanges: true,
      maxAge: '1h',
    })
  );

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
