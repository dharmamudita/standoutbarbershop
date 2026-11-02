"use client";

import React, { useEffect, useRef } from "react";

interface KineticMarqueeProps {
  prefersReducedMotion: boolean;
}

const MARQUEE_ITEMS: string[] = [
  "STANDOUT BARBERSHOP",
  "ARSITEKTUR RAMBUT PRIA",
  "SUKARAME · BANDAR LAMPUNG",
  "GRADASI FADE PRESISI",
  "BUKA SETIAP HARI 10.00 – 22.00 WIB",
  "KONSULTASI STRUKTUR KEPALA",
];

export default function KineticMarquee({
  prefersReducedMotion,
}: KineticMarqueeProps) {
  const track1Ref = useRef<HTMLDivElement | null>(null);
  const track2Ref = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;
    let pos1 = 0;
    let pos2 = -50;
    let lastScrollY = window.scrollY;
    let velocity = 0;
    let smoothedSkew = 0;

    const animateMarquee = (): void => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      velocity += (delta - velocity) * 0.15;
      const speedBoost = Math.min(Math.abs(velocity) * 0.04, 0.35);
      const baseSpeed = 0.035 + speedBoost;

      pos1 -= baseSpeed;
      pos2 += baseSpeed * 0.85;

      if (pos1 <= -50) pos1 = 0;
      if (pos2 >= 0) pos2 = -50;

      const targetSkew = Math.max(-6, Math.min(6, velocity * 0.18));
      smoothedSkew += (targetSkew - smoothedSkew) * 0.12;

      if (track1Ref.current) {
        track1Ref.current.style.transform = `translate3d(${pos1.toFixed(
          3
        )}%, 0, 0) skewX(${smoothedSkew.toFixed(2)}deg)`;
      }
      if (track2Ref.current) {
        track2Ref.current.style.transform = `translate3d(${pos2.toFixed(
          3
        )}%, 0, 0) skewX(${(-smoothedSkew).toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(animateMarquee);
    };

    rafId = requestAnimationFrame(animateMarquee);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      ref={wrapRef}
      className="kinetic-marquee-wrap"
      aria-hidden="true"
    >
      {/* Top Band: Dark on Paper-Contrast */}
      <div className="kinetic-band band-primary">
        <div ref={track1Ref} className="kinetic-track">
          {repeatedItems.map((text, idx) => (
            <span key={`b1-${idx}`} className="kinetic-item">
              <span>{text}</span>
              <span className="kinetic-diamond">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Counter-Rotating Band: Outlined / Muted Editorial */}
      <div className="kinetic-band band-secondary">
        <div ref={track2Ref} className="kinetic-track">
          {repeatedItems.map((text, idx) => (
            <span key={`b2-${idx}`} className="kinetic-item">
              <span>{text}</span>
              <span className="kinetic-dot">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

