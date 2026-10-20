import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Car,
  MapPin,
  Phone,
  User,
  CheckCircle,
  MessageSquare,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import {
  VEHICLE_TIERS,
  ADD_ON_SERVICES,
  BUSINESS_INFO,
  SERVICE_CITIES
} from '../data/businessData';
import {
  formatPhoneNumber,
  calculateEstimate,
  validateBookingForm,
  createWhatsAppMessage,
  generateBookingReference,
  type BookingFormData
} from '../utils/booking';
import { useTheme } from '../context/ThemeContext';

interface BookingFormProps {
  lang: 'en' | 'es';
  preselectedTier?: string;
  preselectedAddOns?: string[];
}

export const BookingForm: React.FC<BookingFormProps> = ({
  lang,
  preselectedTier,
  preselectedAddOns
}) => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    city: 'Bakersfield',
    streetAddress: '',
    vehicleTier: preselectedTier || 'midsize',
    selectedAddOns: preselectedAddOns || [],
    preferredDate: '',
    preferredTime: '10:00 AM',
    specialNotes: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [submittedBooking, setSubmittedBooking] = useState<{
    data: BookingFormData;
    reference: string;
    submittedAt: string;
  } | null>(null);

  // Sync props if changed from estimator
  useEffect(() => {
    if (preselectedTier) {
      setFormData((prev) => ({ ...prev, vehicleTier: preselectedTier }));
    }
    if (preselectedAddOns) {
      setFormData((prev) => ({ ...prev, selectedAddOns: preselectedAddOns }));
    }
  }, [preselectedTier, preselectedAddOns]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleAddOn = (id: string) => {
    setFormData((prev) => {
      const exists = prev.selectedAddOns.includes(id);
      const updated = exists
        ? prev.selectedAddOns.filter((item) => item !== id)
        : [...prev.selectedAddOns, id];
      return { ...prev, selectedAddOns: updated };
    });
  };

  const estimate = calculateEstimate(formData.vehicleTier, formData.selectedAddOns);

  // Tomorrow as default minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const today = tomorrow.toISOString().split('T')[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const ref = generateBookingReference();
    setSubmittedBooking({
      data: { ...formData },
      reference: ref,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  const handleWhatsAppBooking = () => {
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const ref = generateBookingReference();
    const waUrl = createWhatsAppMessage(formData, ref, BUSINESS_INFO.intlPhone);
    setSubmittedBooking({
      data: { ...formData },
      reference: ref,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const resetForm = () => {
    setSubmittedBooking(null);
    setFormData({
      fullName: '',
      phone: '',
      city: 'Bakersfield',
      streetAddress: '',
      vehicleTier: 'midsize',
      selectedAddOns: [],
      preferredDate: '',
      preferredTime: '10:00 AM',
      specialNotes: ''
    });
    setErrors({});
  };

  return (
    <section
      id="book"
      className="py-20 lg:py-28 relative border-t"
      style={{
        backgroundColor: currentTheme.bgBase,
        borderColor: currentTheme.borderSubtle,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md"
            style={{
              borderColor: currentTheme.borderSubtle,
              backgroundColor: currentTheme.badgeBg,
              color: currentTheme.primaryLight,
            }}
          >
            <Calendar className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
            <span>{lang === 'es' ? 'AGENDA TU LAVADO' : 'MOBILE APPOINTMENT'}</span>
          </div>
          <h2 className="font-editorial font-bold text-3xl sm:text-4xl text-white tracking-wide leading-tight">
            {lang === 'es'
              ? 'Solicita tu Detallado a Domicilio'
              : 'Book Your Driveway Detail'}
          </h2>

          <div
            className="w-14 h-[2px] mx-auto mt-4 transition-all duration-300"
            style={{ backgroundColor: currentTheme.accentBar }}
          />

          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            {lang === 'es'
              ? 'Completa los datos de tu vehículo y ubicación. Te confirmaremos la hora exacta directamente por llamada o mensaje de WhatsApp.'
              : 'Provide your vehicle details and service address in Kern County. We will confirm your exact slot via call or WhatsApp.'}
          </p>
        </div>

        {submittedBooking ? (
          /* Confirmation & Summary State */
          <div
            className="max-w-2xl mx-auto rounded-2xl border-2 p-8 sm:p-10 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-300"
            style={{
              backgroundColor: currentTheme.bgCard,
              borderColor: currentTheme.borderFocus,
              boxShadow: `0 20px 40px -10px ${currentTheme.glow}`,
            }}
          >
            <div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-5"
              style={{
                backgroundColor: currentTheme.badgeBg,
                borderColor: currentTheme.primary,
                color: currentTheme.primary,
              }}
            >
              <CheckCircle className="w-8 h-8" />
            </div>

            <span
              className="text-xs font-mono font-bold uppercase tracking-widest block mb-1"
              style={{ color: currentTheme.primaryLight }}
            >
              {lang === 'es' ? 'SOLICITUD PREPARADA' : 'BOOKING REQUEST READY'}
            </span>

            <h3 className="font-editorial font-bold text-2xl sm:text-3xl text-white mb-2 tracking-wide">
              {lang === 'es'
                ? `¡Gracias, ${submittedBooking.data.fullName.split(' ')[0]}!`
                : `Thank You, ${submittedBooking.data.fullName.split(' ')[0]}!`}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6">
              {lang === 'es'
                ? 'Tu solicitud para servicio a domicilio ha sido estructurada con éxito. Para agilizar la confirmación inmediata con el dueño del negocio, puedes enviar los datos por WhatsApp o llamar directamente.'
                : 'Your mobile booking request has been generated. To expedite immediate scheduling with the business owner, tap below to send your details via WhatsApp or call directly.'}
            </p>

            {/* Structured Summary Card */}
            <div
              className="rounded-xl border p-5 text-left text-xs space-y-3 mb-8"
              style={{
                backgroundColor: currentTheme.bgSurface,
                borderColor: currentTheme.borderSubtle,
              }}
            >
              <div
                className="flex items-center justify-between pb-3 border-b"
                style={{ borderColor: currentTheme.borderSubtle }}
              >
                <span className="text-slate-400">{lang === 'es' ? 'Código de Referencia:' : 'Reference Code:'}</span>
                <span className="font-mono font-bold text-sm" style={{ color: currentTheme.primaryLight }}>
                  {submittedBooking.reference}
                </span>
              </div>

              <div
                className="grid grid-cols-2 gap-3 pb-3 border-b"
                style={{ borderColor: currentTheme.borderSubtle }}
              >
                <div>
                  <span className="text-slate-400 block text-[11px]">{lang === 'es' ? 'Vehículo:' : 'Vehicle:'}</span>
                  <span className="font-semibold text-white capitalize">{submittedBooking.data.vehicleTier}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{lang === 'es' ? 'Estimado Base + Extras:' : 'Estimated Total:'}</span>
                  <span className="font-mono font-bold" style={{ color: currentTheme.primaryLight }}>${estimate.totalPrice}</span>
                </div>
              </div>

              <div
                className="pb-3 border-b"
                style={{ borderColor: currentTheme.borderSubtle }}
              >
                <span className="text-slate-400 block text-[11px]">{lang === 'es' ? 'Ubicación de Servicio:' : 'Service Location:'}</span>
                <span className="font-semibold text-white">
                  {submittedBooking.data.city}, CA • {submittedBooking.data.streetAddress}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[11px]">{lang === 'es' ? 'Horario Preferido:' : 'Requested Slot:'}</span>
                  <span className="font-semibold text-white">
                    {submittedBooking.data.preferredDate} ({submittedBooking.data.preferredTime})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{lang === 'es' ? 'Teléfono:' : 'Contact:'}</span>
                  <span className="font-mono font-semibold text-white">{submittedBooking.data.phone}</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-4">
              <a
                href={createWhatsAppMessage(submittedBooking.data, submittedBooking.reference, BUSINESS_INFO.intlPhone)}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'es' ? 'Enviar WhatsApp al (661) 692-1044' : 'Send via WhatsApp'}</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.rawPhone}`}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: currentTheme.bgSurface,
                  borderColor: currentTheme.borderSubtle,
                }}
              >
                <Phone className="w-4 h-4" style={{ color: currentTheme.primary }} />
                <span>{lang === 'es' ? 'Llamar al Dueño' : 'Call (661) 692-1044'}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 pt-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Crear otra solicitud' : 'Submit another booking request'}</span>
            </button>
          </div>
        ) : (
          /* Actual Interactive Enquiry Form */
          <div
            className="max-w-3xl mx-auto rounded-2xl border p-6 sm:p-10 shadow-2xl"
            style={{
              backgroundColor: currentTheme.bgCard,
              borderColor: currentTheme.borderSubtle,
            }}
          >
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Step 1: Customer Contact Info */}
              <div>
                <div
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                  style={{
                    color: currentTheme.primary,
                    borderColor: currentTheme.borderSubtle,
                  }}
                >
                  <User className="w-4 h-4" />
                  <span>{lang === 'es' ? '1. Datos de Contacto' : '1. Contact Details'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-medium text-slate-300 mb-1.5">
                      {lang === 'es' ? 'Nombre Completo *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. Carlos Mendoza"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-white/10'
                      }`}
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                      }}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                      {lang === 'es' ? 'Número de Teléfono (con WhatsApp) *' : 'Phone Number (WhatsApp Ready) *'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="(661) 555-0123"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      }`}
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                      }}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Location & Address */}
              <div>
                <div
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                  style={{
                    color: currentTheme.primary,
                    borderColor: currentTheme.borderSubtle,
                  }}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{lang === 'es' ? '2. Área y Dirección del Servicio' : '2. Service Area & Address'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="city" className="block text-xs font-medium text-slate-300 mb-1.5">
                      {lang === 'es' ? 'Ciudad de Servicio *' : 'Service City *'}
                    </label>
                    <select
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-sm text-white focus:outline-none"
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                      }}
                    >
                      {SERVICE_CITIES.map((c) => (
                        <option key={c.name} value={c.name} className="bg-slate-900 text-white">
                          {c.name}, CA
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="streetAddress" className="block text-xs font-medium text-slate-300 mb-1.5">
                      {lang === 'es' ? 'Dirección de la Casa o Trabajo *' : 'Driveway / Street Address *'}
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      placeholder="e.g. 1420 Olive Dr, Bakersfield"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white focus:outline-none transition-colors ${
                        errors.streetAddress ? 'border-red-500' : 'border-white/10'
                      }`}
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                      }}
                    />
                    {errors.streetAddress && (
                      <p className="mt-1 text-xs text-red-400">{errors.streetAddress}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 3: Vehicle Selection & Add-Ons */}
              <div>
                <div
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                  style={{
                    color: currentTheme.primary,
                    borderColor: currentTheme.borderSubtle,
                  }}
                >
                  <Car className="w-4 h-4" />
                  <span>{lang === 'es' ? '3. Vehículo y Servicios' : '3. Vehicle Category & Add-Ons'}</span>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    {lang === 'es' ? 'Selecciona la categoría del vehículo *' : 'Select vehicle category *'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {VEHICLE_TIERS.map((tier) => {
                      const isSelected = formData.vehicleTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleInputChange('vehicleTier', tier.id)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                            isSelected ? 'text-white shadow-sm' : 'text-slate-300 hover:border-white/20'
                          }`}
                          style={{
                            backgroundColor: isSelected ? currentTheme.badgeBg : currentTheme.bgSurface,
                            borderColor: isSelected ? currentTheme.primary : currentTheme.borderSubtle,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{lang === 'es' ? tier.nameEs : tier.name}</span>
                            <span className="font-mono font-bold" style={{ color: currentTheme.primaryLight }}>
                              ${tier.price}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-1 line-clamp-1">{tier.description}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-300 mb-2">
                    {lang === 'es' ? 'Servicios adicionales opcionales:' : 'Optional add-on treatments:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {ADD_ON_SERVICES.map((addon) => {
                      const isChecked = formData.selectedAddOns.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddOn(addon.id)}
                          className={`p-2.5 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-all ${
                            isChecked ? 'text-white' : 'text-slate-300 hover:border-white/20'
                          }`}
                          style={{
                            backgroundColor: isChecked ? currentTheme.badgeBg : currentTheme.bgSurface,
                            borderColor: isChecked ? currentTheme.primary : currentTheme.borderSubtle,
                          }}
                        >
                          <span className="text-xs">{lang === 'es' ? addon.nameEs : addon.name}</span>
                          <span className="font-mono text-xs font-bold" style={{ color: currentTheme.primaryLight }}>
                            +${addon.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 4: Date & Time Schedule */}
              <div>
                <div
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b"
                  style={{
                    color: currentTheme.primary,
                    borderColor: currentTheme.borderSubtle,
                  }}
                >
                  <Clock className="w-4 h-4" />
                  <span>{lang === 'es' ? '4. Fecha y Horario Deseado' : '4. Preferred Schedule'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="preferredDate" className="block text-xs font-medium text-slate-300 mb-1.5">
                      {lang === 'es' ? 'Fecha Preferida *' : 'Preferred Date *'}
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      min={today}
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-white focus:outline-none transition-colors ${
                        errors.preferredDate ? 'border-red-500' : 'border-white/10'
                      }`}
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                      }}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs text-red-400">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-xs font-medium text-slate-300 mb-1.5">
                      {lang === 'es' ? 'Horario Preferido *' : 'Preferred Time Slot *'}
                    </label>
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-sm text-white focus:outline-none"
                      style={{
                        backgroundColor: currentTheme.bgSurface,
                      }}
                    >
                      <option value="08:00 AM">8:00 AM - 10:00 AM (Early Morning)</option>
                      <option value="10:00 AM">10:00 AM - 12:00 PM (Mid Morning)</option>
                      <option value="12:00 PM">12:00 PM - 02:00 PM (Afternoon)</option>
                      <option value="02:00 PM">02:00 PM - 04:00 PM (Late Afternoon)</option>
                      <option value="04:00 PM">04:00 PM - 06:00 PM (Evening)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="specialNotes" className="block text-xs font-medium text-slate-300 mb-1.5">
                    {lang === 'es' ? 'Notas Adicionales (Opcional)' : 'Special Requests or Notes (Optional)'}
                  </label>
                  <textarea
                    id="specialNotes"
                    rows={2}
                    value={formData.specialNotes}
                    onChange={(e) => handleInputChange('specialNotes', e.target.value)}
                    placeholder="e.g. Parked in side driveway, pet hair on back seats, gate code #1234"
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none"
                    style={{
                      backgroundColor: currentTheme.bgSurface,
                    }}
                  />
                </div>
              </div>

              {/* Estimate Calculation Summary Bar */}
              <div
                className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{
                  backgroundColor: currentTheme.bgSurface,
                  borderColor: currentTheme.borderSubtle,
                }}
              >
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-semibold">
                    {lang === 'es' ? 'Estimado para esta selección:' : 'Estimate for this selection:'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-editorial font-extrabold text-2xl"
                      style={{ color: currentTheme.primaryLight }}
                    >
                      ${estimate.totalPrice}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({estimate.vehicleName} + {formData.selectedAddOns.length} {lang === 'es' ? 'adicionales' : 'add-ons'})
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400">
                  <span>{lang === 'es' ? '5to Lavado es Gratis con programa de lealtad' : '5th wash is free loyalty promo applies'}</span>
                </div>
              </div>

              {/* Action Buttons: Instant WhatsApp & Submit Request */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] bg-emerald-500 hover:bg-emerald-400 text-black hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Pedir Cita por WhatsApp' : 'Book Instantly via WhatsApp'}</span>
                </button>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  style={{
                    background: currentTheme.btnBg,
                    color: currentTheme.btnText,
                    border: `1px solid ${currentTheme.btnBorder}`,
                    boxShadow: `0 4px 18px -2px ${currentTheme.glow}`,
                  }}
                >
                  <span>{lang === 'es' ? 'Generar Solicitud de Cita' : 'Submit Booking Request'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center">
                <a
                  href={`tel:${BUSINESS_INFO.rawPhone}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                  <span>{lang === 'es' ? '¿Prefieres llamar por teléfono?' : 'Prefer to call directly?'} <strong className="font-mono text-white">{BUSINESS_INFO.phone}</strong></span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
