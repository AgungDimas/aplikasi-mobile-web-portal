import React, { useState } from 'react';
import { Calculator, Plus, Trash2, Printer, CheckCircle, Receipt, QrCode } from 'lucide-react';
import { Product, Transaction } from '../../types';

interface CashierTabProps {
  products: Product[];
  onAddTransaction: (trx: Transaction) => void;
}

interface RegisterItem {
  name: string;
  price: number;
  qty: number;
}

export const CashierTab: React.FC<CashierTabProps> = ({ products, onAddTransaction }) => {
  const [registerItems, setRegisterItems] = useState<RegisterItem[]>([
    { name: 'Wireless Earbuds Pro', price: 349000, qty: 1 },
  ]);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [cashGiven, setCashGiven] = useState('');
  const [paymentMode, setPaymentMode] = useState<'Tunai' | 'QRIS'>('Tunai');
  const [receiptTrx, setReceiptTrx] = useState<Transaction | null>(null);

  const subtotal = registerItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.11);
  const grandTotal = subtotal + tax;

  const handleAddProductToRegister = (p: Product) => {
    const existing = registerItems.find((i) => i.name === p.name);
    if (existing) {
      setRegisterItems(
        registerItems.map((i) => (i.name === p.name ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setRegisterItems([...registerItems, { name: p.name, price: p.price, qty: 1 }]);
    }
  };

  const handleAddCustomItem = () => {
    if (!customName || !customPrice) return;
    const priceNum = parseInt(customPrice, 10);
    if (isNaN(priceNum) || priceNum <= 0) return;

    setRegisterItems([...registerItems, { name: customName, price: priceNum, qty: 1 }]);
    setCustomName('');
    setCustomPrice('');
  };

  const handleRemoveItem = (index: number) => {
    setRegisterItems(registerItems.filter((_, i) => i !== index));
  };

  const handleCheckoutPOS = () => {
    if (registerItems.length === 0) return;

    const newTrx: Transaction = {
      id: `POS-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'KASIR',
      title: `Transaksi Kasir POS (${registerItems.length} item)`,
      amount: grandTotal,
      status: 'SELESAI',
      date: 'Baru saja',
      paymentMethod: paymentMode,
      receiptNumber: `RC-${Date.now()}`,
      details: registerItems.map((i) => `${i.qty}x ${i.name}`).join(', '),
    };

    onAddTransaction(newTrx);
    setReceiptTrx(newTrx);
  };

  const changeDue = Math.max(0, (parseInt(cashGiven, 10) || 0) - grandTotal);

  return (
    <div className="p-3.5 space-y-4 text-slate-100 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 border border-emerald-500/30 p-3.5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] font-bold bg-slate-950 text-emerald-400 px-2 py-0.5 rounded-full">
            Mesin Kasir Cloud POS
          </span>
          <h2 className="text-sm font-extrabold text-white mt-1">Sistem Kasir Toko Digital</h2>
          <p className="text-[10px] text-emerald-200">Cetak & kirim struk digital tanpa printer fisik.</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-950/30 text-emerald-400 flex items-center justify-center">
          <Calculator className="w-6 h-6" />
        </div>
      </div>

      {/* Quick Select Product Catalog */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
        <h3 className="text-xs font-bold text-slate-300">Pilih Produk Cepat</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => handleAddProductToRegister(p)}
              className="bg-slate-950 border border-slate-800 hover:border-indigo-500 p-2 rounded-xl text-left min-w-[120px] shrink-0 transition-colors"
            >
              <h4 className="text-[11px] font-semibold text-slate-200 line-clamp-1">{p.name}</h4>
              <span className="text-[10px] font-bold text-emerald-400">
                Rp {p.price.toLocaleString('id-ID')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Item Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
        <h3 className="text-xs font-bold text-slate-300">Tambah Item Manual</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Nama Barang..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500"
          />
          <input
            type="number"
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
            placeholder="Harga..."
            className="w-24 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500"
          />
          <button
            onClick={handleAddCustomItem}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl text-xs font-bold"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
          Daftar Belanja Kasir
        </h3>

        {registerItems.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">Belum ada item di kasir.</p>
        ) : (
          <div className="space-y-2">
            {registerItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-2 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-semibold text-slate-200 text-[11px]">{item.name}</h4>
                  <span className="text-[10px] text-slate-400">
                    {item.qty}x @ Rp {item.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-400 text-xs">
                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calculation Summary */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal:</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>PPN (11%):</span>
            <span>Rp {tax.toLocaleString('id-ID')}</span>
          </div>
          <div className="border-t border-slate-800 pt-1.5 flex justify-between font-extrabold text-sm">
            <span>Grand Total:</span>
            <span className="text-emerald-400">Rp {grandTotal.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Payment mode */}
        <div className="space-y-2 pt-1">
          <div className="flex gap-2">
            <button
              onClick={() => setPaymentMode('Tunai')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold border ${
                paymentMode === 'Tunai'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              💵 Cash / Tunai
            </button>
            <button
              onClick={() => setPaymentMode('QRIS')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold border ${
                paymentMode === 'QRIS'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              📲 QRIS Scan
            </button>
          </div>

          {paymentMode === 'Tunai' && (
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={cashGiven}
                onChange={(e) => setCashGiven(e.target.value)}
                placeholder="Uang diterima..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500"
              />
              <span className="text-xs text-emerald-400 font-bold whitespace-nowrap">
                Kembali: Rp {changeDue.toLocaleString('id-ID')}
              </span>
            </div>
          )}

          <button
            onClick={handleCheckoutPOS}
            disabled={registerItems.length === 0}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
          >
            Cetak Struk & Selesaikan Transaksi
          </button>
        </div>
      </div>

      {/* Printable Digital Receipt Modal */}
      {receiptTrx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-xs p-5 space-y-4 shadow-2xl relative font-mono text-xs">
            <div className="text-center space-y-1 border-b border-dashed border-slate-300 pb-3">
              <h3 className="font-extrabold text-sm uppercase">TOKO APPSTUDIO DIGITAL</h3>
              <p className="text-[10px] text-slate-600">Jl. Teknologi No. 8, Jakarta Pusat</p>
              <p className="text-[10px] text-slate-500">No. Struk: {receiptTrx.receiptNumber}</p>
              <p className="text-[10px] text-slate-500">{receiptTrx.date}</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-slate-700">Rincian Item:</p>
              <p className="text-[10px] text-slate-800">{receiptTrx.details}</p>
            </div>

            <div className="border-t border-dashed border-slate-300 pt-2 space-y-1 text-right">
              <div className="flex justify-between font-bold">
                <span>TOTAL:</span>
                <span>Rp {receiptTrx.amount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>Metode:</span>
                <span>{receiptTrx.paymentMethod}</span>
              </div>
            </div>

            <div className="text-center pt-2 border-t border-dashed border-slate-300 space-y-2">
              <p className="text-[10px] font-semibold text-slate-600">Terima kasih atas kunjungan Anda!</p>
              <button
                onClick={() => {
                  setReceiptTrx(null);
                  setRegisterItems([]);
                }}
                className="w-full bg-slate-900 text-white font-sans font-bold py-2 rounded-xl text-xs"
              >
                Tutup Struk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
