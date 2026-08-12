import React, { useState } from 'react';
import { Zap, Smartphone, CheckCircle2, ShieldAlert, ArrowRight, QrCode } from 'lucide-react';
import { PpobItem, Transaction } from '../../types';
import { INITIAL_PPOB_ITEMS } from '../../data/mockData';

interface PpobTabProps {
  walletBalance: number;
  onAddTransaction: (trx: Transaction) => void;
  onDeductBalance: (amount: number) => boolean;
}

export const PpobTab: React.FC<PpobTabProps> = ({
  walletBalance,
  onAddTransaction,
  onDeductBalance,
}) => {
  const [targetNumber, setTargetNumber] = useState('081234567890');
  const [selectedCategory, setSelectedCategory] = useState<'pulsa' | 'data' | 'pln' | 'pdam'>('pulsa');
  const [selectedItem, setSelectedItem] = useState<PpobItem | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto detect provider from phone prefix
  const detectProvider = (num: string) => {
    if (num.startsWith('0811') || num.startsWith('0812') || num.startsWith('0813') || num.startsWith('0821') || num.startsWith('0852')) {
      return { name: 'Telkomsel', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    }
    if (num.startsWith('0855') || num.startsWith('0856') || num.startsWith('0857') || num.startsWith('0858')) {
      return { name: 'Indosat IM3', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    }
    if (num.startsWith('0817') || num.startsWith('0818') || num.startsWith('0819') || num.startsWith('0859') || num.startsWith('0877')) {
      return { name: 'XL Axiata', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
    if (num.startsWith('0895') || num.startsWith('0896') || num.startsWith('0897') || num.startsWith('0898')) {
      return { name: 'Tri (3)', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
    }
    return { name: 'Operator Otomatis', color: 'bg-slate-800 text-slate-300 border-slate-700' };
  };

  const detected = detectProvider(targetNumber);

  const filteredItems = INITIAL_PPOB_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOpenCheckout = (item: PpobItem) => {
    if (!targetNumber || targetNumber.length < 8) {
      setErrorMsg('Masukkan nomor HP / ID Pelanggan yang valid (min. 8 digit)');
      return;
    }
    setErrorMsg('');
    setSelectedItem(item);
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedItem) return;

    if (walletBalance < selectedItem.price) {
      setErrorMsg('Saldo tidak mencukupi! Silakan lakukan Top Up terlebih dahulu.');
      return;
    }

    const success = onDeductBalance(selectedItem.price);
    if (!success) return;

    const newTrx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'PPOB',
      title: `${selectedItem.title}`,
      amount: selectedItem.price,
      status: 'SELESAI',
      date: 'Baru saja',
      paymentMethod: 'Saldo Pay',
      receiptNumber: `RC-${Date.now()}`,
      details: `Nomor Tujuan: ${targetNumber}`,
    };

    onAddTransaction(newTrx);
    setPaymentSuccess(true);

    setTimeout(() => {
      setPaymentSuccess(false);
      setIsCheckoutModalOpen(false);
      setSelectedItem(null);
    }, 2000);
  };

  return (
    <div className="p-3.5 space-y-4 text-slate-100 animate-fade-in pb-10">
      {/* PPOB Banner Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-4 rounded-2xl text-slate-950 font-bold shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] bg-slate-950 text-amber-400 font-bold px-2 py-0.5 rounded-full">
            Layanan PPOB 24 Jam
          </span>
          <h2 className="text-sm font-extrabold text-white mt-1">Isi Pulsa, Paket Data & Token PLN</h2>
          <p className="text-[11px] text-amber-100 font-normal">Proses cepat serba 3 detik dengan konfirmasi otomatis.</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-950/20 text-white flex items-center justify-center">
          <Zap className="w-6 h-6 text-amber-300" />
        </div>
      </div>

      {/* Target Number / ID Customer Input Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>
            {selectedCategory === 'pln'
              ? 'ID Pelanggan / Meteran PLN'
              : selectedCategory === 'pdam'
              ? 'Nomor Pelanggan PDAM'
              : 'Nomor HP Tujuan'}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${detected.color}`}>
            {detected.name}
          </span>
        </label>

        <div className="relative">
          <Smartphone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={targetNumber}
            onChange={(e) => setTargetNumber(e.target.value)}
            placeholder="Contoh: 081234567890"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono tracking-wider"
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-400 font-medium flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{errorMsg}</span>
          </p>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['pulsa', 'data', 'pln', 'pdam'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'pulsa' && '📱 Pulsa'}
            {cat === 'data' && '🌐 Paket Data'}
            {cat === 'pln' && '⚡ Token PLN'}
            {cat === 'pdam' && '💧 PDAM'}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between hover:border-slate-700 transition-colors"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {item.nominal}
              </span>
              <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
              <p className="text-[10px] text-slate-400">{item.description}</p>
            </div>

            <div className="text-right flex flex-col items-end gap-1">
              <span className="text-xs font-extrabold text-emerald-400">
                Rp {item.price.toLocaleString('id-ID')}
              </span>
              <button
                onClick={() => handleOpenCheckout(item)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-md active:scale-95"
              >
                <span>Beli</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Confirmation Modal */}
      {isCheckoutModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 text-white space-y-4 shadow-2xl relative">
            <h3 className="text-sm font-bold border-b border-slate-800 pb-2">Konfirmasi Pembelian PPOB</h3>

            {paymentSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-emerald-400">Transaksi Berhasil!</h4>
                <p className="text-xs text-slate-300">
                  {selectedItem.title} untuk {targetNumber} telah aktif.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Produk:</span>
                    <span className="font-semibold text-white">{selectedItem.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tujuan:</span>
                    <span className="font-mono text-amber-300">{targetNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Metode Bayar:</span>
                    <span className="font-semibold text-emerald-400">Saldo Pay</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold">
                    <span>Total Bayar:</span>
                    <span className="text-emerald-400">Rp {selectedItem.price.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 py-2 rounded-xl text-xs font-bold shadow-md"
                  >
                    Bayar Sekarang
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
