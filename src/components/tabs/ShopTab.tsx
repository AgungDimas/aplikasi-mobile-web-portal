import React, { useState } from 'react';
import { ShoppingBag, Search, Star, ShoppingCart, Plus, Minus, Trash2, CheckCircle, QrCode } from 'lucide-react';
import { Product, CartItem, Transaction } from '../../types';

interface ShopTabProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateCartQty: (productId: string, qty: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  onAddTransaction: (trx: Transaction) => void;
}

export const ShopTab: React.FC<ShopTabProps> = ({
  products,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  onAddTransaction,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'GoPay' | 'Dana' | 'BCA'>('QRIS');
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = ['Semua', 'Elektronik', 'Aksesoris', 'Fashion', 'Makanan', 'Digital'];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckoutCart = () => {
    if (cart.length === 0) return;

    const newTrx: Transaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'TOKO',
      title: `Pembelian Toko Digital (${cart.length} barang)`,
      amount: totalCartPrice,
      status: 'SELESAI',
      date: 'Baru saja',
      paymentMethod,
      receiptNumber: `RC-${Date.now()}`,
      details: cart.map((c) => `${c.quantity}x ${c.product.name}`).join(', '),
    };

    onAddTransaction(newTrx);
    setIsSuccess(true);

    setTimeout(() => {
      onClearCart();
      setIsSuccess(false);
      setIsCartOpen(false);
    }, 2000);
  };

  return (
    <div className="p-3.5 space-y-4 text-slate-100 animate-fade-in pb-12">
      {/* Search & Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk toko digital..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl shadow-md transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
          >
            <div>
              <div className="relative rounded-xl overflow-hidden mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-1.5 right-1.5 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <span>{product.rating}</span>
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-100 line-clamp-2 leading-snug">{product.name}</h3>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{product.description}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-emerald-400 block">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-1.5 rounded-lg transition-colors shadow-sm active:scale-95"
                title="Tambah ke Keranjang"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-4 text-white space-y-4 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span>Keranjang Belanja</span>
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕ Tutup
              </button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-emerald-400">Pembayaran Berhasil!</h4>
                <p className="text-xs text-slate-300">Pesanan Anda sedang diproses oleh penjual.</p>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">Keranjang Anda masih kosong.</div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-2.5 max-h-60 pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-emerald-400 font-bold">
                            Rp {item.product.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">
                        <button
                          onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment method */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <label className="text-[11px] text-slate-400 font-medium">Metode Pembayaran:</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['QRIS', 'GoPay', 'Dana', 'BCA'] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                          paymentMethod === method
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Pembayaran:</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      Rp {totalCartPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckoutCart}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md"
                  >
                    Bayar
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
