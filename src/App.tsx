import React, { useState } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { HeaderMegaMenu } from './components/HeaderMegaMenu';
import { HeroCarousel } from './components/HeroCarousel';
import { PartnersLogoStrip } from './components/PartnersLogoStrip';
import { ServicesShowcase } from './components/ServicesShowcase';
import { WhatMakesUsDifferent } from './components/WhatMakesUsDifferent';
import { CtaBanner } from './components/CtaBanner';
import { WorkingProcess } from './components/WorkingProcess';
import { OffersUpdatesDueDates } from './components/OffersUpdatesDueDates';
import { WhyLpiHighlights } from './components/WhyLpiHighlights';
import { AiComplianceSection } from './components/AiComplianceSection';
import { GlobalBrandsStrip } from './components/GlobalBrandsStrip';
import { WhyChooseUsGrid } from './components/WhyChooseUsGrid';
import { StatsCounter } from './components/StatsCounter';
import { CustomerReviews } from './components/CustomerReviews';
import { MultiStepLeadForm } from './components/MultiStepLeadForm';
import { MobileAppBanner } from './components/MobileAppBanner';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import {
  BrochureModal,
  LoginModal,
  AppointmentModal,
  ServiceDetailModal,
  BlogArticleModal,
  SuccessModal
} from './components/Modals';
import { ServiceItem, BlogPost, LeadFormData } from './types';
import { SERVICES_DATA } from './data/servicesData';

export function App() {
  // Modal states
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);

  // Pre-selected service for lead form
  const [formPreselectedService, setFormPreselectedService] = useState<string>('');

  const handleSelectServiceByName = (serviceName: string) => {
    const found = SERVICES_DATA.find(
      (s) => s.name.toLowerCase() === serviceName.toLowerCase()
    );
    if (found) {
      setSelectedService(found);
    } else {
      // Direct jump to lead form
      setFormPreselectedService(serviceName);
      const contactEl = document.getElementById('contact-consultation-section');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleApplyFromDetail = (serviceName: string) => {
    setFormPreselectedService(serviceName);
    const contactEl = document.getElementById('contact-consultation-section');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSuccess = (lead: LeadFormData) => {
    setSubmittedLead(lead);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased">
      {/* 1. TOP UTILITY BAR */}
      <TopUtilityBar
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* 2. HEADER & MEGA-MENU NAVIGATION */}
      <HeaderMegaMenu
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onSelectService={handleSelectServiceByName}
        onOpenConsultation={() => {
          const contactEl = document.getElementById('contact-consultation-section');
          if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <main className="flex-grow">
        {/* 3. HERO SECTION WITH IMAGE CAROUSEL & CTA PILLS */}
        <HeroCarousel
          onSelectCategory={(catName) => {
            const el = document.getElementById('services-showcase-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* 4. LOGO STRIP / PARTNERS */}
        <PartnersLogoStrip />

        {/* 5. SERVICES SHOWCASE / POPULAR CATEGORIES */}
        <ServicesShowcase
          onSelectService={(srv) => setSelectedService(srv)}
          onApplyService={(srvName) => handleApplyFromDetail(srvName)}
        />

        {/* 6. WHAT MAKES US DIFFERENT */}
        <WhatMakesUsDifferent onLearnMore={() => setIsAppointmentOpen(true)} />

        {/* 7. "REGISTER YOUR BUSINESS WITH CONFIDENCE" CTA BANNER */}
        <CtaBanner onOpenAppointment={() => setIsAppointmentOpen(true)} />

        {/* 8. WORKING PROCESS SECTION */}
        <WorkingProcess />

        {/* 9. SPECIAL OFFERS + UPDATES & ALERTS + DUE DATES (3-Column) */}
        <OffersUpdatesDueDates
          onApplyOffer={(code) => {
            handleApplyFromDetail(`Offer: ${code}`);
          }}
          onOpenConsultation={() => {
            const contactEl = document.getElementById('contact-consultation-section');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 10. "WHY LPI" / FEATURE HIGHLIGHTS */}
        <WhyLpiHighlights />

        {/* 11. "SIMPLIFYING COMPLIANCE THROUGH AI" DETAILED SECTION */}
        <AiComplianceSection />

        {/* 12. GLOBAL BRANDS LOGO STRIP */}
        <GlobalBrandsStrip />

        {/* 13. "WHY CHOOSE US" ICON GRID */}
        <WhyChooseUsGrid />

        {/* 14. STATS COUNTER SECTION ("Our Journey in Numbers") */}
        <StatsCounter />

        {/* 15. CUSTOMER REVIEWS SECTION */}
        <CustomerReviews />

        {/* 16. CONTACT INFO + MULTI-STEP LEAD FORM SECTION */}
        <MultiStepLeadForm
          initialService={formPreselectedService}
          onSuccess={handleLeadSuccess}
        />

        {/* 17. MOBILE APP PROMOTION BANNER */}
        <MobileAppBanner />

        {/* 18. BLOG SECTION ("Latest Tips & Trends") */}
        <BlogSection onReadArticle={(article) => setSelectedArticle(article)} />
      </main>

      {/* 19. FOOTER */}
      <Footer onSelectService={handleSelectServiceByName} />

      {/* 20. FLOATING ELEMENTS */}
      <FloatingActions />

      {/* Interactive Modals */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onApply={handleApplyFromDetail}
      />

      <BlogArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <SuccessModal
        lead={submittedLead}
        onClose={() => setSubmittedLead(null)}
      />
    </div>
  );
}

export default App;
