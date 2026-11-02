"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import TrustPanelSection from "@/components/TrustPanelSection";
import SplitShowcaseSection from "@/components/SplitShowcaseSection";
import KineticMarquee from "@/components/KineticMarquee";
import ServicesSection from "@/components/ServicesSection";
import StudioFooterSection from "@/components/StudioFooterSection";
import BookingModal from "@/components/BookingModal";
import CustomCursor from "@/components/CustomCursor";
import { GROOMING_SERVICES } from "@/data/barberData";

export default function StandoutBarberPage() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>(
    GROOMING_SERVICES[0].name
  );
  const [isRecorderMode, setIsRecorderMode] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsRecorderMode(params.get("rec") === "1");

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent): void => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleOpenBooking = (serviceName?: string): void => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsBookingOpen(true);
  };

  return (
    <main className="stage-wrap">
      {/* Custom Editorial Magnetic Cursor + Top Scroll Progress */}
      <CustomCursor prefersReducedMotion={prefersReducedMotion} />

      {/* Section 1: Editorial Hero (1440 x 938u) */}
      <HeroSection
        onOpenBooking={handleOpenBooking}
        isRecorderMode={isRecorderMode}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Lower Pure Black Surface (#000000) */}
      <div className="dark-surface">
        <div className="artboard">
          {/* Section 2: 111u Bar & Scroll-Filling Manifesto Statement */}
          <ManifestoSection
            isRecorderMode={isRecorderMode}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Section 3: Bordered Trust Panel (1302 x 429u) */}
          <TrustPanelSection
            isRecorderMode={isRecorderMode}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Scroll-Velocity Reactive Counter-Rotating Kinetic Split Marquee */}
        <KineticMarquee prefersReducedMotion={prefersReducedMotion} />

        <div className="artboard">
          {/* Section 4: Scroll-Driven Split Hallway & Interactive Split Inspector */}
          <SplitShowcaseSection
            onOpenBooking={handleOpenBooking}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Section 5: Grooming Architecture Service Index with Floating Lens */}
          <ServicesSection
            onSelectService={(serviceName) => handleOpenBooking(serviceName)}
            prefersReducedMotion={prefersReducedMotion}
            isRecorderMode={isRecorderMode}
          />

          {/* Section 6: Studio Flagship Location & Concierge Footer */}
          <StudioFooterSection onOpenBooking={() => handleOpenBooking()} />
        </div>
      </div>

      {/* Interactive WhatsApp Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        initialService={selectedService}
        onClose={() => setIsBookingOpen(false)}
      />
    </main>
  );
}
