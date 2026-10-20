import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  ArrowRight,
  Calculator,
  FileImage,
  AlertCircle,
  CheckCircle2,
  Layers
} from 'lucide-react';
import {
  VEHICLE_TIERS,
  SPECIALTY_TIERS,
  ADD_ON_SERVICES,
  STANDARD_INCLUSIONS,
} from '../data/businessData';
import { calculateEstimate } from '../utils/booking';
import { useTheme } from '../context/ThemeContext';

interface PricingProps {
  lang: 'en' | 'es';
  onBookWithPackage: (tierId: string, addOnIds: string[]) => void;
  onViewFlyer: () => void;
}

export const Pricing: React.FC<PricingProps> = ({
  lang,
  onBookWithPackage,
  onViewFlyer,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('midsize');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['seat_shampoo']);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [rippleTarget, setRippleTarget] = useState<string | null>(null);
  const { currentTheme } = useTheme();

  // Combine standard and specialty tiers for tactile switcher
  const allTiers = [
    ...VEHICLE_TIERS.map((t) => ({
      id: t.id,
      name: t.name,
      nameEs: t.nameEs,
      priceDisplay: `$${t.price}`,
      priceDisplayEs: `$${t.price}`,
      description: t.description,
      descriptionEs: t.descriptionEs,
      examples: t.examples,
      isVariable: false,
      badge: t.badge
    })),
    ...SPECIALTY_TIERS.map((s) => ({
      id: s.id,
      name: s.name,
      nameEs: s.nameEs,
      priceDisplay: s.priceDisplay.includes('Varies') ? 'Custom Quote' : s.priceDisplay,
      priceDisplayEs: s.priceDisplayEs.includes('Varía') ? 'Cotización Personalizada' : s.priceDisplayEs,
      description: s.description,
      descriptionEs: s.descriptionEs,
      examples: s.id === 'rvs' ? 'Class A, B, C Motorhomes & Fifth Wheels' : s.id === 'semis' ? 'Commercial sleeper cabs, day cabs' : 'Polaris RZR, Can-Am Maverick, Talon',
      isVariable: s.priceDisplay.toLowerCase().includes('varies'),
      badge: s.id === 'utvs' ? 'Off-Road' : 'Fleet'
    }))
  ];

  const currentTierObj = allTiers.find((t) => t.id === selectedTier) || allTiers[1];

  const handleSelectTier = (id: string) => {
    if (id === selectedTier) return;
    setIsTransitioning(true);
    setRippleTarget(id);
    setSelectedTier(id);
    setTimeout(() => setIsTransitioning(false), 320);
    setTimeout(() => setRippleTarget(null), 700);
  };

  const toggleAddOn = (id: string) => {
    setRippleTarget(id);
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setTimeout(() => setRippleTarget(null), 600);
  };

  const estimate = calculateEstimate(selectedTier, selectedAddOns);

  return (
    <section id="pricing" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Waterline Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
            style={{
              borderColor: currentTheme.borderSubtle,
              backgroundColor: currentTheme.badgeBg,
              color: currentTheme.primaryLight,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
            <span>{lang === 'es' ? 'TARIFAS OFICIALES Y TRANSPARENTES' : 'OFFICIAL TRANSPARENT PRICING'}</span>
          </div>

          <h2 className="font-editorial font-bold text-3xl sm:text-5xl text-white tracking-wide leading-tight">
            {lang === 'es'
              ? 'Precios Claros. Calidad de Detallado Móvil.'
              : 'Clear Upfront Pricing. Mobile Quality.'}
          </h2>

          <div
            className="w-16 h-[2px] mx-auto mt-4 transition-all duration-300"
            style={{ backgroundColor: currentTheme.accentBar }}
          />

          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            {lang === 'es'
              ? 'Tarifas base confirmadas del flyer oficial de G Contreras Car Wash. Cada lavado incluye limpieza a mano exterior, rines, vidrios, marcos de puerta, aspirado y enjuague libre de manchas.'
              : 'Base vehicle pricing verified from the official G Contreras Car Wash rate sheet. Every wash includes exterior hand wash, rims, glass, jambs, interior wipe-down, and spot-free rinse.'}
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onViewFlyer}
              className="px-4 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              style={{
                borderColor: currentTheme.borderSubtle,
                backgroundColor: currentTheme.bgCard,
                color: currentTheme.primaryLight,
              }}
            >
              <FileImage className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span>{lang === 'es' ? 'Ver Imagen Original del Flyer' : 'View Original Instagram Price Flyer'}</span>
            </button>
          </div>
        </div>

        {/* 1. Tactile Vehicle Switcher Bar (All 6 Categories) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span>{lang === 'es' ? 'Selecciona tu Categoría de Vehículo:' : 'Tactile Vehicle Category Selector:'}</span>
            </span>
            <span className="text-[11px] font-mono" style={{ color: currentTheme.primaryLight }}>
              {lang === 'es' ? 'Precios exactos de flyer' : 'Confirmed flyer rates'}
            </span>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-2 rounded-2xl border"
            style={{
              backgroundColor: currentTheme.bgSurface,
              borderColor: currentTheme.borderSubtle,
            }}
          >
            {allTiers.map((tier) => {
              const isActive = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleSelectTier(tier.id)}
                  className={`relative p-3 rounded-xl text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'scale-[1.02] shadow-lg'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                  style={{
                    backgroundColor: isActive ? currentTheme.bgCard : 'transparent',
                    border: isActive
                      ? `2px solid ${currentTheme.primary}`
                      : `1px solid ${currentTheme.borderSubtle}`,
                    boxShadow: isActive ? `0 4px 20px -3px ${currentTheme.glow}` : 'none',
                  }}
                  data-cursor="service"
                >
                  {rippleTarget === tier.id && (
                    <span
                      className="absolute inset-0 rounded-xl ripple-effect pointer-events-none"
                      style={{ backgroundColor: `${currentTheme.primary}25` }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {lang === 'es' ? tier.nameEs : tier.name}
                    </span>
                    {isActive && (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.primary }} />
                    )}
                  </div>

                  <span
                    className="font-mono text-base font-extrabold block tracking-tight"
                    style={{ color: isActive ? currentTheme.primaryLight : currentTheme.primary }}
                  >
                    {lang === 'es' ? tier.priceDisplayEs : tier.priceDisplay}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Tactile Vehicle Details Showcase Card */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 mb-16 shadow-2xl transition-all duration-300 ${
            isTransitioning ? 'opacity-70 translate-x-1 scale-[0.995]' : 'opacity-100 translate-x-0 scale-100'
          }`}
          style={{
            backgroundColor: currentTheme.bgCard,
            borderColor: currentTheme.borderFocus,
            boxShadow: `0 20px 40px -15px ${currentTheme.glow}`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-md border text-xs font-mono font-bold uppercase"
                  style={{
                    backgroundColor: currentTheme.badgeBg,
                    borderColor: currentTheme.borderSubtle,
                    color: currentTheme.primaryLight,
                  }}
                >
                  {currentTierObj.badge || 'Standard Service'}
                </span>
                <span className="text-xs text-slate-400">
                  {currentTierObj.isVariable
                    ? (lang === 'es' ? 'Cotización según medidas' : 'Quoted based on size & condition')
                    : (lang === 'es' ? 'Lavado completo a domicilio' : 'Full mobile service at your location')}
                </span>
              </div>

              <h3 className="font-editorial font-bold text-3xl sm:text-4xl text-white tracking-wide">
                {lang === 'es' ? currentTierObj.nameEs : currentTierObj.name}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {lang === 'es' ? currentTierObj.descriptionEs : currentTierObj.description}
              </p>

              <div
                className="p-3.5 rounded-xl border text-xs text-slate-400"
                style={{
                  backgroundColor: currentTheme.bgSurface,
                  borderColor: currentTheme.borderSubtle,
                }}
              >
                <span className="font-bold text-slate-200 block mb-1">
                  {lang === 'es' ? 'Modelos de referencia comunes:' : 'Common reference models:'}
                </span>
                <span className="italic text-slate-300">{currentTierObj.examples}</span>
              </div>

              {/* Verified standard inclusions checklist */}
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider block mb-2"
                  style={{ color: currentTheme.primary }}
                >
                  {lang === 'es' ? 'Servicios Incluidos en Este Lavado:' : 'Services Included in This Wash:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {STANDARD_INCLUSIONS.slice(0, 6).map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.primary }} />
                      <span>{lang === 'es' ? item.es : item.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action Box */}
            <div
              className="lg:col-span-5 rounded-xl border p-6 flex flex-col justify-between text-center lg:text-left"
              style={{
                backgroundColor: currentTheme.bgSurface,
                borderColor: currentTheme.borderSubtle,
              }}
            >
              <div>
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider block mb-1">
                  {lang === 'es' ? 'TARIFA BASE' : 'BASE VEHICLE RATE'}
                </span>
                <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-2">
                  <span
                    className="font-editorial font-extrabold text-5xl text-white tracking-tight"
                    style={{ textShadow: `0 0 20px ${currentTheme.glow}` }}
                  >
                    {lang === 'es' ? currentTierObj.priceDisplayEs : currentTierObj.priceDisplay}
                  </span>
                  {!currentTierObj.isVariable && (
                    <span className="text-xs text-slate-400">
                      {lang === 'es' ? '/ lavado a domicilio' : '/ driveway wash'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  {lang === 'es'
                    ? 'Agua tratada spot-free, químicos seguros para la pintura y equipo autónomo incluido.'
                    : 'Spot-free rinse water, safe chemicals, and on-board power included.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onBookWithPackage(currentTierObj.id, selectedAddOns)}
                className="btn-shine w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                style={{
                  background: currentTheme.btnBg,
                  color: currentTheme.btnText,
                  border: `1px solid ${currentTheme.btnBorder}`,
                  boxShadow: `0 4px 18px -2px ${currentTheme.glow}`,
                }}
              >
                <span>
                  {currentTierObj.isVariable
                    ? (lang === 'es' ? 'Solicitar Cotización' : 'Request Custom Quote')
                    : (lang === 'es' ? 'Agendar con Este Paquete' : 'Book This Package')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Interactive Price & Add-On Customizer */}
        <div
          className="rounded-2xl border p-6 sm:p-10 shadow-xl mb-12"
          style={{
            backgroundColor: currentTheme.bgCard,
            borderColor: currentTheme.borderSubtle,
          }}
        >
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b"
            style={{ borderColor: currentTheme.borderSubtle }}
          >
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: currentTheme.primary }}
              >
                <Calculator className="w-4 h-4" />
                <span>{lang === 'es' ? 'PERSONALIZADOR DE SERVICIO' : 'ESTIMATE CALCULATOR'}</span>
              </div>
              <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-white tracking-wide">
                {lang === 'es' ? 'Agrega Tratamientos a Tu Medida' : 'Customize Your Detail with Add-Ons'}
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {lang === 'es' ? 'Precios claros e independientes' : 'Clear separate itemized pricing'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Add-ons mobile-friendly scan list */}
            <div className="lg:col-span-7">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                {lang === 'es' ? 'Servicios Adicionales Oficiales (Opcional):' : 'Official Add-On Services (Optional):'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ON_SERVICES.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`relative p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer overflow-hidden ${
                        isChecked
                          ? 'shadow-sm text-white'
                          : 'text-slate-300 hover:border-white/20'
                      }`}
                      style={{
                        backgroundColor: isChecked ? `${currentTheme.badgeBg}` : currentTheme.bgSurface,
                        borderColor: isChecked ? currentTheme.primary : currentTheme.borderSubtle,
                      }}
                      data-cursor="service"
                    >
                      {rippleTarget === addon.id && (
                        <span
                          className="absolute inset-0 rounded-xl ripple-effect pointer-events-none"
                          style={{ backgroundColor: `${currentTheme.primary}25` }}
                        />
                      )}

                      <div className="flex items-center gap-3 pr-2">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0"
                          style={{
                            backgroundColor: isChecked ? currentTheme.primary : 'transparent',
                            border: isChecked ? 'none' : `1px solid ${currentTheme.borderSubtle}`,
                            color: currentTheme.btnText,
                          }}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold block">
                            {lang === 'es' ? addon.nameEs : addon.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block line-clamp-1">
                            {lang === 'es' ? addon.descriptionEs : addon.description}
                          </span>
                        </div>
                      </div>

                      <span
                        className="font-mono text-xs font-extrabold shrink-0"
                        style={{ color: currentTheme.primary }}
                      >
                        +${addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Estimate Breakdown Card */}
            <div
              className="lg:col-span-5 p-6 rounded-xl border shadow-xl"
              style={{
                backgroundColor: currentTheme.bgSurface,
                borderColor: currentTheme.borderFocus,
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider block mb-4"
                style={{ color: currentTheme.primary }}
              >
                {lang === 'es' ? 'RESUMEN DEL ESTIMADO' : 'ESTIMATE BREAKDOWN'}
              </span>

              <div
                className="space-y-3 pb-5 border-b text-xs"
                style={{ borderColor: currentTheme.borderSubtle }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">
                    {lang === 'es' ? currentTierObj.nameEs : currentTierObj.name}
                  </span>
                  <span className="font-mono text-white font-semibold">
                    {lang === 'es' ? currentTierObj.priceDisplayEs : currentTierObj.priceDisplay}
                  </span>
                </div>

                {selectedAddOns.map((id) => {
                  const item = ADD_ON_SERVICES.find((a) => a.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex items-center justify-between text-slate-400">
                      <span>{lang === 'es' ? item.nameEs : item.name}</span>
                      <span className="font-mono" style={{ color: currentTheme.primaryLight }}>
                        +${item.price}
                      </span>
                    </div>
                  );
                })}

                {selectedAddOns.length === 0 && (
                  <div className="text-[11px] text-slate-500 italic">
                    {lang === 'es' ? 'Ningún servicio extra seleccionado' : 'No extra add-on services selected'}
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="flex items-baseline justify-between pt-5 mb-6">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">
                    {lang === 'es' ? 'TOTAL ESTIMADO' : 'ESTIMATED TOTAL'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {lang === 'es' ? 'Servicio móvil a tu domicilio' : 'Mobile service at your driveway'}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className="font-editorial font-extrabold text-3xl sm:text-4xl"
                    style={{
                      color: currentTheme.primaryLight,
                      textShadow: `0 0 20px ${currentTheme.glow}`,
                    }}
                  >
                    ${estimate.totalPrice}
                    {currentTierObj.isVariable && '*'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onBookWithPackage(currentTierObj.id, selectedAddOns)}
                className="btn-shine w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                style={{
                  background: currentTheme.btnBg,
                  color: currentTheme.btnText,
                  border: `1px solid ${currentTheme.btnBorder}`,
                  boxShadow: `0 4px 18px -2px ${currentTheme.glow}`,
                }}
              >
                <span>{lang === 'es' ? 'Agendar con Este Estimado' : 'Book With This Estimate'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Required Pricing & Scope Confirmation Note */}
        <div
          className="p-4 rounded-xl border flex items-start gap-3 text-xs text-slate-400"
          style={{
            backgroundColor: currentTheme.bgSurface,
            borderColor: currentTheme.borderSubtle,
          }}
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentTheme.primary }} />
          <div>
            <p className="font-medium text-slate-200">
              {lang === 'es'
                ? 'Nota importante sobre tarifas y confirmación:'
                : 'Important notice regarding pricing & scope:'}
            </p>
            <p className="mt-0.5">
              {lang === 'es'
                ? 'El precio final debe confirmarse según la condición del vehículo (lodo severo, suciedad extrema o pelo abundante de mascota), tamaño exacto y requerimientos específicos. Por favor confirma tu servicio al momento de coordinar la cita.'
                : 'Final pricing should be confirmed based on vehicle condition, size, and service requirements. Please confirm your service and price when booking.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
