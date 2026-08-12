import React, { useState } from 'react';
import { Settings, Shield, Bell, Moon, Sun, Smartphone, User, Check, QrCode } from 'lucide-react';
import { PhoneSkin } from '../../types';

interface SettingsTabProps {
  phoneSkin: PhoneSkin;
  setPhoneSkin: (skin: PhoneSkin) => void;
  onOpenAccessModal: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  phoneSkin,
  setPhoneSkin,
  onOpenAccessModal,
}) => {
  const [userName, setUserName] = useState('Ahmad Pengusaha');
  const [pin, setPin] = useState('123456');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-3.5 space-y-4 text-slate-100 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Pengaturan Aplikasi</h2>
          <p className="text-[10px] text-slate-400">Atur profil, casing simulator, dan keamanan akun</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
          <User className="w-4 h-4 text-indigo-400" />
          <span>Profil Pengguna</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Nama Pemilik Akun:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white font-medium focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">PIN Transaksi 6-Digit:</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white font-mono tracking-widest focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Phone Skin Customizer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-2">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Casing Simulator HP</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { id: 'iphone-titanium', name: 'iPhone Titanium', color: 'bg-slate-700' },
            { id: 'midnight-dark', name: 'Midnight Dark', color: 'bg-slate-950 border border-slate-700' },
            { id: 'rose-gold', name: 'Rose Gold', color: 'bg-rose-300 text-slate-950' },
            { id: 'silver-steel', name: 'Silver Steel', color: 'bg-slate-300 text-slate-950' },
          ].map((skin) => (
            <button
              key={skin.id}
              onClick={() => setPhoneSkin(skin.id as PhoneSkin)}
              className={`p-2 rounded-xl flex items-center gap-2 font-semibold border transition-all ${
                phoneSkin === skin.id
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-800 bg-slate-950 text-slate-400'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full ${skin.color}`}></div>
              <span className="text-[11px]">{skin.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Access Mobile App Prompt */}
      <div className="bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/30 p-3.5 rounded-2xl space-y-2">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
          <QrCode className="w-4 h-4 text-emerald-400" />
          <span>Buka Aplikasi di HP Beneran</span>
        </h3>
        <p className="text-[10px] text-slate-300">
          Pindai QR code untuk membuka tampilan aplikasi versi penuh langsung di layar HP Android/iOS Anda.
        </p>
        <button
          onClick={onOpenAccessModal}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl text-xs shadow-md"
        >
          Tampilkan QR Code Akses HP
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
      >
        {isSaved ? (
          <>
            <Check className="w-4 h-4 text-emerald-300" />
            <span>Pengaturan Tersimpan!</span>
          </>
        ) : (
          <span>Simpan Perubahan</span>
        )}
      </button>
    </div>
  );
};
