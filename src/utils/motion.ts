"use client";

import { useEffect, useState } from "react";
import { BookingFormData } from "@/types/barber";
import { STUDIO_META } from "@/data/barberData";

/**
 * Animates a numeric counter from 0 to target using an easeOutQuart curve.
 */
export function useCountUp(
  target: number,
  shouldStart: boolean,
  durationMs: number = 1400,
  reducedMotion: boolean = false
): number {
  const [value, setValue] = useState<number>(reducedMotion ? target : 0);

  useEffect(() => {
    if (!shouldStart) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, shouldStart, durationMs, reducedMotion]);

  return value;
}

export interface WibStatusInfo {
  weekday: string;
  isOpen: boolean;
  statusLabel: string;
}

/**
 * Computes current weekday and open/closed state in Bandar Lampung (Asia/Jakarta WIB).
 */
export function useWibStatus(): WibStatusInfo {
  const [status, setStatus] = useState<WibStatusInfo>({
    weekday: "Setiap Hari",
    isOpen: true,
    statusLabel: `Buka Setiap Hari · ${STUDIO_META.hoursLabel}`,
  });

  useEffect(() => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      const weekday =
        parts.find((p) => p.type === "weekday")?.value ?? "Setiap Hari";
      const hourStr = parts.find((p) => p.type === "hour")?.value ?? "12";
      const hour = parseInt(hourStr, 10);

      const isOpen =
        hour >= STUDIO_META.openHourWib && hour < STUDIO_META.closeHourWib;

      setStatus({
        weekday,
        isOpen,
        statusLabel: isOpen
          ? `Buka Sekarang · ${STUDIO_META.hoursLabel}`
          : `Buka Pukul 10.00 WIB · Setiap Hari`,
      });
    } catch {
      // Fallback if Intl timeZone is unavailable
    }
  }, []);

  return status;
}

/**
 * Formats a direct WhatsApp reservation link for Standout Barbershop Bandar Lampung.
 */
export function buildWhatsAppBookingUrl(data: BookingFormData): string {
  const message = [
    `Halo *${STUDIO_META.brandName}* 👋`,
    `Saya ingin melakukan reservasi kursi di cabang utama Sukarame:`,
    ``,
    `• *Nama:* ${data.clientName}`,
    `• *Layanan:* ${data.serviceName}`,
    `• *Hari:* ${data.preferredDay}`,
    `• *Jam:* ${data.preferredTime}`,
    ``,
    `Mohon konfirmasi ketersediaan slotnya. Terima kasih!`,
  ].join("\n");

  return `https://wa.me/${STUDIO_META.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
