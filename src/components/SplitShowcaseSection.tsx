"use client";

import React, { useEffect, useRef, useState } from "react";
import { MEDIA_URLS } from "@/data/barberData";

interface LookbookHallwayItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  angleSpec: string;
  durationSpec: string;
  image: string;
  cropPosition: string;
}

const HALLWAY_STYLES: LookbookHallwayItem[] = [
  {
    id: "taper-contour",
    code: "01",
    title: "Low Taper & Clean Contour",
    subtitle: "Gradasi halus di area pelipis dan tengkuk dengan struktur atas natural.",
    angleSpec: "SUDUT GRADASI 35°",
    durationSpec: "PRESISI 0.5MM",
    image: MEDIA_URLS.heroPortrait,
    cropPosition: "center 22%",
  },
  {
    id: "textured-crop",
    code: "02",
    title: "Textured Crop Architecture",
    subtitle: "Potongan bertekstur tegas di bagian atas dengan garis dahi yang presisi.",
    angleSpec: "TEKSTUR POINT-CUT",
    durationSpec: "MATTE CLAY FINISH",
    image: MEDIA_URLS.capCardPhoto,
    cropPosition: "center 35%",
  },
  {
    id: "industrial-fade",
    code: "03",
    title: "Surgical Skin Fade",
    subtitle: "Transisi zero-fade mulus menyatu sempurna dengan struktur tulang kepala.",
    angleSpec: "ZERO BLEND 0.0MM",
    durationSpec: "FOIL SHAVER",
    image: MEDIA_URLS.qIndustrialPhoto,
    cropPosition: "62% 45%",
  },
  {
    id: "executive-profile",
    code: "04",
    title: "Executive Side Profile",
    subtitle: "Siluet samping klasik modern yang rapi untuk penampilan profesional setiap hari.",
    angleSpec: "SCISSOR OVER COMB",
    durationSpec: "KONTUR RAHANG",
    image: MEDIA_URLS.sideProfilePhoto,
    cropPosition: "center 30%",
  },
];

interface SplitShowcaseSectionProps {
  onOpenBooking: (serviceName?: string) => void;
  prefersReducedMotion: boolean;
}

export default function SplitShowcaseSection({
  onOpenBooking,
  prefersReducedMotion,
}: SplitShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftDoorRef = useRef<HTMLDivElement | null>(null);
  const rightDoorRef = useRef<HTMLDivElement | null>(null);
  const hallwayCoreRef = useRef<HTMLDivElement | null>(null);
  const corridorGridRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [splitSliderPos, setSplitSliderPos] = useState<number>(52);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const compareBoxRef = useRef<HTMLDivElement | null>(null);

  // Scroll-driven Split Curtain & 3D Hallway depth effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;
    let smoothed = 0;

    const updateSplitHallway = (): void => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress 0 when top enters bottom of viewport, 1 when well inside viewport
        const raw = (vh * 0.88 - rect.top) / (vh * 0.72);
        const target = Math.max(0, Math.min(1, raw));
        smoothed += (target - smoothed) * 0.12;

        // Left & Right shutter doors split apart horizontally
        const splitOffset = smoothed * 44; // up to 44% open on each side
        const doorOpacity = 1 - smoothed * 0.65;

        if (leftDoorRef.current) {
          leftDoorRef.current.style.transform = `translate3d(-${splitOffset.toFixed(
            2
          )}%, 0, 0)`;
          leftDoorRef.current.style.opacity = doorOpacity.toFixed(3);
        }
        if (rightDoorRef.current) {
          rightDoorRef.current.style.transform = `translate3d(${splitOffset.toFixed(
            2
          )}%, 0, 0)`;
          rightDoorRef.current.style.opacity = doorOpacity.toFixed(3);
        }

        // Center 3D hallway stage scales forward out of the corridor depth
        if (hallwayCoreRef.current) {
          const scale = 0.82 + smoothed * 0.18;
          const translateY = (1 - smoothed) * 36;
          hallwayCoreRef.current.style.transform = `translate3d(0, ${translateY.toFixed(
            1
          )}px, 0) scale(${scale.toFixed(3)})`;
        }

        if (corridorGridRef.current) {
          const gridScale = 1.18 - smoothed * 0.18;
          corridorGridRef.current.style.transform = `scale(${gridScale.toFixed(
            3
          )})`;
        }
      }
      rafId = requestAnimationFrame(updateSplitHallway);
    };

    rafId = requestAnimationFrame(updateSplitHallway);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  // Interactive Before/After Split-Comparison Slider handler
  const updateSliderFromClientX = (clientX: number): void => {
    const box = compareBoxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitSliderPos(Math.max(8, Math.min(92, pct)));
  };

  useEffect(() => {
    if (!isDraggingSlider) return;
    const onMove = (e: MouseEvent): void => updateSliderFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent): void => {
      if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
    };
    const onUp = (): void => setIsDraggingSlider(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDraggingSlider]);

  const currentStyle = HALLWAY_STYLES[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="split-showcase-section"
      aria-label="Galeri Arsitektur Gaya Split Motion"
    >
      {/* Top Section Header */}
      <div className="split-showcase-header">
        <div className="eyebrow-left">
          <span className="eyebrow-tag">Eksplorasi Visual · Split Motion</span>
          <h2 className="section-display-title">Dimensi Presisi &amp; Kontur</h2>
        </div>
        <p className="eyebrow-right-note">
          Efek bukaan koridor (*split hallway*) interaktif—geser pembatas tengah
          atau pilih indeks gaya untuk melihat detail ketajaman gradasi.
        </p>
      </div>

      {/* 3D Corridor + Split Curtain Stage */}
      <div className="hallway-viewport">
        {/* Perspective architectural hallway lines in background */}
        <div
          ref={corridorGridRef}
          className="hallway-perspective-grid"
          aria-hidden="true"
        >
          <span className="corridor-diag diag-tl" />
          <span className="corridor-diag diag-tr" />
          <span className="corridor-diag diag-bl" />
          <span className="corridor-diag diag-br" />
          <div className="corridor-inner-frame" />
          <div className="corridor-deep-frame" />
        </div>

        {/* Left Architectural Split Shutter Door */}
        <div
          ref={leftDoorRef}
          className="hallway-shutter hallway-shutter-left"
          aria-hidden="true"
        >
          <span className="shutter-coord">SYS // 01-L</span>
          <span className="shutter-giant-word">STAND</span>
          <span className="shutter-sub">ARSITEKTUR POTONGAN</span>
        </div>

        {/* Right Architectural Split Shutter Door */}
        <div
          ref={rightDoorRef}
          className="hallway-shutter hallway-shutter-right"
          aria-hidden="true"
        >
          <span className="shutter-coord">BDL // 02-R</span>
          <span className="shutter-giant-word">OUT.</span>
          <span className="shutter-sub">PRESISI MONOKROM</span>
        </div>

        {/* Center 3D Hallway Core Stage: Interactive Split-Screen Inspector */}
        <div ref={hallwayCoreRef} className="hallway-core-stage">
          <div
            ref={compareBoxRef}
            className="split-compare-canvas"
            onMouseDown={(e) => {
              setIsDraggingSlider(true);
              updateSliderFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDraggingSlider(true);
              if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
            }}
            onMouseMove={(e) => {
              if (!isDraggingSlider && window.innerWidth > 1024) {
                updateSliderFromClientX(e.clientX);
              }
            }}
          >
            {/* Base Layer (Right Side: High-Contrast Final Editorial Finish) */}
            <div className="split-layer split-layer-after">
              <img
                key={`after-${currentStyle.id}`}
                src={currentStyle.image}
                alt={currentStyle.title}
                style={{ objectPosition: currentStyle.cropPosition }}
                className="split-compare-img img-after-grade"
              />
              <div className="split-corner-badge badge-right">
                <span className="badge-kicker">HASIL AKHIR</span>
                <strong>{currentStyle.durationSpec}</strong>
              </div>
            </div>

            {/* Clipped Layer (Left Side: Blueprint Wireframe / Raw Structure) */}
            <div
              className="split-layer split-layer-before"
              style={{
                clipPath: `inset(0 ${100 - splitSliderPos}% 0 0)`,
              }}
            >
              <img
                key={`before-${currentStyle.id}`}
                src={currentStyle.image}
                alt={`${currentStyle.title} struktur`}
                style={{ objectPosition: currentStyle.cropPosition }}
                className="split-compare-img img-before-grade"
              />
              {/* Architectural measurement grid overlay on left split */}
              <div className="blueprint-grid-overlay" aria-hidden="true" />
              <div className="split-corner-badge badge-left">
                <span className="badge-kicker">STRUKTUR AWAL</span>
                <strong>{currentStyle.angleSpec}</strong>
              </div>
            </div>

            {/* Interactive Split Divider Line & Handle */}
            <div
              className="split-divider-line"
              style={{ left: `${splitSliderPos}%` }}
              aria-hidden="true"
            >
              <div className="split-divider-handle">
                <span>↔</span>
              </div>
              <div className="split-coord-readout">
                ‹ GESER {Math.round(splitSliderPos)}% ›
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Style Card (Below Photo for 100% Unobstructed Hairstyle View) */}
      <div className="hallway-style-card">
        <div className="style-card-left">
          <div className="style-card-meta">
            <span className="style-archive-pill">
              ARSIP {currentStyle.code} / 04
            </span>
            <span className="style-spec-tag">
              {currentStyle.angleSpec} · {currentStyle.durationSpec}
            </span>
          </div>
          <h3 className="style-card-title">{currentStyle.title}</h3>
          <p className="style-card-desc">{currentStyle.subtitle}</p>
        </div>
        <button
          type="button"
          className="style-book-cta rolling-btn"
          onClick={() => onOpenBooking(currentStyle.title)}
          aria-label={`Reservasi Potongan ${currentStyle.title}`}
        >
          <span className="rolling-label" data-text="Pesan Gaya Ini">
            <span>Pesan Gaya Ini</span>
          </span>
          <span className="arrow-ic" aria-hidden="true">
            ↗
          </span>
        </button>
      </div>

      {/* 4 Interactive Corridor Style Selector Cards below the Hallway */}
      <div className="hallway-selector-grid" role="tablist">
        {HALLWAY_STYLES.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`hallway-tab-card ${isSelected ? "is-active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="tab-card-top">
                <span className="tab-card-num">{item.code}</span>
                <span className="tab-card-spec">{item.angleSpec}</span>
              </div>
              <div className="tab-card-title">{item.title}</div>
              <div className="tab-card-progress">
                <span className="tab-card-progress-bar" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

