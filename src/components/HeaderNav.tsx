import React from 'react';
import { Smartphone, Monitor, QrCode, PlusCircle, Sparkles, SlidersHorizontal, Download } from 'lucide-react';
import { ViewMode, PhoneSkin } from '../types';

interface HeaderNavProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  phoneSkin: PhoneSkin;
  setPhoneSkin: (skin: PhoneSkin) => void;
  walletBalance: number;
  onOpenTopUp: () => void;
  onOpenAccessModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  viewMode,
  setViewMode,
  phoneSkin,
  setPhoneSkin,
  walletBalance,
  onOpenTopUp,
  onOpenAccessModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white py-3 px-4 sm:px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight leading-none bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                AppStudio Product Business
              </h1>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Mobile App & Web Platform Digitalization for Business
              </p>
            </div>
          </div>

          {/* Balance Pill for Mobile header */}
          <div className="md:hidden flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-full text-xs">
            <span className="text-slate-400">Saldo:</span>
            <span className="font-semibold text-emerald-400">Rp {walletBalance.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* View Mode Controls & App Access */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center w-full md:w-auto">
          {/* Dual View Toggle */}
          <div className="bg-slate-800/90 border border-slate-700 p-1 rounded-xl flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              title="Tampilkan Layar Simulator HP"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Layar HP</span>
            </button>
            <button
              onClick={() => setViewMode('web')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'web'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              title="Tampilkan Layar Web Utuh"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Layar Web</span>
            </button>
          </div>

          {/* Skin selector (if in mobile view) */}
          {viewMode === 'mobile' && (
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">Casing:</span>
              <select
                value={phoneSkin}
                onChange={(e) => setPhoneSkin(e.target.value as PhoneSkin)}
                className="bg-slate-900 border border-slate-700 text-slate-200 rounded-md text-xs px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="iphone-titanium">iPhone Titanium</option>
                <option value="midnight-dark">Midnight Dark</option>
                <option value="rose-gold">Rose Gold</option>
                <option value="silver-steel">Silver Steel</option>
              </select>
            </div>
          )}

          {/* Wallet Balance Pill (Desktop) */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 leading-tight">Saldo Pay</span>
              <span className="font-bold text-emerald-400">Rp {walletBalance.toLocaleString('id-ID')}</span>
            </div>
            <button
              onClick={onOpenTopUp}
              className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-medium"
              title="Isi Saldo"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Top Up</span>
            </button>
          </div>

          {/* App Access / QR Code button */}
          <button
            onClick={onOpenAccessModal}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <QrCode className="w-4 h-4" />
            <span>Akses di HP / APK</span>
          </button>
        </div>
      </div>
    </header>
  );
};
