import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimate,
  formatPhoneNumber,
  validateBookingForm,
  createWhatsAppMessage,
  type BookingFormData
} from './booking.ts';

test('formatPhoneNumber formats raw digits correctly', () => {
  assert.equal(formatPhoneNumber('6616921044'), '(661) 692-1044');
  assert.equal(formatPhoneNumber('661'), '(661');
  assert.equal(formatPhoneNumber('661692'), '(661) 692');
  assert.equal(formatPhoneNumber('(661) 692-1044'), '(661) 692-1044');
});

test('calculateEstimate computes vehicle base prices and add-ons', () => {
  // Small vehicle ($35) without add-ons
  const small = calculateEstimate('small', []);
  assert.equal(small.basePrice, 35);
  assert.equal(small.addOnsTotal, 0);
  assert.equal(small.totalPrice, 35);
  assert.equal(small.isCustomQuote, false);

  // Mid-size ($45) with Seat Shampoo ($20) and Wax ($25)
  const midsize = calculateEstimate('midsize', ['seat_shampoo', 'wax_protection']);
  assert.equal(midsize.basePrice, 45);
  assert.equal(midsize.addOnsTotal, 45);
  assert.equal(midsize.totalPrice, 90);

  // Large truck ($50) with all add-ons
  const large = calculateEstimate('large', ['pet_hair', 'headlight_restoration']);
  assert.equal(large.basePrice, 50);
  assert.equal(large.addOnsTotal, 40); // 10 + 30
  assert.equal(large.totalPrice, 90);

  // Specialty RV (Price Varies)
  const rv = calculateEstimate('rvs', []);
  assert.equal(rv.isCustomQuote, true);
});

test('validateBookingForm flags missing and invalid fields', () => {
  const invalidData: BookingFormData = {
    fullName: '',
    phone: '123',
    city: '',
    streetAddress: '12',
    vehicleTier: '',
    selectedAddOns: [],
    preferredDate: '',
    preferredTime: '',
  };

  const result = validateBookingForm(invalidData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.city);
  assert.ok(result.errors.streetAddress);
  assert.ok(result.errors.vehicleTier);
  assert.ok(result.errors.preferredDate);
  assert.ok(result.errors.preferredTime);
});

test('validateBookingForm passes with valid inputs', () => {
  const validData: BookingFormData = {
    fullName: 'Carlos Rodriguez',
    phone: '(661) 692-1044',
    city: 'Bakersfield',
    streetAddress: '5400 Stockdale Hwy',
    vehicleTier: 'midsize',
    selectedAddOns: ['seat_shampoo'],
    preferredDate: '2026-10-25',
    preferredTime: '10:00 AM',
  };

  const result = validateBookingForm(validData);
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('createWhatsAppMessage creates a properly encoded URL targeting verified phone', () => {
  const booking: BookingFormData = {
    fullName: 'Maria Santos',
    phone: '(661) 555-0199',
    city: 'Shafter',
    streetAddress: '120 Central Ave',
    vehicleTier: 'small',
    selectedAddOns: ['wax_protection'],
    preferredDate: '2026-10-22',
    preferredTime: '02:00 PM',
  };

  const url = createWhatsAppMessage(booking, 'en', 'GC-TEST');
  assert.ok(url.startsWith('https://wa.me/16616921044?text='));
  assert.ok(url.includes('Maria%20Santos'));
  assert.ok(url.includes('Shafter'));
  assert.ok(url.includes('Small%20Vehicles'));
  assert.ok(url.includes('GC-TEST'));
});
