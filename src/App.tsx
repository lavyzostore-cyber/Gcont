/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { LoyaltyBanner } from './components/LoyaltyBanner';
import { Gallery } from './components/Gallery';
import { HowItWorks } from './components/HowItWorks';
import { BookingForm } from './components/BookingForm';
import { AboutAndServiceArea } from './components/AboutAndServiceArea';
import { Footer } from './components/Footer';
import { FlyerModal } from './components/FlyerModal';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from './data/businessData';

export default function App() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [flyerModalOpen, setFlyerModalOpen] = useState(false);
  const [preselectedTier, setPreselectedTier] = useState<string>('midsize');
  const [preselectedAddOns, setPreselectedAddOns] = useState<string[]>([]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  const scrollToBooking = () => {
    const el = document.getElementById('book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (tierId: string, addOnIds: string[]) => {
    setPreselectedTier(tierId);
    setPreselectedAddOns(addOnIds);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onBookClick={scrollToBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          lang={lang}
          onBookClick={scrollToBooking}
          onExploreClick={scrollToServices}
          onViewFlyer={() => setFlyerModalOpen(true)}
        />

        {/* 2. Services Section */}
        <Services
          lang={lang}
          onBookService={(name) => {
            scrollToBooking();
          }}
          onViewFlyer={() => setFlyerModalOpen(true)}
        />

        {/* 3. Pricing Section & Interactive Estimator */}
        <Pricing
          lang={lang}
          onBookWithPackage={handleSelectPackage}
          onViewFlyer={() => setFlyerModalOpen(true)}
        />

        {/* 4. Loyalty Program Banner (5th Wash Free) */}
        <LoyaltyBanner
          lang={lang}
          onEnquire={scrollToBooking}
        />

        {/* 5. Our Work & Vehicle Gallery with Before/After Slider */}
        <Gallery
          lang={lang}
          onBookClick={scrollToBooking}
        />

        {/* 6. How It Works (3 Simple Steps) */}
        <HowItWorks
          lang={lang}
          onBookClick={scrollToBooking}
        />

        {/* 7. Dedicated Booking Experience Form */}
        <BookingForm
          lang={lang}
          preselectedTier={preselectedTier}
          preselectedAddOns={preselectedAddOns}
        />

        {/* 8. About Business & Kern County Service Area */}
        <AboutAndServiceArea
          lang={lang}
          onBookClick={scrollToBooking}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* High-Resolution Official Flyer Modal */}
      <FlyerModal
        isOpen={flyerModalOpen}
        onClose={() => setFlyerModalOpen(false)}
        lang={lang}
      />

      {/* Discreet Mobile Floating Action Bar (Adheres to 15% Mobile Sticky Cap) */}
      <aside aria-label="Mobile quick actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#090C16]/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.rawPhone}`}
          className="flex-1 py-2 px-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${BUSINESS_INFO.intlPhone}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex-1 py-2 px-2 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={scrollToBooking}
          className="flex-[1.5] py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{lang === 'es' ? 'Reservar' : 'Book Detail'}</span>
        </button>
      </aside>
    </div>
  );
}
