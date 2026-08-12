import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, ShieldCheck, Wallet } from 'lucide-react';
import { Transaction } from '../types';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBalance: (amount: number) => void;
  onAddTransaction: (trx: Transaction) => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  onClose,
  onAddBalance,
  onAddTransaction,
}) => {
  const [amount, setAmount] = useState('100000');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'BCA' | 'Mandiri' | 'GoPay'>('QRIS');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTopUp = () => {
    const num = parseInt(amount, 10);
    if (isNaN(num) || num <= 0) return;

    onAddBalance(num);

    const newTrx: Transaction = {
      id: `TOPUP-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'TOPUP',
      title: `Top Up Saldo Pay via ${paymentMethod}`,
      amount: num,
      status: 'SELESAI',
      date: 'Baru saja',
      paymentMethod,
      receiptNumber: `RC-${Date.now()}`,
      details: 'Pengisian saldo instan tanpa potongan admin',
    };

    onAddTransaction(newTrx);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 text-white shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Top Up Saldo Pay</h3>
            <p className="text-xs text-slate-400">Pengisian saldo instan 24 Jam</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold text-emerald-400">Top Up Berhasil!</h4>
            <p className="text-xs text-slate-300">
              Saldo sebesar Rp {parseInt(amount, 10).toLocaleString('id-ID')} telah ditambahkan.
            </p>
          </div>
        ) : (
          <>
            {/* Nominal Buttons */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Pilih Nominal Fast TopUp:</label>
              <div className="grid grid-cols-3 gap-2">
                {['50000', '100000', '250000', '500000', '1000000', '2000000'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      amount === val
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    Rp {(parseInt(val, 10) / 1000).toLocaleString('id-ID')}rb
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">Nominal Lainnya (Rp):</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Payment Method Pills */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Metode Pembayaran:</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['QRIS', 'BCA', 'Mandiri', 'GoPay'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                      paymentMethod === method
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleTopUp}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              Bayar & Tambah Saldo
            </button>
          </>
        )}
      </div>
    </div>
  );
};
