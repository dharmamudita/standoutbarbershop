"use client";

import React, { useEffect, useRef, useState } from "react";

interface CustomCursorProps {
  prefersReducedMotion: boolean;
}

export default function CustomCursor({
  prefersReducedMotion,
}: CustomCursorProps) {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "button, a, .service-row, .q-card, .split-compare-canvas, .hallway-tab-card"
      ) as HTMLElement | null;

      if (interactive) {
        setIsHovered(true);
        if (interactive.classList.contains("split-compare-canvas")) {
          setCursorLabel("GESER");
        } else if (
          interactive.classList.contains("service-row") ||
          interactive.classList.contains("q-card")
        ) {
          setCursorLabel("LIHAT");
        } else {
          setCursorLabel("");
        }
      } else {
        setIsHovered(false);
        setCursorLabel("");
      }
    };

    const tick = (): void => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX.toFixed(
          1
        )}px, ${ringY.toFixed(1)}px, 0)`;
      }

      // Top page scroll progress bar
      if (progressRef.current) {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
        progressRef.current.style.transform = `scaleX(${Math.max(
          0,
          Math.min(1, pct)
        ).toFixed(4)})`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <div className="top-scroll-progress" aria-hidden="true">
        <div ref={progressRef} className="top-scroll-progress-bar" />
      </div>
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isHovered ? "is-hovered" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={cursorRingRef}
        className={`custom-cursor-ring ${isHovered ? "is-hovered" : ""} ${
          cursorLabel ? "has-label" : ""
        }`}
        aria-hidden="true"
      >
        {cursorLabel && <span className="cursor-ring-text">{cursorLabel}</span>}
      </div>
    </>
  );
}

