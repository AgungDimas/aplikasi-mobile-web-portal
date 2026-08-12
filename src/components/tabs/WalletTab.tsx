import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, CreditCard, QrCode, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Transaction } from '../../types';

interface WalletTabProps {
  walletBalance: number;
  transactions: Transaction[];
  onOpenTopUp: () => void;
}

const FINANCIAL_DATA = [
  { day: 'Sen', Pemasukan: 450000, Pengeluaran: 120000 },
  { day: 'Sel', Pemasukan: 680000, Pengeluaran: 250000 },
  { day: 'Rab', Pemasukan: 890000, Pengeluaran: 300000 },
  { day: 'Kam', Pemasukan: 520000, Pengeluaran: 180000 },
  { day: 'Jum', Pemasukan: 1200000, Pengeluaran: 450000 },
  { day: 'Sab', Pemasukan: 1500000, Pengeluaran: 600000 },
  { day: 'Min', Pemasukan: 980000, Pengeluaran: 210000 },
];

export const WalletTab: React.FC<WalletTabProps> = ({
  walletBalance,
  transactions,
  onOpenTopUp,
}) => {
  const [filterType, setFilterType] = useState<string>('Semua');

  const filteredTrx = transactions.filter((t) => {
    if (filterType === 'Semua') return true;
    return t.type === filterType;
  });

  return (
    <div className="p-3.5 space-y-4 text-slate-100 animate-fade-in pb-12">
      {/* Wallet Balance Hero Card */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 p-4 rounded-2xl border border-teal-500/30 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-teal-300 font-bold bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30">
            Dompet Digital Pay
          </span>
          <Wallet className="w-5 h-5 text-teal-400" />
        </div>

        <h2 className="text-xl font-extrabold text-white tracking-tight">
          Rp {walletBalance.toLocaleString('id-ID')}
        </h2>
        <p className="text-[10px] text-slate-400 mt-0.5">Saldo aktif yang siap digunakan untuk belanja & PPOB</p>

        <div className="mt-3 pt-3 border-t border-slate-800 flex gap-2">
          <button
            onClick={onOpenTopUp}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Top Up Saldo</span>
          </button>
        </div>
      </div>

      {/* Financial Analytics Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Grafik Keuangan Pekan Ini</span>
          </h3>
          <span className="text-[10px] text-emerald-400 font-semibold">+18% Pemasukan</span>
        </div>

        <div className="h-40 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={FINANCIAL_DATA}>
              <defs>
                <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                formatter={(val: number) => `Rp ${val.toLocaleString('id-ID')}`}
              />
              <Area type="monotone" dataKey="Pemasukan" stroke="#10b981" fillOpacity={1} fill="url(#colorIn)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions History Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-bold text-slate-300">Riwayat Mutasi Transaksi</h3>

          <div className="flex gap-1">
            {['Semua', 'PPOB', 'TOKO', 'KASIR'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-[10px] px-2 py-0.5 rounded-lg transition-colors ${
                  filterType === type
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredTrx.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] bg-slate-800 text-indigo-400 font-bold px-1.5 py-0.2 rounded">
                    {t.type}
                  </span>
                  <h4 className="font-semibold text-slate-200 text-[11px]">{t.title}</h4>
                </div>
                <p className="text-[10px] text-slate-500">{t.date} • {t.paymentMethod}</p>
              </div>

              <span className="font-bold text-emerald-400 text-xs">
                -Rp {t.amount.toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
