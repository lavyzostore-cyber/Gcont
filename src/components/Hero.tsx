import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  MapPin,
  Play,
  Pause,
  Palette,
  Check
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  lang: 'en' | 'es';
  onBookClick: () => void;
  onExploreClick: () => void;
  onViewFlyer: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onBookClick,
  onExploreClick,
  onViewFlyer,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentTheme, themeId, setTheme, availableThemes } = useTheme();

  // Parallax on mouse move (desktop only, subtle)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10;
      const y = (e.clientY / innerHeight - 0.5) * 8;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-between"
    >
      {/* 1. Full-Width Cinematic Background Video Layer */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-20 transition-transform duration-700 ease-out"
        style={{
          transform: `scale(1.06) translate3d(${parallax.x * -0.5}px, ${parallax.y * -0.5}px, 0)`,
        }}
      >
        {!videoError ? (
          <video
            ref={videoRef}
            src={BUSINESS_INFO.assets.heroVideo}
            poster={BUSINESS_INFO.assets.alfaRomeo}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-110 saturate-[1.1]"
          />
        ) : (
          <img
            src={BUSINESS_INFO.assets.alfaRomeo}
            alt="Automotive detailing background"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-110"
          />
        )}
      </div>

      {/* Cinematic Dark Gradient & Theme Specular Overlays */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 20%, ${currentTheme.glow} 0%, transparent 60%), linear-gradient(180deg, ${currentTheme.bgBase}f0 0%, ${currentTheme.bgBase}cc 40%, ${currentTheme.bgBase} 100%)`,
        }}
      />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none"
        style={{ backgroundColor: `${currentTheme.primary}18` }}
      />

      {/* Accessible Video Control Toggle in Bottom Corner */}
      <div className="absolute bottom-5 right-5 z-20 hidden md:block">
        <button
          type="button"
          onClick={toggleVideoPlayback}
          className="p-2 rounded-full border backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 text-xs px-3 cursor-pointer text-slate-300 hover:text-white"
          style={{
            backgroundColor: `${currentTheme.bgCard}cc`,
            borderColor: currentTheme.borderSubtle,
          }}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          title={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
          ) : (
            <Play className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
          )}
          <span className="text-[11px] font-medium">{isPlaying ? 'Pause Motion' : 'Play Motion'}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Clean unboxed location line inspired by posters */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <MapPin className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
              <span className="text-white">BAKERSFIELD</span>
              <span className="text-slate-500">•</span>
              <span className="text-white">SHAFTER</span>
              <span className="text-slate-500">•</span>
              <span style={{ color: currentTheme.primaryLight }}>WASCO, CA</span>
            </div>

            {/* Signature Horizontal Accent Bar inspired by Corner Detailing Co posters */}
            <div
              className="w-14 h-[2px] mb-6 transition-all duration-300"
              style={{ backgroundColor: currentTheme.accentBar }}
            />

            {/* Main Headline with Editorial Serif styling */}
            <h1 className="font-editorial font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-white leading-[1.1] mb-5 text-wrap-balance uppercase">
              {lang === 'es' ? (
                <>
                  <span className="block">CUIDADO AUTOMOTRIZ</span>
                  <span className="block font-medium italic text-slate-200">PROFESIONAL.</span>
                  <span
                    className="block tracking-wider text-2xl sm:text-3xl md:text-4xl mt-2 font-sans font-bold"
                    style={{ color: currentTheme.primaryLight }}
                  >
                    EN LA PUERTA DE TU HOGAR.
                  </span>
                </>
              ) : (
                <>
                  <span className="block">PROFESSIONAL CAR CARE.</span>
                  <span
                    className="block font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl mt-2"
                    style={{ color: currentTheme.primaryLight }}
                  >
                    RIGHT AT YOUR DOOR.
                  </span>
                </>
              )}
            </h1>

            {/* Supporting Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              {lang === 'es'
                ? 'Lavado y detallado móvil profesional en Bakersfield, Shafter y Wasco.'
                : 'Mobile car washing and detailing across Bakersfield, Shafter, and Wasco.'}
            </p>

            {/* Primary & Secondary Action Group */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <button
                type="button"
                onClick={onBookClick}
                className="btn-shine w-full sm:w-auto px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                style={{
                  background: currentTheme.btnBg,
                  color: currentTheme.btnText,
                  border: `1px solid ${currentTheme.btnBorder}`,
                  boxShadow: `0 4px 20px -2px ${currentTheme.glow}`,
                }}
              >
                <span>{lang === 'es' ? 'SOLICITAR CITA' : 'REQUEST A BOOKING'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white border transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  borderColor: currentTheme.borderSubtle,
                  backgroundColor: `${currentTheme.bgCard}99`,
                }}
              >
                <span>{lang === 'es' ? 'EXPLORAR SERVICIOS' : 'EXPLORE OUR SERVICES'}</span>
              </button>

              <button
                type="button"
                onClick={onViewFlyer}
                className="w-full sm:w-auto px-4 py-3.5 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                style={{
                  borderColor: currentTheme.borderSubtle,
                  backgroundColor: currentTheme.badgeBg,
                  color: currentTheme.primaryLight,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span>{lang === 'es' ? 'Lista Oficial' : 'Official Price Flyer'}</span>
              </button>
            </div>

            {/* Quick Contact & Verification Line */}
            <div
              className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-4 border-t w-full"
              style={{ borderColor: currentTheme.borderSubtle }}
            >
              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-mono font-medium"
              >
                <Phone className="w-4 h-4" style={{ color: currentTheme.primary }} />
                <span>Call or Text: {BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.intlPhone}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Available</span>
              </a>

              <span className="text-slate-600 hidden sm:inline">&bull;</span>
              <span className="text-slate-300">
                {lang === 'es' ? '¡El 5to lavado es Gratis!' : '5th Wash is Free Loyalty Offer'}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Poster Color Harmonizer */}
          <div className="lg:col-span-5 relative" data-cursor="explore">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div
                className="absolute -inset-1.5 rounded-2xl blur-xl opacity-50 transition duration-700 pointer-events-none"
                style={{ backgroundColor: currentTheme.glow }}
              />

              {/* Main Card Container */}
              <div
                className="relative rounded-2xl border overflow-hidden shadow-2xl transition-all"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  borderColor: currentTheme.borderFocus,
                }}
              >
                {/* Visual Header Image from authentic Instagram post */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black">
                  <img
                    src={BUSINESS_INFO.assets.alfaRomeo}
                    alt="G Contreras Car Wash white Alfa Romeo sports sedan detailing"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${currentTheme.bgCard} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Top Badge */}
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-md backdrop-blur-md border text-[11px] font-semibold flex items-center gap-1.5 text-white"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.75)',
                      borderColor: currentTheme.borderSubtle,
                    }}
                  >
                    <Sparkles className="w-3 h-3" style={{ color: currentTheme.primary }} />
                    <span>Real Customer Job &bull; @gcontrerascarwash</span>
                  </div>

                  <div
                    className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white backdrop-blur-md px-3.5 py-2 rounded-lg border"
                    style={{
                      backgroundColor: `${currentTheme.bgSurface}ee`,
                      borderColor: currentTheme.borderSubtle,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: currentTheme.primary }}
                      />
                      <span className="font-semibold">Mobile Rig on Location</span>
                    </div>
                    <span className="font-mono font-bold" style={{ color: currentTheme.primaryLight }}>
                      $35 Starting Price
                    </span>
                  </div>
                </div>

                {/* Sub-card highlights */}
                <div className="p-5 space-y-3.5" style={{ backgroundColor: currentTheme.bgCard }}>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div
                      className="p-3 rounded-lg border"
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                        borderColor: currentTheme.borderSubtle,
                      }}
                    >
                      <span className="text-slate-400 block text-[11px] mb-0.5">
                        {lang === 'es' ? 'Vehículos Pequeños' : 'Small Sedans & Coupes'}
                      </span>
                      <span className="font-editorial text-lg font-bold text-white">$35</span>
                      <span
                        className="text-[10px] block mt-0.5 font-medium"
                        style={{ color: currentTheme.primary }}
                      >
                        {lang === 'es' ? 'Lavado a mano + rines' : 'Hand wash & tire shine'}
                      </span>
                    </div>

                    <div
                      className="p-3 rounded-lg border"
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                        borderColor: currentTheme.borderSubtle,
                      }}
                    >
                      <span className="text-slate-400 block text-[11px] mb-0.5">
                        {lang === 'es' ? 'Trocas & SUVs Grandes' : 'Trucks & Large SUVs'}
                      </span>
                      <span className="font-editorial text-lg font-bold text-white">$50</span>
                      <span
                        className="text-[10px] block mt-0.5 font-medium"
                        style={{ color: currentTheme.primary }}
                      >
                        {lang === 'es' ? 'Servicio completo' : 'Full exterior & wipe-down'}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Poster Palette Quick-Bar */}
                  <div
                    className="p-2.5 rounded-lg border flex items-center justify-between text-xs"
                    style={{
                      backgroundColor: currentTheme.bgSurface,
                      borderColor: currentTheme.borderSubtle,
                    }}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                      <span className="font-medium">Poster Grade:</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {availableThemes.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTheme(t.id)}
                          className="w-5 h-5 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-110"
                          style={{
                            backgroundColor: t.primary,
                            borderColor: t.id === themeId ? '#FFFFFF' : 'transparent',
                            boxShadow: t.id === themeId ? `0 0 8px ${t.primary}` : 'none',
                          }}
                          title={`Switch to ${t.name}`}
                          aria-label={`Switch to ${t.name}`}
                        >
                          {t.id === themeId && (
                            <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between pt-2 border-t text-xs"
                    style={{ borderColor: currentTheme.borderSubtle }}
                  >
                    <span className="text-slate-400">
                      {lang === 'es' ? 'Sin salir de casa' : 'Convenient driveway service'}
                    </span>
                    <button
                      type="button"
                      onClick={onBookClick}
                      className="font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors hover:text-white"
                      style={{ color: currentTheme.primaryLight }}
                    >
                      <span>{lang === 'es' ? 'Cotizar ahora' : 'Instant Estimate'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
