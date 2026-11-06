"use client";

import React, { useEffect, useRef, useState } from "react";
import { MEDIA_URLS } from "@/data/barberData";
import { useCountUp } from "@/utils/motion";

interface TrustPanelSectionProps {
  isRecorderMode: boolean;
  prefersReducedMotion: boolean;
}

export default function TrustPanelSection({
  isRecorderMode,
  prefersReducedMotion,
}: TrustPanelSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tile1Ref = useRef<HTMLDivElement | null>(null);
  const tile2Ref = useRef<HTMLDivElement | null>(null);
  const awardsCardRef = useRef<HTMLElement | null>(null);

  const [hasEntered, setHasEntered] = useState<boolean>(prefersReducedMotion);
  const [visibleAvatars, setVisibleAvatars] = useState<boolean[]>(
    MEDIA_URLS.avatars.map(() => prefersReducedMotion)
  );

  const count56 = useCountUp(56, hasEntered, 1500, prefersReducedMotion);
  const count10 = useCountUp(10, hasEntered, 1500, prefersReducedMotion);

  useEffect(() => {
    if (!hasEntered) return;
    if (prefersReducedMotion) {
      setVisibleAvatars(MEDIA_URLS.avatars.map(() => true));
      return;
    }

    const timers: number[] = [];
    MEDIA_URLS.avatars.forEach((_, idx) => {
      const id = window.setTimeout(() => {
        setVisibleAvatars((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      }, idx * 75);
      timers.push(id);
    });

    return () => timers.forEach((id) => clearTimeout(id));
  }, [hasEntered, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true);
      return;
    }

    let rafId = 0;

    if (isRecorderMode) {
      const start = performance.now();
      const recLoop = (now: number): void => {
        const sec = (now - start) / 1000;
        if (sec >= 3.5) {
          setHasEntered(true);
        }
        if (sec >= 5.3 && awardsCardRef.current) {
          awardsCardRef.current.style.transform =
            "translateY(calc(-6 * var(--u)))";
        }
        if (sec < 7) rafId = requestAnimationFrame(recLoop);
      };
      rafId = requestAnimationFrame(recLoop);
      return () => cancelAnimationFrame(rafId);
    }

    const onScrollLoop = (): void => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        if (rect.top < vh * 0.85) {
          setHasEntered(true);
        }

        if (rect.top < vh && rect.bottom > 0) {
          const offset = (vh * 0.5 - rect.top) * 0.035;
          if (tile1Ref.current) {
            tile1Ref.current.style.transform = `translate3d(0, ${(-offset).toFixed(
              1
            )}px, 0)`;
          }
          if (tile2Ref.current) {
            tile2Ref.current.style.transform = `translate3d(0, ${(
              offset * 0.8
            ).toFixed(1)}px, 0)`;
          }
        }
      }
      rafId = requestAnimationFrame(onScrollLoop);
    };

    rafId = requestAnimationFrame(onScrollLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isRecorderMode, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="trust-section"
      id="trustSection"
      aria-label="Kepercayaan Pelanggan dan Reputasi"
    >
      <div className="trust-panel">
        {/* Left Heading + Overlapping Frosted Glass Icon Tiles + Paragraph */}
        <div className="trust-left">
          <h2 className="trust-heading">
            Dipercaya
            <br />
            Ratusan
            <br />
            Pria Berkelas
            <br />
            di Lampung
          </h2>

          <div
            ref={tile1Ref}
            className="glass-tile glass-tile-asterisk"
            aria-hidden="true"
          >
            <svg viewBox="0 0 36 36" fill="none">
              <path
                d="M18 5V31M5 18H31M8.8 8.8L27.2 27.2M27.2 8.8L8.8 27.2"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            ref={tile2Ref}
            className="glass-tile glass-tile-dots"
            aria-hidden="true"
          >
            <svg viewBox="0 0 36 36" fill="none">
              <circle cx="12" cy="12" r="3.2" fill="currentColor" />
              <circle cx="24" cy="12" r="3.2" fill="currentColor" />
              <circle cx="12" cy="24" r="3.2" fill="currentColor" />
              <circle cx="24" cy="24" r="3.2" fill="currentColor" />
            </svg>
          </div>

          <p className="trust-copy">
            Mulai dari kalangan profesional hingga kreatif di seluruh Bandar
            Lampung, cabang utama Sukarame kami menghadirkan potongan rambut
            berstruktur rapi dan perawatan yang konsisten.
          </p>
        </div>

        {/* Right 3 Stat & Visual Cards */}
        <div className="trust-cards-row">
          {/* Card 1: Avatar Card (#d6d6d6, 290u) */}
          <article className="trust-card avatar-card">
            <div className="avatars-grid">
              {MEDIA_URLS.avatars.map((src, idx) => (
                <div
                  key={src}
                  className={`avatar-item ${
                    visibleAvatars[idx] ? "is-visible" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt={`Potret pelanggan ${idx + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="avatar-card-footer">
              <div className="avatar-stat-num">{count56}K+</div>
              <div className="avatar-stat-label">
                Sesi Cukur &amp; Komunitas Pelanggan
              </div>
            </div>
          </article>

          {/* Card 2: Studio Video 1 Card (Normal clean video) */}
          <article
            ref={awardsCardRef}
            className="trust-card video-card video-card-1"
            aria-label="Cuplikan Video Studio Standout 1"
          >
            <video
              src="/video1.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="trust-video"
            />
          </article>

          {/* Card 3: Studio Video 2 Card (Normal clean video, no badge) */}
          <article
            className="trust-card video-card video-card-2 portrait-card"
            aria-label="Cuplikan Video Studio Standout 2"
          >
            <video
              src="/video2.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="trust-video portrait-video"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
