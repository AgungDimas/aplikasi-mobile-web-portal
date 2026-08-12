import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health API
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat / Gemini API Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Pesan wajib diisi' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Anda adalah Asisten Smart App / Kasir / Finansial AI dalam bahasa Indonesia yang ramah, membantu, dan cerdas.
Aplikasi ini adalah "AppStudio Mobile & Web Portal" yang memiliki fitur:
- Isi Pulsa, Paket Data, Token PLN, PDAM (PPOB)
- Toko Digital / E-Commerce Produk Pilihan
- Kasir Digital / POS dengan Struk Pembayaran & QRIS
- Manajer Keuangan (Pemasukan/Pengeluaran)
- Pengatur Jadwal & Catatan Tugas

Tugas Anda:
1. Menjawab pertanyaan pengguna tentang cara menggunakan aplikasi, tips keuangan, rekomendasi produk, atau bantuan umum.
2. Berikan jawaban dalam Bahasa Indonesia yang santun, singkat, rapi, dan mudah dibaca (menggunakan poin-poin/bullet list & emoji jika tepat).
3. Jika ditanya rekomendasi promo, bantu racik kalimat penawaran menarik.`;

    const chat = ai.chats.create({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message });
    const responseText = response.text || 'Maaf, Asisten AI tidak dapat merespon saat ini.';

    return res.json({ reply: responseText });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Gagal terhubung dengan Asisten AI Gemini.',
      details: error?.message || String(error),
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
