import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Home, ShoppingBag, Zap, Calculator, Bot, Wallet, CheckSquare, Settings } from 'lucide-react';
import { PhoneSkin, ActiveTab } from '../types';

interface MobileFrameProps {
  children: React.ReactNode;
  phoneSkin: PhoneSkin;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  phoneSkin,
  activeTab,
  setActiveTab,
  cartCount,
}) => {
  const [time, setTime] = useState('09:41');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Skin styling mapping
  const skinStyles: Record<PhoneSkin, { frameBorder: string; outerBg: string; buttonBg: string }> = {
    'iphone-titanium': {
      frameBorder: 'border-slate-600/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]',
      outerBg: 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900',
      buttonBg: 'bg-slate-700',
    },
    'midnight-dark': {
      frameBorder: 'border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]',
      outerBg: 'bg-slate-950',
      buttonBg: 'bg-slate-900',
    },
    'rose-gold': {
      frameBorder: 'border-rose-300/80 shadow-[0_25px_60px_-15px_rgba(244,63,94,0.3)]',
      outerBg: 'bg-gradient-to-b from-rose-200 via-pink-200 to-rose-300',
      buttonBg: 'bg-rose-300',
    },
    'silver-steel': {
      frameBorder: 'border-slate-300 shadow-[0_25px_60px_-15px_rgba(255,255,255,0.2)]',
      outerBg: 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400',
      buttonBg: 'bg-slate-300',
    },
  };

  const currentSkin = skinStyles[phoneSkin] || skinStyles['iphone-titanium'];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-2 min-h-[calc(100vh-80px)]">
      {/* Zoom controls for desktop preview */}
      <div className="mb-3 flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full text-xs text-slate-300">
        <span className="text-slate-400">Ukuran Layar Simulator:</span>
        <button
          onClick={() => setScale(Math.max(0.85, scale - 0.05))}
          className="px-1.5 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-bold"
        >
          -
        </button>
        <span className="font-semibold text-white">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => setScale(Math.min(1.15, scale + 0.05))}
          className="px-1.5 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-bold"
        >
          +
        </button>
        {scale !== 1 && (
          <button
            onClick={() => setScale(1)}
            className="text-[10px] text-indigo-400 underline ml-1"
          >
            Reset
          </button>
        )}
      </div>

      {/* Outer Phone Shell */}
      <div
        className={`relative transition-all duration-300 transform rounded-[50px] p-3 sm:p-3.5 border-[8px] ${currentSkin.frameBorder} ${currentSkin.outerBg} w-full max-w-[390px] h-[780px] flex flex-col justify-between overflow-hidden shadow-2xl`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        {/* Physical Side Buttons Simulation */}
        <div className={`absolute -left-[12px] top-28 w-[4px] h-12 rounded-l-md ${currentSkin.buttonBg}`}></div>
        <div className={`absolute -left-[12px] top-44 w-[4px] h-12 rounded-l-md ${currentSkin.buttonBg}`}></div>
        <div className={`absolute -right-[12px] top-32 w-[4px] h-16 rounded-r-md ${currentSkin.buttonBg}`}></div>

        {/* Screen Viewport Container */}
        <div className="relative w-full h-full bg-slate-900 rounded-[38px] overflow-hidden flex flex-col justify-between shadow-inner">
          {/* Top Notch / Dynamic Island Header */}
          <div className="bg-slate-900 text-white pt-2.5 px-6 pb-1.5 flex items-center justify-between select-none z-30 shrink-0 border-b border-slate-800/50">
            {/* Clock */}
            <span className="text-xs font-semibold tracking-tight">{time}</span>

            {/* Dynamic Notch / Camera Pill */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/50 animate-pulse"></div>
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Main Mobile Screen Scrollable Content */}
          <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 scrollbar-thin scrollbar-thumb-slate-800">
            {children}
          </div>

          {/* Native Mobile Bottom Navigation Bar */}
          <nav className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-around z-30 shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'home' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[10px]">Beranda</span>
            </button>

            <button
              onClick={() => setActiveTab('ppob')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'ppob' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-[10px]">PPOB</span>
            </button>

            <button
              onClick={() => setActiveTab('shop')}
              className={`flex flex-col items-center gap-1 transition-colors relative ${
                activeTab === 'shop' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px]">Toko</span>
            </button>

            <button
              onClick={() => setActiveTab('cashier')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'cashier' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="text-[10px]">Kasir</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-chat')}
              className={`flex flex-col items-center gap-1 transition-colors relative ${
                activeTab === 'ai-chat' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Bot className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              </div>
              <span className="text-[10px]">AI Studio</span>
            </button>
          </nav>

          {/* Bottom Home Indicator Bar */}
          <div className="bg-slate-900 pb-1 flex justify-center shrink-0">
            <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
