import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Globe, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { useTheme } from '../context/ThemeContext';
import { ThemeSelector } from './ThemeSelector';

interface NavbarProps {
  lang: 'en' | 'es';
  onToggleLang: () => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: lang === 'es' ? 'Servicios' : 'Services' },
    { href: '#pricing', label: lang === 'es' ? 'Precios' : 'Pricing' },
    { href: '#gallery', label: lang === 'es' ? 'Trabajos' : 'Our Work' },
    { href: '#how-it-works', label: lang === 'es' ? 'Cómo Funciona' : 'How It Works' },
    { href: '#about', label: lang === 'es' ? 'Nosotros' : 'About' },
    { href: '#contact', label: lang === 'es' ? 'Contacto' : 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md border-b py-3 shadow-lg'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
        }`}
        style={{
          backgroundColor: scrolled ? `${currentTheme.bgSurface}f2` : undefined,
          borderColor: scrolled ? currentTheme.borderSubtle : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-3 group shrink-0 text-decoration-none"
            >
              <div
                className="w-10 h-10 rounded-lg p-[1.5px] shadow-sm transition-all group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}, #111115)`,
                  boxShadow: `0 0 15px -3px ${currentTheme.glow}`,
                }}
              >
                <div
                  className="w-full h-full rounded-[7px] flex items-center justify-center font-editorial font-extrabold text-base tracking-wider"
                  style={{
                    backgroundColor: currentTheme.bgBase,
                    color: currentTheme.primary,
                  }}
                >
                  GC
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-editorial font-bold text-base sm:text-lg tracking-wider text-white transition-colors whitespace-nowrap">
                  G CONTRERAS
                </span>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-colors"
                  style={{ color: currentTheme.primaryLight }}
                >
                  MOBILE DETAILING
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="transition-colors whitespace-nowrap py-1 relative group hover:text-white"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-200 group-hover:w-full"
                    style={{ backgroundColor: currentTheme.primary }}
                  />
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions (Theme Studio + Language + Phone + Book) */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              {/* Poster Colorway Selector */}
              <ThemeSelector />

              {/* Language Switcher */}
              <button
                type="button"
                onClick={onToggleLang}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                style={{
                  borderColor: currentTheme.borderSubtle,
                  backgroundColor: `${currentTheme.bgCard}cc`,
                }}
                title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
                aria-label="Language switch"
              >
                <Globe className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span>{lang === 'en' ? 'ES' : 'EN'}</span>
              </button>

              {/* Direct Phone Call */}
              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-300 hover:text-white transition-colors whitespace-nowrap"
                style={{ backgroundColor: 'transparent' }}
              >
                <Phone className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span className="font-mono">{BUSINESS_INFO.phone}</span>
              </a>

              {/* Primary Book CTA */}
              <button
                type="button"
                onClick={onBookClick}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                style={{
                  background: currentTheme.btnBg,
                  color: currentTheme.btnText,
                  border: `1px solid ${currentTheme.btnBorder}`,
                  boxShadow: `0 4px 14px -2px ${currentTheme.glow}`,
                }}
              >
                {lang === 'es' ? 'RESERVAR' : 'BOOK NOW'}
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeSelector />

              <button
                type="button"
                onClick={onToggleLang}
                className="p-1.5 rounded-md border text-xs font-bold"
                style={{
                  borderColor: currentTheme.borderSubtle,
                  backgroundColor: currentTheme.bgCard,
                  color: currentTheme.primary,
                }}
                aria-label="Toggle language"
              >
                {lang === 'en' ? 'ES' : 'EN'}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-lg border focus:outline-none"
                style={{
                  borderColor: currentTheme.borderSubtle,
                  backgroundColor: currentTheme.bgCard,
                }}
                aria-label="Toggle mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 sm:hidden backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between border-b animate-in fade-in duration-200"
          style={{
            backgroundColor: `${currentTheme.bgBase}fa`,
            borderColor: currentTheme.borderSubtle,
          }}
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-slate-200 border-b pb-3 transition-colors hover:text-white"
                style={{ borderColor: currentTheme.borderSubtle }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div
            className="space-y-3 pt-6 border-t"
            style={{ borderColor: currentTheme.borderSubtle }}
          >
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span>Bakersfield &bull; Shafter &bull; Wasco, CA</span>
            </div>

            <a
              href={`tel:${BUSINESS_INFO.rawPhone}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border text-sm font-semibold text-slate-200 hover:text-white"
              style={{
                borderColor: currentTheme.borderSubtle,
                backgroundColor: currentTheme.bgCard,
              }}
            >
              <Phone className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider rounded-lg shadow-md"
              style={{
                background: currentTheme.btnBg,
                color: currentTheme.btnText,
                border: `1px solid ${currentTheme.btnBorder}`,
              }}
            >
              {lang === 'es' ? 'RESERVAR LAVADO' : 'BOOK YOUR DETAIL'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
