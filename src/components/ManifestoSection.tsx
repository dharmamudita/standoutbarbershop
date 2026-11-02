"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { MANIFESTO_STATEMENT, STUDIO_META } from "@/data/barberData";

interface ManifestoSectionProps {
  isRecorderMode: boolean;
  prefersReducedMotion: boolean;
}

export default function ManifestoSection({
  isRecorderMode,
  prefersReducedMotion,
}: ManifestoSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words = useMemo<string[]>(
    () => MANIFESTO_STATEMENT.trim().split(/\s+/),
    []
  );

  useEffect(() => {
    // Interpolates smoothly from soft pastel blue-grey #B8C4E6 (184, 196, 230)
    // to Standout Royal Blue #1A3AA3 (26, 58, 163) on a dominant white canvas
    const applyWordFill = (progress: number): void => {
      const total = words.length;
      const softEdge = 3;
      const scaled = progress * (total + softEdge);

      for (let i = 0; i < total; i++) {
        const span = wordRefs.current[i];
        if (!span) continue;
        const wordFill = Math.max(0, Math.min(1, (scaled - i) / softEdge));
        const r = Math.round(184 + wordFill * (26 - 184));
        const g = Math.round(196 + wordFill * (58 - 196));
        const b = Math.round(230 + wordFill * (163 - 230));
        span.style.color = `rgb(${r}, ${g}, ${b})`;
      }
    };

    if (prefersReducedMotion) {
      applyWordFill(1);
      return;
    }

    let rafId = 0;

    if (isRecorderMode) {
      const start = performance.now();
      const recLoop = (now: number): void => {
        const sec = (now - start) / 1000;
        if (sec >= 1.3) {
          const p = Math.min(1, (sec - 1.3) / (4.2 - 1.3));
          applyWordFill(p);
        }
        if (sec < 6) rafId = requestAnimationFrame(recLoop);
      };
      rafId = requestAnimationFrame(recLoop);
      return () => cancelAnimationFrame(rafId);
    }

    let smoothedProgress = 0;
    const onScrollLoop = (): void => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const startPoint = vh * 0.82;
        const endPoint = vh * 0.2;
        const targetProgress = Math.max(
          0,
          Math.min(1, (startPoint - rect.top) / (startPoint - endPoint))
        );
        smoothedProgress += (targetProgress - smoothedProgress) * 0.14;
        applyWordFill(smoothedProgress);
      }
      rafId = requestAnimationFrame(onScrollLoop);
    };

    rafId = requestAnimationFrame(onScrollLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isRecorderMode, prefersReducedMotion, words.length]);

  return (
    <>
      {/* 111u Transition Bar */}
      <div className="meta-bar" id="manifesto">
        <div className="meta-bar-left">
          BERDIRI{" "}
          <span className="muted-year">
            {STUDIO_META.establishedYear} · {STUDIO_META.cityCode}
          </span>
        </div>
        <a href="#statementSection" className="meta-bar-center">
          <span>GULIR KE BAWAH</span>
          <span className="scroll-circle" aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="none">
              <path
                d="M6 2.5V9.5M6 9.5L3 6.5M6 9.5L9 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
        <div className="meta-bar-right">DETAIL &amp; PRESISI</div>
      </div>

      {/* Scroll-Filling Statement Section */}
      <section
        ref={sectionRef}
        className="statement-section"
        id="statementSection"
        aria-label="Filosofi Studio"
      >
        <p className="statement-text">
          {words.map((word, idx) => (
            <React.Fragment key={`${word}-${idx}`}>
              <span
                ref={(el) => {
                  wordRefs.current[idx] = el;
                }}
                className="word"
              >
                {word}
              </span>{" "}
            </React.Fragment>
          ))}
        </p>
        <p className="statement-subline">
          Standar baru tata rambut pria, dari konsultasi hingga hasil akhir.
          <br />
          <em>Dirancang bagi pria yang ingin tampil menonjol.</em>
        </p>
      </section>
    </>
  );
}
