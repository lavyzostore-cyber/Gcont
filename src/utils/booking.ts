import { VEHICLE_TIERS, ADD_ON_SERVICES, SPECIALTY_TIERS, BUSINESS_INFO } from '../data/businessData.ts';

export interface BookingFormData {
  fullName: string;
  phone: string;
  city: 'Bakersfield' | 'Shafter' | 'Wasco' | '';
  streetAddress: string;
  vehicleTier: string;
  selectedAddOns: string[];
  preferredDate: string;
  preferredTime: string;
  specialNotes?: string;
}

export interface CalculationResult {
  basePrice: number;
  addOnsTotal: number;
  totalPrice: number;
  isCustomQuote: boolean;
  vehicleName: string;
  vehicleNameEs: string;
}

export function formatPhoneNumber(input: string): string {
  // Strip non-digit characters
  const cleaned = input.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US phone numbers
  if (cleaned.length <= 3) {
    return cleaned.length ? `(${cleaned}` : '';
  }
  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  }
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
}

export function calculateEstimate(vehicleTierId: string, addOnIds: string[] = []): CalculationResult {
  const standardTier = VEHICLE_TIERS.find((t) => t.id === vehicleTierId);
  const specialtyTier = SPECIALTY_TIERS.find((t) => t.id === vehicleTierId);

  let basePrice = 0;
  let isCustomQuote = false;
  let vehicleName = 'Selected Vehicle';
  let vehicleNameEs = 'Vehículo Seleccionado';

  if (standardTier) {
    basePrice = standardTier.price;
    vehicleName = standardTier.name;
    vehicleNameEs = standardTier.nameEs;
  } else if (specialtyTier) {
    isCustomQuote = specialtyTier.priceDisplay.toLowerCase().includes('varies');
    if (specialtyTier.id === 'utvs') {
      basePrice = 30; // Starting baseline for UTVs
    }
    vehicleName = specialtyTier.name;
    vehicleNameEs = specialtyTier.nameEs;
  }

  const addOnsTotal = addOnIds.reduce((sum, addOnId) => {
    const item = ADD_ON_SERVICES.find((a) => a.id === addOnId);
    return sum + (item ? item.price : 0);
  }, 0);

  return {
    basePrice,
    addOnsTotal,
    totalPrice: basePrice + addOnsTotal,
    isCustomQuote,
    vehicleName,
    vehicleNameEs
  };
}

export function validateBookingForm(data: BookingFormData): {
  isValid: boolean;
  errors: Partial<Record<keyof BookingFormData, string>>;
} {
  const errors: Partial<Record<keyof BookingFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters).';
  }

  const digits = data.phone.replace(/\D/g, '');
  if (digits.length < 10) {
    errors.phone = 'Please enter a valid 10-digit phone number.';
  }

  if (!data.city || !['Bakersfield', 'Shafter', 'Wasco'].includes(data.city)) {
    errors.city = 'Please select a service city (Bakersfield, Shafter, or Wasco).';
  }

  if (!data.streetAddress || data.streetAddress.trim().length < 5) {
    errors.streetAddress = 'Please provide your full street address for mobile service.';
  }

  if (!data.vehicleTier) {
    errors.vehicleTier = 'Please select your vehicle category.';
  }

  if (!data.preferredDate) {
    errors.preferredDate = 'Please select your preferred date.';
  }

  if (!data.preferredTime) {
    errors.preferredTime = 'Please select your preferred time slot.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function generateBookingReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'GC-';
  for (let i = 0; i < 4; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

export function createWhatsAppMessage(
  data: BookingFormData,
  lang: 'en' | 'es' = 'en',
  bookingRef?: string
): string {
  const estimate = calculateEstimate(data.vehicleTier, data.selectedAddOns);
  const refCode = bookingRef || generateBookingReference();

  const addOnNames = data.selectedAddOns
    .map((id) => {
      const match = ADD_ON_SERVICES.find((a) => a.id === id);
      return match ? (lang === 'es' ? match.nameEs : match.name) : id;
    })
    .join(', ');

  let message = '';

  if (lang === 'es') {
    message = `¡Hola G Contreras Car Wash! Me gustaría solicitar un lavado móvil a domicilio.\n\n` +
      `📋 *Referencia:* ${refCode}\n` +
      `👤 *Nombre:* ${data.fullName}\n` +
      `📞 *Teléfono:* ${data.phone}\n` +
      `📍 *Ciudad:* ${data.city}\n` +
      `🏠 *Dirección:* ${data.streetAddress}\n` +
      `🚗 *Vehículo:* ${estimate.vehicleNameEs}\n` +
      (data.selectedAddOns.length > 0 ? `✨ *Servicios Adicionales:* ${addOnNames}\n` : '') +
      `💰 *Estimado Base:* $${estimate.totalPrice}${estimate.isCustomQuote ? ' (cotización a confirmar)' : ''}\n` +
      `📅 *Fecha solicitada:* ${data.preferredDate}\n` +
      `⏰ *Hora preferida:* ${data.preferredTime}\n` +
      (data.specialNotes ? `📝 *Notas:* ${data.specialNotes}\n` : '') +
      `\n¡Gracias! Por favor confirmen si tienen disponibilidad.`;
  } else {
    message = `Hello G Contreras Car Wash! I would like to request a mobile car wash appointment.\n\n` +
      `📋 *Booking Ref:* ${refCode}\n` +
      `👤 *Name:* ${data.fullName}\n` +
      `📞 *Phone:* ${data.phone}\n` +
      `📍 *City:* ${data.city}\n` +
      `🏠 *Service Address:* ${data.streetAddress}\n` +
      `🚗 *Vehicle:* ${estimate.vehicleName}\n` +
      (data.selectedAddOns.length > 0 ? `✨ *Add-on Services:* ${addOnNames}\n` : '') +
      `💰 *Estimated Total:* $${estimate.totalPrice}${estimate.isCustomQuote ? ' (quote to be confirmed)' : ''}\n` +
      `📅 *Requested Date:* ${data.preferredDate}\n` +
      `⏰ *Preferred Time:* ${data.preferredTime}\n` +
      (data.specialNotes ? `📝 *Notes:* ${data.specialNotes}\n` : '') +
      `\nThank you! Please confirm if you have availability.`;
  }

  return `https://wa.me/${BUSINESS_INFO.intlPhone}?text=${encodeURIComponent(message)}`;
}
