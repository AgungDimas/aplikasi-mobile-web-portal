import React from 'react';
import {
  Zap,
  ShoppingBag,
  Calculator,
  Bot,
  Wallet,
  CheckSquare,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Gift
} from 'lucide-react';
import { ActiveTab, Product, Transaction } from '../../types';

interface HomeTabProps {
  walletBalance: number;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenTopUp: () => void;
  products: Product[];
  transactions: Transaction[];
  onQuickBuyProduct: (product: Product) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  walletBalance,
  setActiveTab,
  onOpenTopUp,
  products,
  transactions,
  onQuickBuyProduct,
}) => {
  return (
    <div className="p-3.5 space-y-4 text-slate-100 animate-fade-in pb-8">
      {/* User Header Profile & Wallet Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-4 rounded-2xl border border-indigo-500/30 shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold text-sm shadow-md">
              AP
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Selamat datang kembali 👋</p>
              <h2 className="text-sm font-bold text-white flex items-center gap-1">
                CEO Domos <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded border border-emerald-500/30">Pro Merchant</span>
              </h2>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('settings')}
            className="p-1.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-slate-300 text-xs"
          >
            ⚙️
          </button>
        </div>

        {/* Balance Card inside Header */}
        <div className="bg-slate-950/70 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block">Saldo Pay Utuh</span>
            <span className="text-base font-extrabold text-emerald-400 tracking-tight">
              Rp {walletBalance.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTopUp}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md transition-all active:scale-95"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Isi Saldo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Service Shortcuts Grid (6 Key Modules) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-md">
        <h3 className="text-xs font-semibold text-slate-400 mb-2.5 px-1">Layanan Utama</h3>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => setActiveTab('ppob')}
            className="flex flex-col items-center justify-center p-2.5 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all group active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-200">Isi Pulsa & PLN</span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className="flex flex-col items-center justify-center p-2.5 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all group active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-200">Toko Digital</span>
          </button>

          <button
            onClick={() => setActiveTab('cashier')}
            className="flex flex-col items-center justify-center p-2.5 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all group active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-200">Kasir POS</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-chat')}
            className="flex flex-col items-center justify-center p-2.5 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all group active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-200">AI Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className="flex flex-col items-center justify-center p-2.5 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all group active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-200">Keuangan</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className="flex flex-col items-center justify-center p-2.5 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all group active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-200">Tugas / Note</span>
          </button>
        </div>
      </div>

      {/* Promo Banner Card */}
      <div className="bg-gradient-to-r from-teal-900/80 to-emerald-900/80 border border-emerald-500/30 p-3.5 rounded-2xl flex items-center justify-between relative overflow-hidden">
        <div className="space-y-1 max-w-[200px]">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full">
            Promo Gebyar
          </span>
          <h4 className="text-xs font-bold text-white">Diskon PPOB & Bebas Biaya Admin QRIS</h4>
          <p className="text-[10px] text-emerald-200">Gunakan saldo untuk bayar PLN dan pulsa tanpa potongan.</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
          <Gift className="w-6 h-6 animate-bounce" />
        </div>
      </div>

      {/* Recommended Products Carousel Horizontal Scroll */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Produk Terpopuler</span>
          </h3>
          <button
            onClick={() => setActiveTab('shop')}
            className="text-[11px] text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {products.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="min-w-[140px] max-w-[140px] bg-slate-900 border border-slate-800 rounded-xl p-2 flex flex-col justify-between shrink-0 hover:border-slate-700 transition-colors"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-24 object-cover rounded-lg mb-2"
                referrerPolicy="no-referrer"
              />
              <h4 className="text-[11px] font-semibold text-slate-200 line-clamp-1">{item.name}</h4>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
              <button
                onClick={() => onQuickBuyProduct(item)}
                className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold py-1 rounded-lg transition-colors"
              >
                + Beli
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-xs font-bold text-slate-300">Transaksi Terakhir</h3>
          <button
            onClick={() => setActiveTab('wallet')}
            className="text-[11px] text-indigo-400 hover:underline"
          >
            Riwayat
          </button>
        </div>

        <div className="space-y-2">
          {transactions.slice(0, 3).map((trx) => (
            <div
              key={trx.id}
              className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 font-bold text-[10px]">
                  {trx.type}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-[11px] line-clamp-1">{trx.title}</h4>
                  <span className="text-[10px] text-slate-400">{trx.date}</span>
                </div>
              </div>
              <span className="font-bold text-emerald-400 text-xs">
                -Rp {trx.amount.toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
