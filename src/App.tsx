import React, { useState } from 'react';
import { ViewMode, PhoneSkin, ActiveTab, Product, CartItem, Transaction, TaskItem } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_TRANSACTIONS,
  INITIAL_TASKS,
} from './data/mockData';
import { HeaderNav } from './components/HeaderNav';
import { MobileFrame } from './components/MobileFrame';
import { WebView } from './components/WebView';
import { AccessAppModal } from './components/AccessAppModal';
import { TopUpModal } from './components/TopUpModal';

import { HomeTab } from './components/tabs/HomeTab';
import { PpobTab } from './components/tabs/PpobTab';
import { ShopTab } from './components/tabs/ShopTab';
import { CashierTab } from './components/tabs/CashierTab';
import { AiChatTab } from './components/tabs/AiChatTab';
import { WalletTab } from './components/tabs/WalletTab';
import { TasksTab } from './components/tabs/TasksTab';
import { SettingsTab } from './components/tabs/SettingsTab';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');
  const [phoneSkin, setPhoneSkin] = useState<PhoneSkin>('iphone-titanium');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [walletBalance, setWalletBalance] = useState<number>(1250000);

  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  // Transaction & Balance operations
  const handleAddTransaction = (trx: Transaction) => {
    setTransactions((prev) => [trx, ...prev]);
  };

  const handleDeductBalance = (amount: number): boolean => {
    if (walletBalance < amount) return false;
    setWalletBalance((prev) => prev - amount);
    return true;
  };

  const handleAddBalance = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
  };

  // Task operations
  const handleAddTask = (task: TaskItem) => {
    setTasks((prev) => [task, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Render current tab content inside mobile frame
  const renderMobileTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeTab
            walletBalance={walletBalance}
            setActiveTab={setActiveTab}
            onOpenTopUp={() => setIsTopUpModalOpen(true)}
            products={products}
            transactions={transactions}
            onQuickBuyProduct={(p) => {
              handleAddToCart(p);
              setActiveTab('shop');
            }}
          />
        );
      case 'ppob':
        return (
          <PpobTab
            walletBalance={walletBalance}
            onAddTransaction={handleAddTransaction}
            onDeductBalance={handleDeductBalance}
          />
        );
      case 'shop':
        return (
          <ShopTab
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onAddTransaction={handleAddTransaction}
          />
        );
      case 'cashier':
        return (
          <CashierTab products={products} onAddTransaction={handleAddTransaction} />
        );
      case 'ai-chat':
        return <AiChatTab />;
      case 'wallet':
        return (
          <WalletTab
            walletBalance={walletBalance}
            transactions={transactions}
            onOpenTopUp={() => setIsTopUpModalOpen(true)}
          />
        );
      case 'tasks':
        return (
          <TasksTab
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'settings':
        return (
          <SettingsTab
            phoneSkin={phoneSkin}
            setPhoneSkin={setPhoneSkin}
            onOpenAccessModal={() => setIsAccessModalOpen(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Header Bar */}
      <HeaderNav
        viewMode={viewMode}
        setViewMode={setViewMode}
        phoneSkin={phoneSkin}
        setPhoneSkin={setPhoneSkin}
        walletBalance={walletBalance}
        onOpenTopUp={() => setIsTopUpModalOpen(true)}
        onOpenAccessModal={() => setIsAccessModalOpen(true)}
      />

      {/* Main Content: Simulator HP or Full Web Screen */}
      <main className="w-full">
        {viewMode === 'mobile' ? (
          <MobileFrame
            phoneSkin={phoneSkin}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          >
            {renderMobileTabContent()}
          </MobileFrame>
        ) : (
          <WebView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            walletBalance={walletBalance}
            onOpenTopUp={() => setIsTopUpModalOpen(true)}
            onOpenAccessModal={() => setIsAccessModalOpen(true)}
            products={products}
            cart={cart}
            transactions={transactions}
            tasks={tasks}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onAddTransaction={handleAddTransaction}
            onDeductBalance={handleDeductBalance}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            phoneSkin={phoneSkin}
            setPhoneSkin={setPhoneSkin}
          />
        )}
      </main>

      {/* Modals */}
      <AccessAppModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />

      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onAddBalance={handleAddBalance}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
