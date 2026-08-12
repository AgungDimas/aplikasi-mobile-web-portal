import React, { useState } from 'react';
import { Bot, Send, Sparkles, Copy, Check, RefreshCw, User, ShieldAlert } from 'lucide-react';
import { AiMessage } from '../../types';

export const AiChatTab: React.FC = () => {
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Halo! Saya Asisten AI Studio Gemini. Ada yang bisa saya bantu terkait laporan keuangan, rekomendasi stok produk, atau draft promo toko Anda hari ini? 🚀',
      timestamp: 'Baru saja',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickPrompts = [
    '💡 Buatkan analisis keuangan toko',
    '📢 Racik text promo WhatsApp menarik',
    '📦 Rekomendasi produk terlaris',
    '❓ Cara isi pulsa & token PLN',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMsg: AiMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      const aiReplyText = data.reply || data.error || 'Maaf, terjadi masalah saat memproses tanggapan.';

      const aiMsg: AiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: AiMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Gagal terhubung dengan server Asisten AI. Pastikan koneksi internet aktif.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] p-3 text-slate-100 animate-fade-in">
      {/* Header Badge */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-between shrink-0 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              Asisten AI Studio
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            </h3>
            <p className="text-[10px] text-slate-400">Gemini 3.6 Flash Server-Side</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-800 mb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed relative ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/10 text-[9px] text-slate-400">
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:text-white flex items-center gap-0.5 ml-2"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl w-max text-xs text-indigo-400">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Gemini sedang berpikir...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none shrink-0">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[10px] font-medium px-2.5 py-1 rounded-xl whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 shrink-0 pt-1">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Tanya sesuatu ke Asisten AI Gemini..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputPrompt.trim() || isLoading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2 rounded-xl transition-colors shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
