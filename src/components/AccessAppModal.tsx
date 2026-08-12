import React, { useState } from 'react';
import { X, QrCode, Download, Copy, Check, Smartphone, ShieldCheck, Share2 } from 'lucide-react';

interface AccessAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessAppModal: React.FC<AccessAppModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateDownloadApk = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadSuccess(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsDownloading(false);
        setDownloadSuccess(true);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 text-white shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Akses Aplikasi di HP</h3>
            <p className="text-xs text-slate-400">Pindai QR Code atau Unduh APK Simulator</p>
          </div>
        </div>

        {/* Content Tabs / QR Code */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 mb-5 flex flex-col items-center text-center">
          {/* Simulated High Quality QR Code SVG */}
          <div className="bg-white p-3 rounded-xl shadow-lg mb-3">
            <svg className="w-40 h-40" viewBox="0 0 100 100">
              <path d="M0,0 h30 v30 h-30 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M80,10 h10 v10 h-10 z M0,40 h10 v20 h-10 z M20,40 h30 v10 h-30 z M60,40 h20 v20 h-20 z M90,40 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,70 h20 v10 h-20 z M70,70 h10 v20 h-10 z M90,80 h10 v20 h-10 z M50,90 h30 v10 h-30 z" fill="#0f172a" />
              <rect x="42" y="42" width="16" height="16" rx="4" fill="#10b981" />
            </svg>
          </div>
          <p className="text-xs text-slate-300 font-medium">Scan menggunakan Kamera HP / QR Scanner</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Otomatis membuka web app dalam versi layar penuh tanpa install</p>
        </div>

        {/* Copy Link Section */}
        <div className="space-y-3 mb-5">
          <label className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>Link Web App Tampilan Ponsel:</span>
          </label>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-xs text-slate-300 flex-1 px-2 focus:outline-none overflow-ellipsis"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
            </button>
          </div>
        </div>

        {/* APK Download Button */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold">Installer AppStudio (Android APK)</span>
            </div>
            <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">v2.4.0 • 12 MB</span>
          </div>

          {isDownloading ? (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Mengunduh APK...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : downloadSuccess ? (
            <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs p-2.5 rounded-lg text-center font-medium mt-2">
              ✓ Berhasil diunduh! Buka file 'AppStudio-v2.4.apk' di HP Anda untuk menginstal.
            </div>
          ) : (
            <button
              onClick={handleSimulateDownloadApk}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Simulasi Unduh File APK</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
