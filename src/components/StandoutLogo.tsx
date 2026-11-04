"use client";

import React from "react";

interface StandoutLogoProps {
  variant?: "emblem" | "full" | "horizontal";
  theme?: "color" | "blue" | "white";
  size?: number;
  className?: string;
  withLink?: boolean;
}

export default function StandoutLogo({
  variant = "horizontal",
  theme = "color",
  size = 42,
  className = "",
  withLink = false,
}: StandoutLogoProps) {
  const isWhite = theme === "white";

  let src = "/logo-horizontal.png";
  let alt = "Standout Barbershop";
  let widthRatio = 1606 / 500; // ~3.21

  if (variant === "emblem") {
    src = isWhite ? "/logo-emblem-white.png" : "/logo-emblem.png";
    alt = "Logo Emblem Standout Barbershop";
    widthRatio = 783 / 968; // ~0.81
  } else if (variant === "full") {
    src = isWhite ? "/logo-full-white.png" : "/logo-full.png";
    alt = "Logo Resmi Standout Barbershop";
    widthRatio = 1507 / 1569; // ~0.96
  } else if (variant === "horizontal") {
    src = isWhite ? "/logo-horizontal-white.png" : "/logo-horizontal.png";
    alt = "Standout Barbershop Bandar Lampung";
    widthRatio = 1606 / 500; // ~3.21
  }

  const height = size;
  const width = Math.round(height * widthRatio);

  const content = (
    <span
      className={`standout-logo-wrap inline-flex items-center select-none ${className}`}
      style={{ height: `${height}px` }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          height: `${height}px`,
          width: "auto",
          maxWidth: "100%",
          objectFit: "contain",
        }}
        className="standout-brand-img transition-transform duration-300 group-hover:scale-105"
        fetchPriority="high"
      />
    </span>
  );

  if (withLink) {
    return (
      <a
        href="#home"
        className="standout-logo-link group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3AA3] rounded-lg"
        aria-label="Standout Barbershop - Beranda"
      >
        {content}
      </a>
    );
  }

  return content;
}
