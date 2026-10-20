import React from 'react';
import { X, ExternalLink, Sparkles, Phone, Download } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
}

export const FlyerModal: React.FC<FlyerModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] rounded-2xl bg-[#0C101A] border border-cyan-500/50 overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#090D17] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-display font-bold text-white text-sm">
              {lang === 'es'
                ? 'Lista Oficial de Precios (Instagram de G Contreras)'
                : 'Official Price List Flyer (@gcontrerascarwash)'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable image container */}
        <div className="overflow-y-auto flex-1 p-4 bg-black flex items-center justify-center">
          <img
            src={BUSINESS_INFO.assets.flyerScreenshot}
            alt="Official G Contreras Car Wash Price List Graphic"
            className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Footer with actions */}
        <div className="p-4 bg-[#090D17] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            <span>{lang === 'es' ? 'Publicado por el propietario en Instagram' : 'Verified original business graphic'}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Instagram Post</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-cyan-400 text-black font-bold uppercase tracking-wider text-[11px] cursor-pointer hover:bg-cyan-300"
            >
              {lang === 'es' ? 'Entendido' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
