import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Droplets,
  Disc,
  Truck,
  Armchair,
  Check,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import {
  STANDARD_INCLUSIONS,
} from '../data/businessData';
import { useTheme } from '../context/ThemeContext';

interface ServicesProps {
  lang: 'en' | 'es';
  onBookService: (serviceName?: string) => void;
  onViewFlyer: () => void;
}

interface ServiceCardData {
  id: string;
  number: string;
  title: string;
  titleEs: string;
  tagline: string;
  taglineEs: string;
  description: string;
  descriptionEs: string;
  priceNote: string;
  priceNoteEs: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  features: { en: string; es: string }[];
}

// Interactive card with subtle pointer tilt (<= 2 deg) and soft light sweep
const InteractiveCard: React.FC<{
  service: ServiceCardData;
  lang: 'en' | 'es';
  onSelect: (name: string) => void;
}> = ({ service, lang, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, lx: 50, ly: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const { currentTheme } = useTheme();
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Strict max 2 degrees tilt
    const rx = ((y / rect.height) - 0.5) * -3;
    const ry = ((x / rect.width) - 0.5) * 3;
    const lx = (x / rect.width) * 100;
    const ly = (y / rect.height) * 100;

    setTilt({ rx, ry, lx, ly });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, lx: 50, ly: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="service"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: currentTheme.bgCard,
        borderColor: isHovered ? currentTheme.borderFocus : currentTheme.borderSubtle,
        boxShadow: isHovered ? `0 12px 30px -10px ${currentTheme.glow}` : 'none',
      }}
      className="relative rounded-2xl border p-7 flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-lg group"
    >
      {/* Soft reflected light moving across card surface */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 240px at ${tilt.lx}% ${tilt.ly}%, rgba(${currentTheme.primaryRgb}, 0.12), transparent 70%)`,
        }}
      />

      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all group-hover:scale-110"
            style={{
              backgroundColor: currentTheme.badgeBg,
              borderColor: currentTheme.borderSubtle,
              color: currentTheme.primary,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: currentTheme.primary }} />
          </div>
          <span
            className="text-xs font-mono font-bold tracking-wider"
            style={{ color: currentTheme.primaryLight }}
          >
            {service.number}
          </span>
        </div>

        <h3 className="font-editorial font-bold text-xl text-white transition-colors mb-1.5 transition-transform duration-200 group-hover:translate-x-0.5 tracking-wide">
          {lang === 'es' ? service.titleEs : service.title}
        </h3>

        <span
          className="text-[11px] font-semibold uppercase tracking-wider block mb-3"
          style={{ color: currentTheme.primaryLight }}
        >
          {lang === 'es' ? service.taglineEs : service.tagline}
        </span>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          {lang === 'es' ? service.descriptionEs : service.description}
        </p>

        {/* Feature bullets */}
        <ul className="space-y-2 text-xs text-slate-300 mb-6">
          {service.features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 shrink-0" style={{ color: currentTheme.primary }} />
              <span>{lang === 'es' ? feat.es : feat.en}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="pt-4 border-t flex items-center justify-between text-xs"
        style={{ borderColor: currentTheme.borderSubtle }}
      >
        <div>
          <span className="text-[10px] text-slate-500 uppercase block">
            {lang === 'es' ? 'Tarifa' : 'Pricing'}
          </span>
          <span className="font-mono font-bold text-white text-sm">
            {lang === 'es' ? service.priceNoteEs : service.priceNote}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelect(service.title)}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          style={{
            backgroundColor: currentTheme.bgSurface,
            color: '#FFFFFF',
            border: `1px solid ${currentTheme.borderSubtle}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.primary;
            e.currentTarget.style.color = currentTheme.btnText;
            e.currentTarget.style.borderColor = currentTheme.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.bgSurface;
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = currentTheme.borderSubtle;
          }}
        >
          <span>{lang === 'es' ? 'Seleccionar' : 'Select'}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export const Services: React.FC<ServicesProps> = ({
  lang,
  onBookService,
  onViewFlyer,
}) => {
  const { currentTheme } = useTheme();

  const serviceList: ServiceCardData[] = [
    {
      id: 'exterior-hand-wash',
      number: '01',
      title: 'Exterior Hand Wash',
      titleEs: 'Lavado Exterior a Mano',
      tagline: 'Snow foam pre-soak & spot-free rinse',
      taglineEs: 'Prelavado con espuma activa y agua desmineralizada',
      description: 'Two-bucket hand wash that prevents micro-swirls, followed by deionized spot-free water and hand-drying with plush microfibers.',
      descriptionEs: 'Lavado a mano con técnica de dos cubetas para cuidar la pintura, enjuague desmineralizado sin sarro y secado delicado.',
      priceNote: 'Included in Base ($35–$50)',
      priceNoteEs: 'Incluido en Base ($35–$50)',
      icon: Droplets,
      features: [
        { en: 'Thick snow foam bath to lift dirt', es: 'Cañón de espuma densa que afloja suciedad' },
        { en: 'Filtered spot-free pure water rinse', es: 'Enjuague con agua tratada sin manchas' },
        { en: 'Scratch-safe microfiber hand dry', es: 'Secado suave con toallas de microfibra' }
      ]
    },
    {
      id: 'interior-cleaning',
      number: '02',
      title: 'Interior Cleaning & Wipe-Down',
      titleEs: 'Limpieza y Detallado Interior',
      tagline: 'Dust extraction & cabin refresh',
      taglineEs: 'Aspirado profundo y molduras impecables',
      description: 'Precision vacuuming of carpets and seats, dashboard and center console UV wipe-down, cup holder sanitation, and streak-free glass.',
      descriptionEs: 'Aspirado a fondo de tapetes y asientos, limpieza detallada de tablero, consola, portavasos y vidrios transparentes.',
      priceNote: 'Included in Base Service',
      priceNoteEs: 'Incluido en Servicio Base',
      icon: Armchair,
      features: [
        { en: 'Carpet & seat vacuuming', es: 'Aspirado completo de cabina y asientos' },
        { en: 'Dashboard & console wipe-down', es: 'Limpieza de tablero y consola central' },
        { en: 'Clean door jambs and seals', es: 'Marcos de puertas y sellos limpios' }
      ]
    },
    {
      id: 'wheels-tire-cleaning',
      number: '03',
      title: 'Wheels & Tire Cleaning',
      titleEs: 'Limpieza de Rines y Llantas',
      tagline: 'Brake dust removal & high-gloss dressing',
      taglineEs: 'Desengrase de rines y abrillantador premium',
      description: 'Specialty wheel cleaner targeting burnt brake dust, barrel agitation, lug nut scrub, and non-sling high-gloss tire protection.',
      descriptionEs: 'Disolvente especial para polvo de frenos, cepillado de rayos y cama de rin, más protector abrillantador para llantas.',
      priceNote: 'Included in Base Service',
      priceNoteEs: 'Incluido en Servicio Base',
      icon: Disc,
      features: [
        { en: 'Brake dust dissolver formula', es: 'Fórmula descontaminante de frenos' },
        { en: 'Alloy spokes & rim barrels scrubbed', es: 'Limpieza de cara y cavidad del rin' },
        { en: 'Long-lasting satin/gloss tire shine', es: 'Brillo duradero que no salpica' }
      ]
    },
    {
      id: 'wax-paint-protection',
      number: '04',
      title: 'Wax & Paint Protection',
      titleEs: 'Cera y Protección de Pintura',
      tagline: 'Deep hydrophobic shine & UV barrier',
      taglineEs: 'Brillo hidrofóbico y barrera solar UV',
      description: 'High-grade protective hand wax applied across all exterior painted panels, repelling water beading and shielding clear coat against Kern County sun.',
      descriptionEs: 'Cera de alta calidad aplicada a mano para repelencia al agua, brillo profundo y protección contra el sol del valle.',
      priceNote: '+$25 Add-On Treatment',
      priceNoteEs: '+$25 Servicio Adicional',
      icon: Shield,
      features: [
        { en: 'High water beading hydrophobics', es: 'Efecto hidrofóbico repele-agua' },
        { en: 'UV clear coat oxidation protection', es: 'Protección contra desgaste solar UV' },
        { en: 'Hand buffed for deep mirror reflection', es: 'Pulido a mano para reflejo de espejo' }
      ]
    },
    {
      id: 'full-detail-services',
      number: '05',
      title: 'Full-Detail Services',
      titleEs: 'Servicios de Detallado Completo',
      tagline: 'Comprehensive bumper-to-bumper transformation',
      taglineEs: 'Transformación total por dentro y por fuera',
      description: 'Combining exterior wash, engine bay cleaning (+$20), seat shampoo extraction (+$20), headlight restoration (+$30), and deep interior steam.',
      descriptionEs: 'Combina el lavado exterior, motor (+$20), shampoo de asientos (+$20), restauración de faros (+$30) y vaporizado interior.',
      priceNote: 'Custom Package / Estimate',
      priceNoteEs: 'Paquete Personalizado',
      icon: Sparkles,
      features: [
        { en: 'Deep seat shampoo & stain extraction', es: 'Extracción de manchas en tapicería' },
        { en: 'Engine bay degrease & dress', es: 'Desengrasado y protección de motor' },
        { en: 'Headlight oxidation removal', es: 'Eliminación de paño amarillo en faros' }
      ]
    },
    {
      id: 'mobile-car-wash',
      number: '06',
      title: '100% Mobile Service Rig',
      titleEs: 'Servicio 100% a Domicilio',
      tagline: 'We come straight to your home or office',
      taglineEs: 'Vamos directo a tu cochera o trabajo',
      description: 'Fully self-contained mobile truck outfitted with water tank, pressure washer, generator, and commercial detailing tools across Kern County.',
      descriptionEs: 'Troca equipada con tanque de agua, hidrolavadora, generador y herramientas profesionales. Cero esperas en filas.',
      priceNote: 'Included in All Bookings',
      priceNoteEs: 'Incluido en Todas las Citas',
      icon: Truck,
      features: [
        { en: 'No water or power hookup required', es: 'Tanque y equipo totalmente autónomos' },
        { en: 'Bakersfield, Shafter & Wasco radius', es: 'Cobertura en Bakersfield, Shafter y Wasco' },
        { en: 'Save hours of weekend wait times', es: 'Ahorra horas sin salir de tu casa' }
      ]
    }
  ];

  return (
    <section
      id="services"
      className="py-20 lg:py-28 relative border-t"
      style={{
        backgroundColor: currentTheme.bgBase,
        borderColor: currentTheme.borderSubtle,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Poster Accent Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase mb-3"
              style={{
                borderColor: currentTheme.borderSubtle,
                backgroundColor: currentTheme.badgeBg,
                color: currentTheme.primaryLight,
              }}
            >
              <Layers className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
              <span>{lang === 'es' ? 'NUESTROS 6 PILARES DE SERVICIO' : 'OUR 6 SERVICE CAPABILITIES'}</span>
            </div>

            <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-white tracking-wide leading-tight">
              {lang === 'es'
                ? 'Detallado Especializado para Cada Área de tu Auto'
                : 'Specialized Care for Every Surface of Your Vehicle'}
            </h2>

            <div
              className="w-14 h-[2px] mt-4 transition-all duration-300"
              style={{ backgroundColor: currentTheme.accentBar }}
            />

            <p className="text-slate-400 mt-4 text-base leading-relaxed">
              {lang === 'es'
                ? 'Desde un lavado a mano suave con espuma densa hasta limpieza profunda de interiores, rines, cera protectora y paquetes completos. Consulta el alcance específico de cada servicio.'
                : 'Explore our 6 distinct service areas: exterior hand wash, cabin refresh, wheels & rims, wax protection, full detail packages, and mobile convenience.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onViewFlyer}
              className="px-4 py-2.5 rounded-lg border text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              style={{
                borderColor: currentTheme.borderSubtle,
                backgroundColor: currentTheme.bgCard,
                color: currentTheme.primaryLight,
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span>{lang === 'es' ? 'Ver Flyer Oficial' : 'View Official Flyer'}</span>
            </button>
          </div>
        </div>

        {/* 6 Distinctive Interactive Detailing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {serviceList.map((service) => (
            <InteractiveCard
              key={service.id}
              service={service}
              lang={lang}
              onSelect={onBookService}
            />
          ))}
        </div>

        {/* Standard Inclusions Checklist Banner */}
        <div
          className="rounded-2xl border p-8 shadow-xl"
          style={{
            backgroundColor: currentTheme.bgCard,
            borderColor: currentTheme.borderSubtle,
          }}
        >
          <div
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b"
            style={{ borderColor: currentTheme.borderSubtle }}
          >
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: currentTheme.primary }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'INCLUSIONES CONFIRMADAS' : 'CONFIRMED STANDARD INCLUSIONS'}</span>
              </div>
              <h3 className="font-editorial font-bold text-2xl text-white tracking-wide">
                {lang === 'es'
                  ? 'Incluido en Todo Servicio Estándar'
                  : 'Every Mobile Wash Package Includes:'}
              </h3>
            </div>
            <span
              className="text-xs px-3 py-1.5 rounded-md border"
              style={{
                backgroundColor: currentTheme.bgSurface,
                borderColor: currentTheme.borderSubtle,
                color: currentTheme.primaryLight,
              }}
            >
              {lang === 'es' ? 'Sin costo adicional' : 'Included at base price'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {STANDARD_INCLUSIONS.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3.5 rounded-xl border"
                style={{
                  backgroundColor: currentTheme.bgSurface,
                  borderColor: currentTheme.borderSubtle,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: currentTheme.badgeBg,
                    borderColor: currentTheme.borderSubtle,
                    color: currentTheme.primary,
                  }}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-slate-200">
                  {lang === 'es' ? item.es : item.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
