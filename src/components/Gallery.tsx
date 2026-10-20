import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  Sliders,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Camera,
  Palette,
  Check
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { useTheme } from '../context/ThemeContext';
import { ThemeId } from '../types/theme';

interface GalleryProps {
  lang: 'en' | 'es';
  onBookClick: () => void;
}

interface GalleryCard {
  id: string;
  title: string;
  titleEs: string;
  category: 'all' | 'posters' | 'exterior' | 'wheels' | 'trucks' | 'mobile';
  image: string;
  tag: string;
  tagEs: string;
  details: string;
  detailsEs: string;
  cropPosition: string;
  associatedTheme?: ThemeId;
}

export const Gallery: React.FC<GalleryProps> = ({ lang, onBookClick }) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeFilter, setActiveFilter] = useState<'all' | 'posters' | 'exterior' | 'wheels' | 'trucks' | 'mobile'>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryCard | null>(null);
  const { currentTheme, themeId, setTheme } = useTheme();

  const galleryItems: GalleryCard[] = [
    {
      id: 'poster-corner-3',
      title: 'Sunset Bronze BMW — Cleaner. Shinier. Better.',
      titleEs: 'BMW Bronce Atardecer — Más Limpio, Más Brillante',
      category: 'posters',
      image: '/assets/aistudio/Corner3_de23fe95.png',
      cropPosition: 'center',
      tag: 'Poster 3 Palette',
      tagEs: 'Paleta Poster 3',
      details: 'Warm golden-hour amber reflections over wet glossy automotive lacquer.',
      detailsEs: 'Reflejos dorados de atardecer sobre pintura automotriz recién encerada.',
      associatedTheme: 'sunset-bronze'
    },
    {
      id: 'poster-corner-1',
      title: 'Precision Wheel Care — The Finish is in the Details',
      titleEs: 'Cuidado de Rines — El Acabado Está en los Detalles',
      category: 'posters',
      image: '/assets/aistudio/Corner1_857fb3c2.png',
      cropPosition: 'center',
      tag: 'Poster 1 Palette',
      tagEs: 'Paleta Poster 1',
      details: 'Deep obsidian darkroom monochrome with rich luxury crimson ruby accents.',
      detailsEs: 'Monocromo oscuro de alta precisión con acentos en rojo rubí profundo.',
      associatedTheme: 'obsidian-crimson'
    },
    {
      id: 'poster-corner-2',
      title: 'Studio Microfiber Care — Premium Car Care',
      titleEs: 'Cuidado de Microfibra en Taller — Verde Racing',
      category: 'posters',
      image: '/assets/aistudio/Corner2_1005170c.png',
      cropPosition: 'center',
      tag: 'Poster 2 Palette',
      tagEs: 'Paleta Poster 2',
      details: 'Daylight reflections, gloved applicator work, and British racing green atelier styling.',
      detailsEs: 'Reflejos de luz diurna, detallado con guante y estilo verde esmeralda británico.',
      associatedTheme: 'racing-emerald'
    },
    {
      id: 'chevy-suburban',
      title: 'Full-Size SUV Transformation',
      titleEs: 'Transformación de SUV Grande (Tahoe / Suburban)',
      category: 'trucks',
      image: BUSINESS_INFO.assets.suburbanSuv,
      cropPosition: 'center',
      tag: 'Before & After',
      tagEs: 'Antes y Después',
      details: 'Complete exterior wash and deep tire shine on dark metallic paint.',
      detailsEs: 'Lavado exterior completo y abrillantador de llantas en pintura oscura.'
    },
    {
      id: 'alfa-romeo',
      title: 'White Alfa Romeo Giulia Sports Sedan',
      titleEs: 'Sedán Deportivo Blanco Alfa Romeo Giulia',
      category: 'exterior',
      image: BUSINESS_INFO.assets.alfaRomeo,
      cropPosition: 'center',
      tag: 'Spot-Free Gloss',
      tagEs: 'Brillo Spot-Free',
      details: 'Showroom gloss finish with streak-free windows and clean black alloy rims.',
      detailsEs: 'Acabado brillante de exhibición con cristales limpios y rines negros.'
    },
    {
      id: 'snow-foam-truck',
      title: 'Heavy Duty Silverado Snow Foam Soak',
      titleEs: 'Troca Pesada con Baño de Espuma Activa',
      category: 'trucks',
      image: BUSINESS_INFO.assets.snowFoamTruck,
      cropPosition: 'center',
      tag: 'Snow Foam Canon',
      tagEs: 'Cañón de Espuma',
      details: 'Thick pre-soak foam bath lifting dirt and road grime before hand wash.',
      detailsEs: 'Baño de espuma densa que encapsula la suciedad antes del lavado a mano.'
    },
    {
      id: 'mobile-rig-truck',
      title: 'G Contreras Mobile Service Rig Truck',
      titleEs: 'Troca Equipada para Servicio a Domicilio',
      category: 'mobile',
      image: BUSINESS_INFO.assets.mobileRigTruck,
      cropPosition: 'center',
      tag: '100% Autonomous',
      tagEs: '100% Autónomo',
      details: 'Equipped with on-board water tank, pressure washer, and professional chemicals.',
      detailsEs: 'Equipada con tanque de agua, hidrolavadora a presión y químicos profesionales.'
    },
    {
      id: 'custom-alloy-wheels',
      title: 'Deep Chrome & Alloy Wheel Cleaning',
      titleEs: 'Limpieza Profunda de Rines Cromados ("Rines")',
      category: 'wheels',
      image: BUSINESS_INFO.assets.customWheel,
      cropPosition: 'center',
      tag: 'Brake Dust Removed',
      tagEs: 'Sin Polvo de Frenos',
      details: 'Brake dust decontamination, barrel scrub, and high-gloss tire dressing.',
      detailsEs: 'Eliminación de residuo de frenos, limpieza de rayos y brillo de llantas.'
    },
    {
      id: 'official-flyer-art',
      title: 'Official G Contreras Detailing Flyer',
      titleEs: 'Flyer Oficial de Tarifas G Contreras',
      category: 'all',
      image: BUSINESS_INFO.assets.brandLogo,
      cropPosition: 'center',
      tag: 'Official Rates',
      tagEs: 'Tarifas Oficiales',
      details: 'Verified pricing starting at $35 with clear vehicle category tiers.',
      detailsEs: 'Precios desde $35 con categorías claras por tamaño de vehículo.'
    }
  ];

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 relative border-t"
      style={{
        backgroundColor: currentTheme.bgBase,
        borderColor: currentTheme.borderSubtle,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Poster Accent Bar */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
            style={{
              borderColor: currentTheme.borderSubtle,
              backgroundColor: currentTheme.badgeBg,
              color: currentTheme.primaryLight,
            }}
          >
            <Camera className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
            <span>{lang === 'es' ? 'NUESTRO TRABAJO & PALETAS' : 'PORTFOLIO & RESULTS'}</span>
          </div>
          <h2 className="font-editorial font-bold text-3xl sm:text-5xl text-white tracking-wide leading-tight">
            {lang === 'es'
              ? 'Trabajos Reales y Estética de Exhibición'
              : 'Real Detail Results & Poster Aesthetics'}
          </h2>

          <div
            className="w-14 h-[2px] mx-auto mt-4 transition-all duration-300"
            style={{ backgroundColor: currentTheme.accentBar }}
          />

          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            {lang === 'es'
              ? 'Fotografías directas de vehículos atendidos por G Contreras Car Wash y las paletas cromáticas oficiales inspiradas en posters de alta gama.'
              : 'Photographs from G Contreras Car Wash mobile jobs across Kern County paired with high-end automotive editorial color standards.'}
          </p>
        </div>

        {/* Interactive Before & After Transformation Slider */}
        <div
          className="mb-20 rounded-2xl border p-6 sm:p-8 shadow-2xl"
          style={{
            backgroundColor: currentTheme.bgCard,
            borderColor: currentTheme.borderSubtle,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: currentTheme.primary }}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'COMPARADOR INTERACTIVO' : 'TRANSFORMATION SLIDER'}</span>
              </div>
              <h3 className="font-editorial font-bold text-xl sm:text-2xl text-white tracking-wide">
                {lang === 'es'
                  ? 'Desliza para Ver la Transformación'
                  : 'Slide to Inspect Before vs. After'}
              </h3>
            </div>

            <div
              className="flex items-center gap-2 text-xs font-medium text-slate-300 px-3 py-1.5 rounded-lg border"
              style={{
                backgroundColor: currentTheme.bgSurface,
                borderColor: currentTheme.borderSubtle,
              }}
            >
              <span className="text-amber-400 font-bold">{lang === 'es' ? 'Antes: Espuma Activa' : 'Before: Snow Foam'}</span>
              <span>&bull;</span>
              <span className="font-bold" style={{ color: currentTheme.primaryLight }}>
                {lang === 'es' ? 'Después: Brillo de Espejo' : 'After: Mirror Gloss'}
              </span>
            </div>
          </div>

          {/* Slider Container */}
          <div className="relative h-80 sm:h-96 md:h-[460px] w-full rounded-xl overflow-hidden select-none border border-slate-700/80 bg-slate-950">
            {/* "After" Image (Background - Clean Mirror Gloss) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={BUSINESS_INFO.assets.alfaRomeo}
                alt="Detailed vehicle with glossy finish"
                className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
              />
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-md backdrop-blur-md border text-xs font-bold text-white"
                style={{
                  backgroundColor: `${currentTheme.bgCard}dd`,
                  borderColor: currentTheme.borderFocus,
                }}
              >
                {lang === 'es' ? 'DESPUÉS (G CONTRERAS DETAIL)' : 'AFTER: G CONTRERAS DETAIL'}
              </div>
            </div>

            {/* "Before" Image (Foreground with Clip Path) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative h-full w-[100vw] max-w-[1280px]">
                <img
                  src={BUSINESS_INFO.assets.snowFoamTruck}
                  alt="Vehicle during foam cannon pre-wash"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/40 text-xs font-bold text-amber-300">
                  {lang === 'es' ? 'PRELAVADO: ESPUMA ACTIVA' : 'PRE-WASH: ACTIVE SNOW FOAM'}
                </div>
              </div>
            </div>

            {/* Draggable Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 cursor-ew-resize z-20 shadow-lg"
              style={{
                left: `${sliderPos}%`,
                backgroundColor: currentTheme.primary,
                boxShadow: `0 0 15px ${currentTheme.primary}`,
              }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md font-bold border-2 border-white"
                style={{
                  backgroundColor: currentTheme.primary,
                  color: currentTheme.btnText,
                }}
              >
                <div className="flex items-center text-[10px]">
                  <ChevronLeft className="w-3.5 h-3.5 -mr-1" />
                  <ChevronRight className="w-3.5 h-3.5 -ml-1" />
                </div>
              </div>
            </div>

            {/* Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Comparison slider"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 mt-4 px-1">
            <span>{lang === 'es' ? '← Arrastra hacia los lados para comparar' : '← Drag the handle to compare results →'}</span>
            <button
              type="button"
              onClick={onBookClick}
              className="font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors hover:text-white"
              style={{ color: currentTheme.primaryLight }}
            >
              <span>{lang === 'es' ? 'Quiero mi auto así' : 'Get This Result on My Vehicle'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: lang === 'es' ? 'Todos los Trabajos' : 'All Work' },
            { id: 'posters', label: lang === 'es' ? '⭐ Paletas de Posters' : '⭐ Poster Palettes' },
            { id: 'exterior', label: lang === 'es' ? 'Lavado & Espuma' : 'Exterior & Foam' },
            { id: 'trucks', label: lang === 'es' ? 'Trocas & SUVs' : 'Trucks & SUVs' },
            { id: 'wheels', label: lang === 'es' ? 'Rines & Llantas' : 'Wheels & Rims' },
            { id: 'mobile', label: lang === 'es' ? 'Unidad Móvil' : 'Mobile Rig' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive ? 'shadow-md font-bold' : 'text-slate-300 hover:text-white border'
                }`}
                style={{
                  backgroundColor: isActive ? currentTheme.primary : currentTheme.bgSurface,
                  color: isActive ? currentTheme.btnText : undefined,
                  borderColor: isActive ? currentTheme.primary : currentTheme.borderSubtle,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
              style={{
                backgroundColor: currentTheme.bgCard,
                borderColor: item.associatedTheme === themeId ? currentTheme.primary : currentTheme.borderSubtle,
                boxShadow: item.associatedTheme === themeId ? `0 8px 25px -5px ${currentTheme.glow}` : undefined,
              }}
            >
              <div className="relative h-64 overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    item.id === 'official-flyer-art' ? 'object-contain p-3 bg-black/60' : 'object-cover'
                  }`}
                  style={{ objectPosition: item.cropPosition }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${currentTheme.bgCard} 0%, transparent 60%)`,
                  }}
                />

                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded backdrop-blur-md border text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    borderColor: currentTheme.borderSubtle,
                  }}
                >
                  {lang === 'es' ? item.tagEs : item.tag}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveLightbox(item)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg text-white transition-colors border cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderColor: currentTheme.borderSubtle,
                  }}
                  title="Expand view"
                  aria-label={`View ${item.title}`}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-editorial font-bold text-base text-white mb-1.5 transition-colors tracking-wide">
                    {lang === 'es' ? item.titleEs : item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'es' ? item.detailsEs : item.details}
                  </p>
                </div>

                <div
                  className="mt-4 pt-3 border-t flex items-center justify-between text-xs"
                  style={{ borderColor: currentTheme.borderSubtle }}
                >
                  {item.associatedTheme ? (
                    <button
                      type="button"
                      onClick={() => setTheme(item.associatedTheme!)}
                      className="px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                      style={{
                        backgroundColor: item.associatedTheme === themeId ? currentTheme.primary : currentTheme.bgSurface,
                        color: item.associatedTheme === themeId ? currentTheme.btnText : '#FFFFFF',
                        border: `1px solid ${currentTheme.borderSubtle}`,
                      }}
                    >
                      <Palette className="w-3 h-3" />
                      <span>{item.associatedTheme === themeId ? 'Active Grade' : 'Apply Colorway'}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      {lang === 'es' ? 'Foto real del perfil' : 'Verified Instagram Photo'}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={onBookClick}
                    className="font-semibold inline-flex items-center gap-1 cursor-pointer text-xs transition-colors hover:text-white"
                    style={{ color: currentTheme.primaryLight }}
                  >
                    <span>{lang === 'es' ? 'Solicitar' : 'Book this'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Instagram Source Link */}
        <div className="mt-12 text-center">
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            style={{
              backgroundColor: currentTheme.bgCard,
              borderColor: currentTheme.borderSubtle,
            }}
          >
            <span>{lang === 'es' ? 'Ver más trabajos en Instagram' : 'View more work on Instagram'}</span>
            <span className="font-mono" style={{ color: currentTheme.primaryLight }}>{BUSINESS_INFO.instagram}</span>
            <ExternalLink className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl border overflow-hidden shadow-2xl p-6"
            style={{
              backgroundColor: currentTheme.bgCard,
              borderColor: currentTheme.borderFocus,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-96 sm:h-[480px] w-full rounded-xl overflow-hidden bg-black mb-4">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span
                  className="text-xs font-mono uppercase tracking-wider block mb-1 font-bold"
                  style={{ color: currentTheme.primaryLight }}
                >
                  {lang === 'es' ? activeLightbox.tagEs : activeLightbox.tag}
                </span>
                <h4 className="font-editorial font-bold text-xl text-white tracking-wide">
                  {lang === 'es' ? activeLightbox.titleEs : activeLightbox.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'es' ? activeLightbox.detailsEs : activeLightbox.details}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {activeLightbox.associatedTheme && (
                  <button
                    type="button"
                    onClick={() => setTheme(activeLightbox.associatedTheme!)}
                    className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer"
                    style={{
                      backgroundColor: activeLightbox.associatedTheme === themeId ? currentTheme.primary : currentTheme.bgSurface,
                      color: activeLightbox.associatedTheme === themeId ? currentTheme.btnText : '#FFFFFF',
                      borderColor: currentTheme.borderFocus,
                    }}
                  >
                    {activeLightbox.associatedTheme === themeId ? 'Active Grade' : 'Apply This Colorway'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setActiveLightbox(null);
                    onBookClick();
                  }}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
                  style={{
                    background: currentTheme.btnBg,
                    color: currentTheme.btnText,
                    border: `1px solid ${currentTheme.btnBorder}`,
                  }}
                >
                  {lang === 'es' ? 'Agendar Detallado' : 'Book Detail'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
