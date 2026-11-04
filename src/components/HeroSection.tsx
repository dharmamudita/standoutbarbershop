"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  JACKET_WORDMARKS,
  MEDIA_URLS,
  NAV_LINKS,
  PARTNER_MARKS,
  STUDIO_META,
} from "@/data/barberData";
import { PartnerGlyphType } from "@/types/barber";
import { useCountUp, useWibStatus } from "@/utils/motion";
import StandoutLogo from "@/components/StandoutLogo";

interface HeroSectionProps {
  onOpenBooking: (preselectedService?: string) => void;
  isRecorderMode: boolean;
  prefersReducedMotion: boolean;
}

function PartnerGlyph({ type }: { type: PartnerGlyphType }) {
  switch (type) {
    case "circle":
      return (
        <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <circle
            cx="5"
            cy="5"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M2 8L5 2L8 8H2Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <rect
            x="2"
            y="2"
            width="6"
            height="6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M2 5H8M5 2V8"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      );
    case "diagonal":
      return (
        <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M2 2L8 8M8 2L2 8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <polygon
            points="5,1.5 8.5,5 5,8.5 1.5,5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
  }
}

function SplitKineticWord({
  text,
  lineIndex,
  prefersReducedMotion,
}: {
  text: string;
  lineIndex: number;
  prefersReducedMotion: boolean;
}) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letters = text.split("");

  useEffect(() => {
    if (prefersReducedMotion) return;
    charRefs.current.forEach((charEl, idx) => {
      if (!charEl) return;
      charEl.animate(
        [
          {
            transform: "translateY(112%) rotateX(-40deg)",
            opacity: 0,
          },
          {
            transform: "translateY(0%) rotateX(0deg)",
            opacity: 1,
          },
        ],
        {
          duration: 950,
          delay: lineIndex * 130 + idx * 42,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        }
      );
    });
  }, [lineIndex, prefersReducedMotion]);

  const handleWaveHover = (): void => {
    if (prefersReducedMotion) return;
    charRefs.current.forEach((charEl, idx) => {
      if (!charEl) return;
      charEl.animate(
        [
          { transform: "translateY(0%)" },
          { transform: "translateY(-14%)" },
          { transform: "translateY(0%)" },
        ],
        {
          duration: 520,
          delay: idx * 32,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );
    });
  };

  return (
    <span
      className="title-mask"
      onMouseEnter={handleWaveHover}
      aria-label={text}
    >
      <span className="title-line split-char-row" aria-hidden="true">
        {letters.map((ch, idx) => (
          <span
            key={`${ch}-${idx}`}
            ref={(el) => {
              charRefs.current[idx] = el;
            }}
            className="split-char"
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function HeroSection({
  onOpenBooking,
  isRecorderMode,
  prefersReducedMotion,
}: HeroSectionProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroPhotoWrapRef = useRef<HTMLDivElement | null>(null);
  const heroPhotoRef = useRef<HTMLImageElement | null>(null);
  const brandPlateRef = useRef<HTMLDivElement | null>(null);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState<{ width: number; left: number }>({
    width: 86,
    left: 0,
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const wibStatus = useWibStatus();
  const count400 = useCountUp(400, true, 1400, prefersReducedMotion);
  const count230 = useCountUp(230, true, 1400, prefersReducedMotion);

  const currentPillIndex = hoveredIdx !== null ? hoveredIdx : activeIdx;

  // Update sliding black pill position in segmented navigation
  useEffect(() => {
    const updatePill = (): void => {
      const navEl = navRef.current;
      const targetLink = linkRefs.current[currentPillIndex];
      if (!navEl || !targetLink) return;
      const navRect = navEl.getBoundingClientRect();
      const linkRect = targetLink.getBoundingClientRect();
      const isMobile = window.innerWidth <= 1024;
      setPillStyle({
        width: linkRect.width,
        left: linkRect.left - navRect.left - (isMobile ? 3.5 : 4),
      });
    };

    updatePill();
    const tId = window.setTimeout(updatePill, 60);
    window.addEventListener("resize", updatePill);
    return () => {
      window.clearTimeout(tId);
      window.removeEventListener("resize", updatePill);
    };
  }, [currentPillIndex]);

  // Web Animations API load choreography
  useEffect(() => {
    setIsLoaded(true);
    if (prefersReducedMotion) return;

    // Hero studio photo rises 40px, un-blurs and fades in over 1.35s
    if (heroPhotoWrapRef.current) {
      heroPhotoWrapRef.current.animate(
        [
          {
            transform: "translateY(40px) scale(1.03)",
            filter: "blur(14px)",
            opacity: 0,
          },
          {
            transform: "translateY(0px) scale(1)",
            filter: "blur(0px)",
            opacity: 1,
          },
        ],
        {
          duration: 1350,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        }
      );
    }

    // Nav drops in
    if (navRef.current) {
      navRef.current.animate(
        [
          { transform: "translateY(-22px)", opacity: 0 },
          { transform: "translateY(0px)", opacity: 1 },
        ],
        {
          duration: 920,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        }
      );
    }

    // Every other hero element rises 14px and fades in, staggered 55ms
    if (heroSectionRef.current) {
      const staggerItems = Array.from(
        heroSectionRef.current.querySelectorAll<HTMLElement>(".hero-stagger")
      );
      staggerItems.forEach((el, idx) => {
        const isCenteredPlate =
          el.classList.contains("brand-plate") ||
          el.classList.contains("jacket-wordmarks");

        el.animate(
          isCenteredPlate
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [
                { transform: "translateY(14px)", opacity: 0 },
                { transform: "translateY(0px)", opacity: 1 },
              ],
          {
            duration: 850,
            delay: 140 + idx * 55,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          }
        );
      });
    }
  }, [prefersReducedMotion]);

  // Smooth inertial scroll drift (0.12x) or Recorder Mode drift on Hero studio photo
  useEffect(() => {
    if (prefersReducedMotion) return;
    let rafId = 0;

    if (isRecorderMode) {
      const start = performance.now();
      const recLoop = (now: number): void => {
        const sec = (now - start) / 1000;
        if (heroPhotoRef.current) {
          heroPhotoRef.current.style.transform = `translate3d(0, ${Math.min(
            sec * 8,
            52
          ).toFixed(2)}px, 0)`;
        }
        if (sec < 7) rafId = requestAnimationFrame(recLoop);
      };
      rafId = requestAnimationFrame(recLoop);
      return () => cancelAnimationFrame(rafId);
    }

    let smoothedScroll = window.scrollY;
    const onScrollLoop = (): void => {
      const targetScroll = window.scrollY;
      smoothedScroll += (targetScroll - smoothedScroll) * 0.14;

      if (heroPhotoRef.current && targetScroll < window.innerHeight * 1.5) {
        const drift = smoothedScroll * 0.12;
        heroPhotoRef.current.style.transform = `translate3d(0, ${drift.toFixed(
          2
        )}px, 0)`;
      }
      rafId = requestAnimationFrame(onScrollLoop);
    };

    rafId = requestAnimationFrame(onScrollLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isRecorderMode, prefersReducedMotion]);

  // Subtle pointer depth on the frosted STANDOUT brand plate (desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>): void => {
    if (prefersReducedMotion || window.innerWidth <= 1024) return;
    const heroEl = heroSectionRef.current;
    const plateEl = brandPlateRef.current;
    if (!heroEl || !plateEl) return;

    const rect = heroEl.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    plateEl.style.transform = `translate3d(calc(-50% + ${(nx * 10).toFixed(
      2
    )}px), ${(ny * 8).toFixed(2)}px, 0)`;
  };

  const handleMouseLeave = (): void => {
    if (brandPlateRef.current && window.innerWidth > 1024) {
      brandPlateRef.current.style.transform = "translateX(-50%)";
    }
  };

  return (
    <div className="hero-surface" id="home">
      <section
        ref={heroSectionRef}
        className={`artboard hero ${isLoaded ? "is-loaded" : ""}`}
        aria-label="Standout Barbershop Hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 1. Top Bar: Brand Logo on Left, Segmented Nav, Date + Contact CTA on Right */}
        <header className="hero-top-bar">
          <div className="hero-brand-wrap hero-stagger">
            <StandoutLogo variant="horizontal" size={38} withLink />
          </div>

          <nav
            ref={navRef}
            className="hero-nav"
            aria-label="Navigasi Utama"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div
              className="nav-pill-indicator"
              style={{
                width: `${pillStyle.width}px`,
                transform: `translate3d(${pillStyle.left}px, 0, 0)`,
              }}
            />
            {NAV_LINKS.map((item, idx) => {
              const isHighlighted = currentPillIndex === idx;
              return (
                <a
                  key={item.id}
                  ref={(el) => {
                    linkRefs.current[idx] = el;
                  }}
                  href={item.href}
                  className={`nav-link ${isHighlighted ? "is-active" : ""}`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onFocus={() => setHoveredIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="hero-top-right">
            <div className="hero-date hero-stagger">
              <span>{wibStatus.weekday}</span>
              <span className="muted-slash">/</span>
              <span>
                {STUDIO_META.hoursLabel} · {STUDIO_META.cityCode}
              </span>
            </div>

            <button
              type="button"
              className="hero-contact-btn rolling-btn hero-stagger"
              onClick={() => onOpenBooking()}
              aria-label="Hubungi Kami / Reservasi"
            >
              <span className="btn-text rolling-label" data-text="Hubungi Kami">
                <span>Hubungi Kami</span>
              </span>
              <span className="arrow-ic" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        </header>

        {/* 2. Center Studio Portrait + Brand Plate + Jacket Wordmarks */}
        <div className="hero-center-stage">
          <div ref={heroPhotoWrapRef} className="hero-photo-wrap">
            <img
              ref={heroPhotoRef}
              className="hero-photo"
              src={MEDIA_URLS.heroPortrait}
              alt="Potret studio monokrom gaya rambut pria rapi dari belakang"
              fetchPriority="high"
            />
          </div>

          <div ref={brandPlateRef} className="brand-plate hero-stagger">
            <div className="brand-plate-mark">
              <StandoutLogo variant="emblem" theme="white" size={32} />
            </div>
            <span className="brand-plate-name">{STUDIO_META.shortName}</span>
            <div className="brand-plate-menu" aria-hidden="true">
              <span />
              <span />
            </div>
          </div>

          <div className="jacket-wordmarks hero-stagger" aria-hidden="true">
            {JACKET_WORDMARKS.map((word, index) => (
              <React.Fragment key={word}>
                <span>{word}</span>
                {index < JACKET_WORDMARKS.length - 1 && (
                  <span className="wm-sep" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3. Left & Right Editorial Content Columns */}
        <div className="hero-columns">
          {/* Left Column: Title + About + Stats Frame */}
          <div className="hero-left-col">
            <div className="hero-left-top">
              <div className="hero-title-group">
                <div className="title-row-1">
                  <SplitKineticWord
                    text="GAYA"
                    lineIndex={0}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <span className="hero-year-tag hero-stagger">(’26)</span>
                </div>
                <SplitKineticWord
                  text="PRESISI"
                  lineIndex={1}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

              <div className="hero-about-block">
                <div className="hero-about-label hero-stagger">
                  <span className="dot-indicator" />
                  <span>(TENTANG KAMI)</span>
                </div>
                <p className="hero-about-copy hero-stagger">
                  Menghadirkan seni cukur rambut pria presisi &amp; perawatan
                  modern bagi setiap pria di {STUDIO_META.cityFull}.
                </p>
                <button
                  type="button"
                  className="book-call-btn rolling-btn hero-stagger"
                  onClick={() => onOpenBooking()}
                >
                  <span className="rolling-label" data-text="Pesan Kursi">
                    <span>Pesan Kursi</span>
                  </span>
                  <span className="arrow-ic" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </div>
            </div>

            {/* Stats Frame (348 x 214u) */}
            <div className="stats-frame hero-stagger">
              {/* Left Dark Card */}
              <div className="stats-dark-card">
                <div className="stats-dark-top">
                  <div className="stats-big-num">{count400}+</div>
                  <div className="stats-sub-label">Pelanggan Setia</div>
                </div>

                <div
                  className="partner-marks-grid"
                  aria-label="Teknik potong rambut"
                >
                  {PARTNER_MARKS.map((mark) => (
                    <div key={mark.name} className="partner-pill">
                      <PartnerGlyph type={mark.glyph} />
                      <span>{mark.name}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="partner-cta-bar"
                  onClick={() => onOpenBooking()}
                >
                  <span>Reservasi kursi</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>

              {/* Right Photo Card (Cap photo) */}
              <div className="stats-photo-card">
                <img
                  src={MEDIA_URLS.capCardPhoto}
                  alt="Potret monokrom di studio"
                />
                <div className="stats-photo-head">
                  <div className="stats-photo-meta">
                    <span>Galeri Studio</span>
                    <span>05/06</span>
                  </div>
                  <div className="stats-photo-hairline" />
                </div>
                <div className="stats-photo-bottom">
                  <div className="stats-photo-num">{count230}+</div>
                  <div className="stats-photo-desc">
                    Potongan eksklusif setiap bulan di Lampung
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Frosted Pill + Availability + Out Now Card */}
          <div className="hero-right-col">
            <div className="hero-status-group hero-stagger">
              <div className="true-growth-pill">
                <span className="check-disc" aria-hidden="true">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6.2L4.8 8.5L9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Presisi Terbaik</span>
              </div>

              <div className="available-status">
                <div>Kami siap</div>
                <div className="status-line-2">
                  <span className="pulse-dot" aria-hidden="true" />
                  <span>melayani Anda</span>
                </div>
              </div>
            </div>

            <div className="out-now-block hero-stagger">
              <div className="out-now-header">
                <div className="out-now-titles">
                  <span className="out-now-kicker">Koleksi Baru</span>
                  <span className="out-now-name">Katalog Gaya Pria</span>
                </div>
                <span className="out-now-year">[2026]</span>
              </div>
              <a
                href="#services"
                className="q-card"
                aria-label="Lihat Katalog Gaya & Layanan Standout Barbershop"
              >
                <img
                  className="q-card-img"
                  src={MEDIA_URLS.qIndustrialPhoto}
                  alt="Potret editorial monokrom"
                />
                <span className="q-card-arrow" aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 11L11 3M11 3H4.5M11 3V9.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="q-card-progress-track" aria-hidden="true">
                  <div className="q-card-progress-fill" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
