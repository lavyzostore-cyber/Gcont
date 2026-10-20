import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Instagram,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Truck,
  ExternalLink
} from 'lucide-react';
import { BUSINESS_INFO, SERVICE_CITIES } from '../data/businessData';
import { useTheme } from '../context/ThemeContext';

interface AboutAndServiceAreaProps {
  lang: 'en' | 'es';
  onBookClick: () => void;
}

export const AboutAndServiceArea: React.FC<AboutAndServiceAreaProps> = ({
  lang,
  onBookClick
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('Bakersfield');
  const { currentTheme } = useTheme();

  return (
    <>
      {/* About Section */}
      <section
        id="about"
        className="py-20 lg:py-28 relative border-t"
        style={{
          backgroundColor: currentTheme.bgBase,
          borderColor: currentTheme.borderSubtle,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Business Story & Ethos */}
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase mb-4"
                style={{
                  backgroundColor: currentTheme.badgeBg,
                  borderColor: currentTheme.borderSubtle,
                  color: currentTheme.primaryLight,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span>{lang === 'es' ? 'SOBRE NOSOTROS' : 'ABOUT G CONTRERAS'}</span>
              </div>

              <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-white tracking-wide leading-tight mb-4">
                {lang === 'es'
                  ? 'Cuidado Automotriz Profesional, Llevado a tu Puerta'
                  : 'Professional Car Care, Delivered Directly to You'}
              </h2>

              <div
                className="w-14 h-[2px] mb-6 transition-all duration-300"
                style={{ backgroundColor: currentTheme.accentBar }}
              />

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                <p>
                  {lang === 'es'
                    ? 'G Contreras Car Wash brinda un servicio móvil de limpieza y detallado de vehículos para clientes en Bakersfield, Shafter y Wasco. Nuestra meta es hacer que cuidar de tu auto o camioneta sea simple, cómodo y con resultados impecables.'
                    : 'G Contreras Car Wash brings convenient mobile vehicle cleaning to customers across Bakersfield, Shafter, and Wasco. Our goal is to make caring for your vehicle simple, convenient, and satisfying.'}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm">
                  {lang === 'es'
                    ? 'Creemos en el trabajo bien hecho: desde un lavado exterior a mano con espuma densa que no maltrata la pintura, hasta rines relucientes y una cabina interior limpia y libre de polvo. Todo realizado directamente en la entrada de tu casa o lugar de trabajo.'
                    : 'We focus on quality and convenience: thick foam baths that protect clear coats, spot-free filtered water, thoroughly cleaned wheels, and refreshed cabin interiors—without requiring you to give up your weekend or wait in lines.'}
                </p>
              </div>

              {/* Verified Value Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div
                  className="p-3.5 rounded-xl border flex items-start gap-3"
                  style={{
                    backgroundColor: currentTheme.bgSurface,
                    borderColor: currentTheme.borderSubtle,
                  }}
                >
                  <Truck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentTheme.primary }} />
                  <div>
                    <h3 className="font-semibold text-white text-xs">
                      {lang === 'es' ? '100% Unidad Móvil' : '100% Mobile Service'}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {lang === 'es'
                        ? 'Tanque de agua e hidrolavadora autónomos'
                        : 'Self-contained water tank and equipment on-site'}
                    </p>
                  </div>
                </div>

                <div
                  className="p-3.5 rounded-xl border flex items-start gap-3"
                  style={{
                    backgroundColor: currentTheme.bgSurface,
                    borderColor: currentTheme.borderSubtle,
                  }}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentTheme.primary }} />
                  <div>
                    <h3 className="font-semibold text-white text-xs">
                      {lang === 'es' ? 'Enjuague Spot-Free' : 'Spot-Free Rinse'}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {lang === 'es'
                        ? 'Agua pura desmineralizada sin marcas'
                        : 'Mineral-filtered water to eliminate water spots'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Owner draft disclaimer badge */}
              <div
                className="text-[11px] text-slate-500 italic pl-3 border-l-2"
                style={{ borderColor: currentTheme.borderSubtle }}
              >
                {lang === 'es'
                  ? 'Texto de presentación para propuesta web. Todos los datos sujetos a revisión y aprobación del propietario.'
                  : 'Draft presentation copy for G Contreras Car Wash. All claims subject to business owner approval.'}
              </div>
            </div>

            {/* Right Column: Visual Brand Card */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl border p-6 sm:p-8 shadow-xl relative overflow-hidden"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  borderColor: currentTheme.borderFocus,
                  boxShadow: `0 15px 35px -5px ${currentTheme.glow}`,
                }}
              >
                <div
                  className="flex items-center gap-4 mb-6 pb-6 border-b"
                  style={{ borderColor: currentTheme.borderSubtle }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl p-[2px]"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.primary}, #111115)`,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-[14px] flex items-center justify-center font-editorial font-extrabold text-2xl"
                      style={{
                        backgroundColor: currentTheme.bgBase,
                        color: currentTheme.primary,
                      }}
                    >
                      GC
                    </div>
                  </div>
                  <div>
                    <h3 className="font-editorial font-bold text-xl text-white tracking-wide">
                      G Contreras Car Wash
                    </h3>
                    <span className="text-xs font-medium" style={{ color: currentTheme.primaryLight }}>
                      Mobile Detailing • Kern County, CA
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div
                    className="flex items-center justify-between py-2 border-b"
                    style={{ borderColor: currentTheme.borderSubtle }}
                  >
                    <span className="text-slate-400">{lang === 'es' ? 'Modelo de Servicio:' : 'Service Model:'}</span>
                    <span className="font-semibold text-white">100% Mobile (Driveway Service)</span>
                  </div>
                  <div
                    className="flex items-center justify-between py-2 border-b"
                    style={{ borderColor: currentTheme.borderSubtle }}
                  >
                    <span className="text-slate-400">{lang === 'es' ? 'Teléfono Directo:' : 'Direct Phone:'}</span>
                    <a
                      href={`tel:${BUSINESS_INFO.rawPhone}`}
                      className="font-mono font-semibold hover:underline"
                      style={{ color: currentTheme.primaryLight }}
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                  <div
                    className="flex items-center justify-between py-2 border-b"
                    style={{ borderColor: currentTheme.borderSubtle }}
                  >
                    <span className="text-slate-400">Instagram:</span>
                    <a
                      href={BUSINESS_INFO.instagramUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold hover:underline flex items-center gap-1"
                      style={{ color: currentTheme.primaryLight }}
                    >
                      <span>{BUSINESS_INFO.instagram}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div
                    className="flex items-center justify-between py-2 border-b"
                    style={{ borderColor: currentTheme.borderSubtle }}
                  >
                    <span className="text-slate-400">{lang === 'es' ? 'Oferta de Lealtad:' : 'Loyalty Promo:'}</span>
                    <span className="font-semibold" style={{ color: currentTheme.primary }}>
                      {lang === 'es' ? '¡5to Lavado es Gratis!' : '5th Wash is Free!'}
                    </span>
                  </div>
                </div>

                <div
                  className="mt-6 pt-4 border-t"
                  style={{ borderColor: currentTheme.borderSubtle }}
                >
                  <button
                    type="button"
                    onClick={onBookClick}
                    className="w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    style={{
                      background: currentTheme.btnBg,
                      color: currentTheme.btnText,
                      border: `1px solid ${currentTheme.btnBorder}`,
                      boxShadow: `0 4px 18px -2px ${currentTheme.glow}`,
                    }}
                  >
                    <span>{lang === 'es' ? 'Solicitar Servicio Móvil' : 'Book Mobile Service'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area & Contact Section */}
      <section
        id="contact"
        className="py-20 lg:py-28 relative border-t"
        style={{
          backgroundColor: currentTheme.bgBase,
          borderColor: currentTheme.borderSubtle,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
              style={{
                backgroundColor: currentTheme.badgeBg,
                borderColor: currentTheme.borderSubtle,
                color: currentTheme.primaryLight,
              }}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
              <span>{lang === 'es' ? 'ÁREA DE COBERTURA' : 'SERVICE RADIUS'}</span>
            </div>
            <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-white tracking-wide leading-tight">
              Bakersfield • Shafter • Wasco, CA
            </h2>

            <div
              className="w-14 h-[2px] mx-auto mt-4 transition-all duration-300"
              style={{ backgroundColor: currentTheme.accentBar }}
            />

            <p className="text-slate-400 mt-4 text-sm sm:text-base">
              {lang === 'es'
                ? 'Como negocio 100% móvil, no tenemos una tienda física fija: nos desplazamos con nuestro equipo directo a tu domicilio o lugar de trabajo.'
                : 'As a 100% mobile business, we do not operate a physical customer storefront. We travel with our specialized rig directly to your location in Kern County.'}
            </p>
          </div>

          {/* Interactive City Coverage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {SERVICE_CITIES.map((city) => {
              const isSelected = selectedCity === city.name;
              return (
                <div
                  key={city.name}
                  onClick={() => setSelectedCity(city.name)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    isSelected ? 'shadow-lg' : 'hover:border-white/20'
                  }`}
                  style={{
                    backgroundColor: currentTheme.bgCard,
                    borderColor: isSelected ? currentTheme.primary : currentTheme.borderSubtle,
                    boxShadow: isSelected ? `0 8px 25px -5px ${currentTheme.glow}` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg border flex items-center justify-center"
                        style={{
                          backgroundColor: currentTheme.badgeBg,
                          borderColor: currentTheme.borderSubtle,
                          color: currentTheme.primary,
                        }}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <h3 className="font-editorial font-bold text-xl text-white tracking-wide">
                        {city.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono" style={{ color: currentTheme.primaryLight }}>
                      {city.county}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {lang === 'es' ? city.coverageEs : city.coverage}
                  </p>

                  <div
                    className="pt-3 border-t flex items-center justify-between text-xs"
                    style={{ borderColor: currentTheme.borderSubtle }}
                  >
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Cobertura Activa' : 'Mobile Service Active'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookClick();
                      }}
                      className="font-semibold cursor-pointer transition-colors hover:text-white"
                      style={{ color: currentTheme.primaryLight }}
                    >
                      {lang === 'es' ? 'Agendar Aquí →' : 'Book Here →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Communication Channels Strip */}
          <div
            className="rounded-2xl border p-8 sm:p-10 shadow-2xl"
            style={{
              backgroundColor: currentTheme.bgCard,
              borderColor: currentTheme.borderFocus,
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider block mb-1"
                  style={{ color: currentTheme.primary }}
                >
                  {lang === 'es' ? 'CONTACTO INMEDIATO' : 'FAST COMMUNICATION'}
                </span>
                <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-white mb-2 tracking-wide">
                  {lang === 'es'
                    ? '¿Tienes Preguntas o Quieres Agendar Hoy?'
                    : 'Questions or Ready to Schedule Today?'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                  {lang === 'es'
                    ? 'Llámanos o envíanos un WhatsApp directamente al (661) 692-1044. Respondemos con gusto en inglés o español.'
                    : 'Call or WhatsApp us directly at (661) 692-1044. We are happy to assist in both English and Spanish.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.rawPhone}`}
                  className="px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  style={{
                    background: currentTheme.btnBg,
                    color: currentTheme.btnText,
                    border: `1px solid ${currentTheme.btnBorder}`,
                    boxShadow: `0 4px 18px -2px ${currentTheme.glow}`,
                  }}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.intlPhone}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-5 py-3.5 rounded-lg border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-4 py-3.5 rounded-lg border text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  style={{
                    backgroundColor: currentTheme.bgSurface,
                    borderColor: currentTheme.borderSubtle,
                  }}
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
