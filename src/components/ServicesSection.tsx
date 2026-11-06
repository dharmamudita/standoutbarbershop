"use client";

import React, { useEffect, useRef, useState } from "react";
import { GROOMING_SERVICES, MEDIA_URLS, STUDIO_META } from "@/data/barberData";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  prefersReducedMotion: boolean;
  isRecorderMode: boolean;
}

const SERVICE_PREVIEW_IMAGES: string[] = [
  MEDIA_URLS.heroPortrait,
  MEDIA_URLS.capCardPhoto,
  MEDIA_URLS.avatars[1],
  MEDIA_URLS.sideProfilePhoto,
  MEDIA_URLS.qIndustrialPhoto,
  MEDIA_URLS.avatars[3],
  MEDIA_URLS.avatars[2],
  MEDIA_URLS.avatars[4],
  MEDIA_URLS.avatars[0],
];

export default function ServicesSection({
  onSelectService,
  prefersReducedMotion,
  isRecorderMode,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "haircut" | "treatment">("all");
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState<boolean>(false);

  const filteredServices = GROOMING_SERVICES.filter((svc) => {
    if (activeCategory === "all") return true;
    return svc.category === activeCategory;
  });

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
  }, [prefersReducedMotion, isRecorderMode, activeCategory]);

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

  // Close modal on escape
  useEffect(() => {
    if (!isFlyerModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFlyerModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlyerModalOpen]);

  return (
    <section
      ref={sectionRef}
      className="services-section"
      id="services"
      aria-label="Price List dan Menu Layanan Standout Barbershop"
    >
      <div className="section-eyebrow-row reveal-item" data-delay="0">
        <div className="eyebrow-left">
          <div className="services-eyebrow-meta">
            <span className="eyebrow-tag">PRICE LIST RESMI · STANDOUT BARBERSHOP</span>
            <span className="eyebrow-quote">"READY TO SERVE YOU WITH OUR BEST SERVICE."</span>
          </div>
          <h2 className="section-display-title">Menu Layanan &amp; Tarif</h2>
        </div>
        <div className="eyebrow-right-wrapper">
          <p className="eyebrow-right-note">
            Setiap sesi di Standout Barbershop dirancang presisi dengan standar
            kebersihan tinggi, konsultasi struktur kepala, serta sentuhan styling modern.
          </p>
          <button
            type="button"
            className="view-flyer-btn"
            onClick={() => setIsFlyerModalOpen(true)}
            aria-label="Lihat brosur price list resmi toko"
          >
            <span className="flyer-btn-icon" aria-hidden="true">📄</span>
            <span>Lihat Brosur Toko</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills + Treatment Promo Ribbon */}
      <div className="services-filter-row reveal-item" data-delay="40">
        <div className="services-tabs" role="tablist" aria-label="Filter Kategori Layanan">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            className={`service-tab-btn ${activeCategory === "all" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            <span>Semua Layanan</span>
            <span className="tab-count">09</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "haircut"}
            className={`service-tab-btn ${activeCategory === "haircut" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("haircut")}
          >
            <span>Special Haircut</span>
            <span className="tab-count">04</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "treatment"}
            className={`service-tab-btn ${activeCategory === "treatment" ? "is-active" : ""}`}
            onClick={() => setActiveCategory("treatment")}
          >
            <span>Special Treatments</span>
            <span className="tab-count">05</span>
          </button>
        </div>

        {/* Promo Notice */}
        <div className="treatment-promo-pill">
          <span className="promo-badge-tag">INFO RESMI</span>
          <span className="promo-text">
            *Semua <strong>Special Treatments</strong> sudah termasuk <strong>Gratis Potong Rambut (Free Haircut)</strong>
          </span>
        </div>
      </div>

      {/* Interactive Service Table List */}
      <div
        className="service-list"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {filteredServices.map((service, idx) => {
          const globalIdx = GROOMING_SERVICES.findIndex((s) => s.id === service.id);
          return (
            <div
              key={service.id}
              className="service-row reveal-item"
              data-delay={idx * 55}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setHoveredIdx(globalIdx >= 0 ? globalIdx : idx)}
              onClick={() => onSelectService(service.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectService(service.name);
                }
              }}
            >
              <div className="service-idx-col">
                <span className="service-idx">{service.indexLabel}</span>
                {service.badge && (
                  <span className={`service-mini-badge badge-${service.badge.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                    {service.badge}
                  </span>
                )}
              </div>

              <div className="service-title-col">
                <h3 className="service-name">{service.name}</h3>
                {service.subtitle && (
                  <span className="service-subtitle">{service.subtitle}</span>
                )}
              </div>

              <div className="service-desc-col">
                <p className="service-desc">{service.description}</p>
              </div>

              <div className="service-price-col">
                <div className="service-price-tag">
                  <span className="price-num">{service.priceLabel}</span>
                  <span className="price-dur">{service.duration}</span>
                </div>
              </div>

              <div className="service-action-col">
                <span className="service-action">
                  <span>Pesan</span>
                  <span className="service-action-circle" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </div>
            </div>
          );
        })}
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
          {SERVICE_PREVIEW_IMAGES.map((imgUrl, idx) => {
            const svc = GROOMING_SERVICES[idx];
            return (
              <div
                key={`lens-${idx}`}
                className={`lens-slide ${hoveredIdx === idx ? "is-active" : ""}`}
              >
                <img src={imgUrl} alt="" />
                <div className="lens-meta-bar">
                  <span>{svc?.indexLabel}</span>
                  <span>{svc?.priceLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Flyer Lightbox Modal */}
      {isFlyerModalOpen && (
        <div
          className="modal-backdrop is-open flyer-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Brosur Price List Resmi Standout Barbershop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFlyerModalOpen(false);
          }}
        >
          <div className="flyer-modal-card">
            <div className="flyer-modal-header">
              <div>
                <h3 className="flyer-modal-title">Brosur Price List Resmi</h3>
                <p className="flyer-modal-sub">Standout Barbershop · {STUDIO_META.address}</p>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsFlyerModalOpen(false)}
                aria-label="Tutup brosur"
              >
                ✕
              </button>
            </div>
            <div className="flyer-modal-body">
              <img
                src="/price-list-standout.png"
                alt="Standout Barbershop Official Price List"
                className="flyer-preview-img"
              />
            </div>
            <div className="flyer-modal-footer">
              <div className="flyer-footer-contacts">
                <span>WhatsApp: <strong>{STUDIO_META.whatsappDisplay}</strong></span>
                <span>Instagram: <strong>{STUDIO_META.instagramHandle}</strong></span>
              </div>
              <button
                type="button"
                className="flyer-book-cta"
                onClick={() => {
                  setIsFlyerModalOpen(false);
                  onSelectService(GROOMING_SERVICES[0].name);
                }}
              >
                <span>Reservasi Sekarang</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
