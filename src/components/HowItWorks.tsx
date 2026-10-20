import React from 'react';
import { Car, Calendar, Sparkles, PhoneCall } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HowItWorksProps {
  lang: 'en' | 'es';
  onBookClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang, onBookClick }) => {
  const { currentTheme } = useTheme();

  const steps = [
    {
      num: '01',
      title: lang === 'es' ? 'Elige tu Servicio' : 'Choose Your Service',
      desc:
        lang === 'es'
          ? 'Selecciona el tamaño de tu vehículo (pequeño, mediano o troca grande) y elige cualquier servicio extra como shampoo de asientos o cera protectora.'
          : 'Select your vehicle category (small sedan, mid-size, or truck/SUV) and choose any optional specialty add-ons like seat shampoo or wax protection.',
      icon: Car,
    },
    {
      num: '02',
      title: lang === 'es' ? 'Solicita tu Cita Móvil' : 'Request Your Booking',
      desc:
        lang === 'es'
          ? 'Ingresa tu dirección en Bakersfield, Shafter o Wasco con tu fecha y horario deseado, o envíanos un mensaje rápido por WhatsApp.'
          : 'Share your driveway address in Bakersfield, Shafter, or Wasco along with your preferred date and time slot via our form or instant WhatsApp.',
      icon: Calendar,
    },
    {
      num: '03',
      title: lang === 'es' ? 'Disfruta tu Auto Impecable' : 'Enjoy A Cleaner Ride',
      desc:
        lang === 'es'
          ? 'Confirmamos la cita directamente contigo. Llegamos a tu ubicación con nuestro equipo autónomo y agua spot-free para dejar tu auto como nuevo.'
          : 'We confirm your appointment directly with you. Our mobile truck arrives fully self-contained to leave your vehicle spot-free and shining.',
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 relative"
      style={{
        backgroundColor: currentTheme.bgBase,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: currentTheme.primary }}
          >
            {lang === 'es' ? 'PROCESO SENCILLO' : 'SIMPLE 3-STEP PROCESS'}
          </div>
          <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-white tracking-wide leading-tight">
            {lang === 'es'
              ? 'Cuidar de tu Auto Nunca Fue Tan Fácil'
              : 'Effortless Car Detailing, Brought to You'}
          </h2>

          <div
            className="w-14 h-[2px] mx-auto mt-4 transition-all duration-300"
            style={{ backgroundColor: currentTheme.accentBar }}
          />

          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            {lang === 'es'
              ? 'Sin filas en el autolavado ni perder tiempo de tu fin de semana. Nosotros vamos a tu casa.'
              : 'Skip the weekend car wash line and save hours. We bring the full detailing studio right to your home.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 relative">
          {/* Subtle line connecting steps on desktop */}
          <div
            className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-[1px] pointer-events-none -z-0"
            style={{
              background: `linear-gradient(to right, transparent, ${currentTheme.borderFocus}, transparent)`,
            }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 group shadow-lg"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  borderColor: currentTheme.borderSubtle,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-2xl font-extrabold transition-colors"
                      style={{ color: currentTheme.primaryLight }}
                    >
                      {step.num}
                    </span>
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
                  </div>

                  <h3 className="font-editorial font-bold text-xl text-white mb-3 tracking-wide transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div
                  className="mt-6 pt-4 border-t flex items-center justify-between text-xs text-slate-400"
                  style={{ borderColor: currentTheme.borderSubtle }}
                >
                  <span>{lang === 'es' ? `Paso ${idx + 1} de 3` : `Step ${idx + 1} of 3`}</span>
                  <span className="font-semibold" style={{ color: currentTheme.primaryLight }}>
                    {lang === 'es' ? 'Kern County' : 'Mobile Service'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Booking Clarification Notice */}
        <div
          className="p-4 rounded-xl border max-w-2xl mx-auto flex items-center justify-between gap-4 text-xs text-slate-400"
          style={{
            backgroundColor: currentTheme.bgSurface,
            borderColor: currentTheme.borderSubtle,
          }}
        >
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 shrink-0" style={{ color: currentTheme.primary }} />
            <span>
              {lang === 'es'
                ? 'Las citas se confirman de forma personalizada vía llamada o mensaje de texto para garantizar tu horario.'
                : 'Appointments are confirmed directly with you via call or text to verify schedule and location.'}
            </span>
          </div>
          <button
            type="button"
            onClick={onBookClick}
            className="font-bold whitespace-nowrap cursor-pointer transition-colors hover:text-white"
            style={{ color: currentTheme.primaryLight }}
          >
            {lang === 'es' ? 'Agendar →' : 'Book →'}
          </button>
        </div>
      </div>
    </section>
  );
};
