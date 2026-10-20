import React from 'react';
import { Phone, Instagram, MessageSquare, MapPin, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  lang: 'en' | 'es';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const currentYear = new Date().getFullYear();
  const { currentTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="border-t text-slate-400 text-xs pt-16 pb-12 transition-colors"
      style={{
        backgroundColor: currentTheme.bgBase,
        borderColor: currentTheme.borderSubtle,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b"
          style={{ borderColor: currentTheme.borderSubtle }}
        >
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg p-[1.5px]"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}, #111115)`,
                }}
              >
                <div
                  className="w-full h-full rounded-[6.5px] flex items-center justify-center font-editorial font-extrabold text-base"
                  style={{
                    backgroundColor: currentTheme.bgBase,
                    color: currentTheme.primary,
                  }}
                >
                  GC
                </div>
              </div>
              <div>
                <span className="font-editorial font-bold text-base text-white tracking-wider block">
                  G CONTRERAS CAR WASH
                </span>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase font-bold block"
                  style={{ color: currentTheme.primaryLight }}
                >
                  MOBILE DETAILING
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {lang === 'es'
                ? 'Servicio móvil de lavado y detallado automotriz en Bakersfield, Shafter y Wasco, California. Acabados spot-free de calidad directamente en tu domicilio.'
                : 'Premium mobile automotive detailing serving Bakersfield, Shafter, and Wasco, CA. Spot-free filtered water rinses and hand care brought to your driveway.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-lg border flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                style={{
                  backgroundColor: currentTheme.bgSurface,
                  borderColor: currentTheme.borderSubtle,
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.intlPhone}`}
                target="_blank"
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-lg border flex items-center justify-center text-slate-300 hover:text-emerald-400 transition-colors"
                style={{
                  backgroundColor: currentTheme.bgSurface,
                  borderColor: currentTheme.borderSubtle,
                }}
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="w-8 h-8 rounded-lg border flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                style={{
                  backgroundColor: currentTheme.bgSurface,
                  borderColor: currentTheme.borderSubtle,
                }}
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" style={{ color: currentTheme.primary }} />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              {lang === 'es' ? 'Navegación' : 'Navigation'}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Servicios' : 'Services'}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Lista de Precios' : 'Pricing & Estimator'}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Nuestro Trabajo' : 'Work & Gallery'}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Cómo Funciona' : 'How It Works'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Sobre Nosotros' : 'About'}
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  className="font-semibold transition-colors hover:text-white"
                  style={{ color: currentTheme.primaryLight }}
                >
                  {lang === 'es' ? 'Agendar Cita' : 'Book a Detail'}
                </a>
              </li>
            </ul>
          </div>

          {/* Pricing & Inclusions */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              {lang === 'es' ? 'Tarifas Base' : 'Base Pricing'}
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-center justify-between">
                <span>{lang === 'es' ? 'Vehículos Pequeños' : 'Small Vehicles'}</span>
                <span className="font-mono font-bold" style={{ color: currentTheme.primaryLight }}>$35</span>
              </li>
              <li className="flex items-center justify-between">
                <span>{lang === 'es' ? 'Vehículos Medianos' : 'Mid-Size Vehicles'}</span>
                <span className="font-mono font-bold" style={{ color: currentTheme.primaryLight }}>$45</span>
              </li>
              <li className="flex items-center justify-between">
                <span>{lang === 'es' ? 'Trocas / SUVs Grandes' : 'Large Trucks / SUVs'}</span>
                <span className="font-mono font-bold" style={{ color: currentTheme.primaryLight }}>$50</span>
              </li>
              <li className="pt-2 text-[11px]" style={{ color: currentTheme.primary }}>
                {lang === 'es' ? '¡El 5to lavado es Gratis!' : '5th Wash Free Promo'}
              </li>
            </ul>
          </div>

          {/* Service Areas & Contact */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              {lang === 'es' ? 'Cobertura Móvil' : 'Mobile Service'}
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.primary }} />
                <span>Bakersfield, CA</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.primary }} />
                <span>Shafter, CA</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.primary }} />
                <span>Wasco, CA</span>
              </div>

              <div
                className="pt-3 border-t"
                style={{ borderColor: currentTheme.borderSubtle }}
              >
                <a
                  href={`tel:${BUSINESS_INFO.rawPhone}`}
                  className="font-mono hover:underline block font-semibold"
                  style={{ color: currentTheme.primaryLight }}
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {currentYear} G Contreras Car Wash. All rights reserved. Bakersfield • Shafter • Wasco, CA.
          </div>

          <div className="flex items-center gap-4">
            <span className="italic">
              {lang === 'es'
                ? 'Diseñado para presentación de negocio y agendamiento directo.'
                : 'Agency presentation concept for G Contreras Car Wash.'}
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg border text-slate-400 hover:text-white cursor-pointer transition-colors"
              style={{
                backgroundColor: currentTheme.bgSurface,
                borderColor: currentTheme.borderSubtle,
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
