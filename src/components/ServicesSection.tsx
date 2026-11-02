"use client";

import React, { useEffect, useRef, useState } from "react";
import { GROOMING_SERVICES, MEDIA_URLS } from "@/data/barberData";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  prefersReducedMotion: boolean;
  isRecorderMode: boolean;
}

const SERVICE_PREVIEW_IMAGES: string[] = [
  MEDIA_URLS.heroPortrait,
  MEDIA_URLS.capCardPhoto,
  MEDIA_URLS.sideProfilePhoto,
  MEDIA_URLS.qIndustrialPhoto,
  MEDIA_URLS.avatars[2],
];

export default function ServicesSection({
  onSelectService,
  prefersReducedMotion,
  isRecorderMode,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      isRecorderMode ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const rootEl = sectionRef.current;
    if (!rootEl) return;

    const targets = Array.from(
      rootEl.querySelectorAll<HTMLElement>(".reveal-item")
    );
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const delayAttr = Number(target.dataset.delay || "0");
          target.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0px)" },
            ],
            {
              duration: 780,
              delay: delayAttr,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "forwards",
            }
          );
          observer.unobserve(target);
        });
      },
      { threshold: 0.14 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [prefersReducedMotion, isRecorderMode]);

  // Smooth cursor-following floating lookbook lens inside Services section
  useEffect(() => {
    if (prefersReducedMotion) return;
    const sectionEl = sectionRef.current;
    const lensEl = lensRef.current;
    if (!sectionEl || !lensEl) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = sectionEl.getBoundingClientRect();
      targetX = e.clientX - rect.left + 28;
      targetY = e.clientY - rect.top - 90;
    };

    const tick = (): void => {
      currX += (targetX - currX) * 0.14;
      currY += (targetY - currY) * 0.14;
      const tilt = (targetX - currX) * 0.08;
      lensEl.style.transform = `translate3d(${currX.toFixed(1)}px, ${currY.toFixed(
        1
      )}px, 0) rotate(${Math.max(-6, Math.min(6, tilt)).toFixed(2)}deg)`;
      rafId = requestAnimationFrame(tick);
    };

    sectionEl.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      sectionEl.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="services-section"
      id="services"
      aria-label="Daftar Layanan dan Perawatan"
    >
      <div className="section-eyebrow-row reveal-item" data-delay="0">
        <div className="eyebrow-left">
          <span className="eyebrow-tag">Daftar Layanan · 2026</span>
          <h2 className="section-display-title">Menu Layanan &amp; Cukur</h2>
        </div>
        <p className="eyebrow-right-note">
          Setiap sesi di Standout Barbershop dimulai dengan analisis struktur
          kepala, arah tumbuh rambut, dan gaya penataan harian Anda.
        </p>
      </div>

      <div
        className="service-list"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {GROOMING_SERVICES.map((service, idx) => (
          <div
            key={service.id}
            className="service-row reveal-item"
            data-delay={idx * 65}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setHoveredIdx(idx)}
            onClick={() => onSelectService(service.name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectService(service.name);
              }
            }}
          >
            <span className="service-idx">{service.indexLabel}</span>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-desc">{service.description}</p>
            <span className="service-duration">
              {service.duration} · {service.priceLabel}
            </span>
            <span className="service-action">
              <span>Pesan</span>
              <span className="service-action-circle" aria-hidden="true">
                ↗
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Floating Split-Shutter Preview Lens on Desktop */}
      <div
        ref={lensRef}
        className={`service-floating-lens ${
          hoveredIdx !== null ? "is-visible" : ""
        }`}
        aria-hidden="true"
      >
        <div className="lens-inner-reel">
          {SERVICE_PREVIEW_IMAGES.map((imgUrl, idx) => (
            <div
              key={`lens-${idx}`}
              className={`lens-slide ${hoveredIdx === idx ? "is-active" : ""}`}
            >
              <img src={imgUrl} alt="" />
              <div className="lens-meta-bar">
                <span>{GROOMING_SERVICES[idx]?.indexLabel}</span>
                <span>{GROOMING_SERVICES[idx]?.priceLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
