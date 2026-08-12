import React from 'react';
import {
  Smartphone,
  Zap,
  ShoppingBag,
  Calculator,
  Bot,
  Wallet,
  CheckSquare,
  Settings,
  QrCode,
  ArrowUpRight,
  PlusCircle,
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { ActiveTab, Product, Transaction, TaskItem, CartItem } from '../types';
import { HomeTab } from './tabs/HomeTab';
import { PpobTab } from './tabs/PpobTab';
import { ShopTab } from './tabs/ShopTab';
import { CashierTab } from './tabs/CashierTab';
import { AiChatTab } from './tabs/AiChatTab';
import { WalletTab } from './tabs/WalletTab';
import { TasksTab } from './tabs/TasksTab';
import { SettingsTab } from './tabs/SettingsTab';

interface WebViewProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  walletBalance: number;
  onOpenTopUp: () => void;
  onOpenAccessModal: () => void;
  products: Product[];
  cart: CartItem[];
  transactions: Transaction[];
  tasks: TaskItem[];
  onAddToCart: (p: Product) => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  onAddTransaction: (trx: Transaction) => void;
  onDeductBalance: (amt: number) => boolean;
  onAddTask: (task: TaskItem) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  phoneSkin: any;
  setPhoneSkin: any;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | null;
  isNew?: boolean;
}

export const WebView: React.FC<WebViewProps> = ({
  activeTab,
  setActiveTab,
  walletBalance,
  onOpenTopUp,
  onOpenAccessModal,
  products,
  cart,
  transactions,
  tasks,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  onAddTransaction,
  onDeductBalance,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  phoneSkin,
  setPhoneSkin,
}) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Beranda Portal', icon: Smartphone },
    { id: 'ppob', label: 'Isi Pulsa & PLN', icon: Zap },
    { id: 'shop', label: 'Toko Digital', icon: ShoppingBag, badge: cart.length > 0 ? cart.length : null },
    { id: 'cashier', label: 'Kasir Cloud POS', icon: Calculator },
    { id: 'ai-chat', label: 'Asisten AI Gemini', icon: Bot, isNew: true },
    { id: 'wallet', label: 'Laporan Keuangan', icon: Wallet },
    { id: 'tasks', label: 'Daftar Tugas', icon: CheckSquare },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
      {/* Sidebar Navigation (Desktop) */}
      <div className="lg:col-span-1 space-y-4">
        {/* User Card */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 text-slate-950 font-extrabold flex items-center justify-center text-base shadow-md">
              AP
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Ahmad Pengusaha</h3>
              <p className="text-xs text-slate-400">Pro Merchant Partner</p>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Saldo Pay</span>
              <span className="text-base font-extrabold text-emerald-400">
                Rp {walletBalance.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              onClick={onOpenTopUp}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-1.5 rounded-lg text-xs font-bold transition-all shadow-md"
              title="Isi Saldo"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-lg space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.isNew && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                    AI 3.6
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Access via Phone QR Card */}
        <div className="bg-gradient-to-tr from-slate-900 to-indigo-950/60 border border-indigo-500/30 p-4 rounded-2xl space-y-2 text-white">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-400" />
            <h4 className="text-xs font-bold">Layar HP Simulator</h4>
          </div>
          <p className="text-[11px] text-slate-300">
            Ingin lihat bagaimana bentuk layar ini jika dibuka dari HP?
          </p>
          <button
            onClick={onOpenAccessModal}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Buka Simulator HP
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl min-h-[600px]">
        {activeTab === 'home' && (
          <HomeTab
            walletBalance={walletBalance}
            setActiveTab={setActiveTab}
            onOpenTopUp={onOpenTopUp}
            products={products}
            transactions={transactions}
            onQuickBuyProduct={(p) => {
              onAddToCart(p);
              setActiveTab('shop');
            }}
          />
        )}

        {activeTab === 'ppob' && (
          <PpobTab
            walletBalance={walletBalance}
            onAddTransaction={onAddTransaction}
            onDeductBalance={onDeductBalance}
          />
        )}

        {activeTab === 'shop' && (
          <ShopTab
            products={products}
            cart={cart}
            onAddToCart={onAddToCart}
            onUpdateCartQty={onUpdateCartQty}
            onRemoveFromCart={onRemoveFromCart}
            onClearCart={onClearCart}
            onAddTransaction={onAddTransaction}
          />
        )}

        {activeTab === 'cashier' && (
          <CashierTab products={products} onAddTransaction={onAddTransaction} />
        )}

        {activeTab === 'ai-chat' && <AiChatTab />}

        {activeTab === 'wallet' && (
          <WalletTab
            walletBalance={walletBalance}
            transactions={transactions}
            onOpenTopUp={onOpenTopUp}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksTab
            tasks={tasks}
            onAddTask={onAddTask}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            phoneSkin={phoneSkin}
            setPhoneSkin={setPhoneSkin}
            onOpenAccessModal={onOpenAccessModal}
          />
        )}
      </div>
    </div>
  );
};
