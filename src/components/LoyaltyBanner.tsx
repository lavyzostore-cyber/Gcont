import React from 'react';
import { Award, ArrowRight, Sparkles, MessageSquare, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { useTheme } from '../context/ThemeContext';

interface LoyaltyBannerProps {
  lang: 'en' | 'es';
  onEnquire: () => void;
}

export const LoyaltyBanner: React.FC<LoyaltyBannerProps> = ({ lang, onEnquire }) => {
  const { currentTheme } = useTheme();

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-2xl border p-8 sm:p-12 overflow-hidden shadow-2xl"
          style={{
            backgroundColor: currentTheme.bgCard,
            borderColor: currentTheme.borderFocus,
            boxShadow: `0 20px 50px -10px ${currentTheme.glow}`,
          }}
        >
          {/* Theme glow accents */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: `${currentTheme.primary}15` }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-wider uppercase mb-4"
                style={{
                  backgroundColor: currentTheme.badgeBg,
                  borderColor: currentTheme.borderSubtle,
                  color: currentTheme.primaryLight,
                }}
              >
                <Award className="w-4 h-4" style={{ color: currentTheme.primary }} />
                <span>{lang === 'es' ? 'PROGRAMA DE LEALTAD' : 'REPEAT CUSTOMER PERK'}</span>
              </div>

              <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-white tracking-wide leading-tight mb-3">
                {lang === 'es'
                  ? '¡TU 5TO LAVADO ES GRATIS!'
                  : 'YOUR 5TH WASH IS FREE'}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {lang === 'es'
                  ? 'Pregúntanos por los detalles de nuestra oferta para clientes frecuentes.'
                  : 'Ask us for the details of our repeat-customer offer.'}
              </p>

              {/* Handcrafted 5-Mark Loyalty Progress Motif */}
              <div className="mb-6">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider block mb-2 font-bold"
                  style={{ color: currentTheme.primaryLight }}
                >
                  {lang === 'es' ? 'Esquema de Lealtad (5 Visitas):' : 'Loyalty Progression Pattern:'}
                </span>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs text-slate-300"
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                        borderColor: currentTheme.borderSubtle,
                      }}
                    >
                      <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center font-bold text-slate-400">
                        {num}
                      </span>
                      <span>Wash {num}</span>
                    </div>
                  ))}

                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold"
                    style={{
                      backgroundColor: currentTheme.badgeBg,
                      borderColor: currentTheme.primary,
                      color: currentTheme.primaryLight,
                      boxShadow: `0 0 14px ${currentTheme.glow}`,
                    }}
                  >
                    <Star className="w-3.5 h-3.5" style={{ color: currentTheme.primary, fill: currentTheme.primary }} />
                    <span>5th FREE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span>
                  {lang === 'es'
                    ? 'Promoción verificada en el perfil de Instagram @gcontrerascarwash'
                    : 'Verified promotion from @gcontrerascarwash profile bio'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onEnquire}
                className="btn-shine px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                style={{
                  background: currentTheme.btnBg,
                  color: currentTheme.btnText,
                  border: `1px solid ${currentTheme.btnBorder}`,
                  boxShadow: `0 4px 18px -2px ${currentTheme.glow}`,
                }}
              >
                <span>{lang === 'es' ? 'Preguntar por la Oferta' : 'Enquire About Offer'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.intlPhone}?text=${encodeURIComponent(
                  lang === 'es'
                    ? 'Hola, me gustaría preguntar por la promoción del 5to lavado gratis.'
                    : 'Hi! I would like to ask about the 5th wash is free loyalty offer.'
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="px-5 py-3.5 rounded-lg border text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                style={{
                  backgroundColor: currentTheme.bgSurface,
                  borderColor: currentTheme.borderSubtle,
                }}
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
