"use client";

import React, { useEffect, useState } from "react";
import {
  BOOKING_TIME_SLOTS,
  GROOMING_SERVICES,
  STUDIO_META,
} from "@/data/barberData";
import { buildWhatsAppBookingUrl } from "@/utils/motion";
import StandoutLogo from "@/components/StandoutLogo";

interface BookingModalProps {
  isOpen: boolean;
  initialService: string;
  onClose: () => void;
}

export default function BookingModal({
  isOpen,
  initialService,
  onClose,
}: BookingModalProps) {
  const [clientName, setClientName] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>(
    initialService || GROOMING_SERVICES[0].name
  );
  const [preferredDay, setPreferredDay] = useState<string>("Hari Ini");
  const [preferredTime, setPreferredTime] = useState<string>(
    BOOKING_TIME_SLOTS[3]
  );

  useEffect(() => {
    if (initialService) {
      setServiceName(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!clientName.trim()) return;

    const waUrl = buildWhatsAppBookingUrl({
      clientName: clientName.trim(),
      serviceName,
      preferredDay,
      preferredTime,
    });

    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="booking-modal">
        <div className="modal-header">
          <div className="flex items-center gap-3.5">
            <StandoutLogo variant="emblem" size={44} />
            <div>
              <h3 className="modal-title" id="modalTitle">
                Reservasi Kursi Anda
              </h3>
              <p className="modal-subtitle">
                Standout Barbershop · {STUDIO_META.district},{" "}
                {STUDIO_META.cityFull}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Tutup jendela reservasi"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="clientName">
              Nama Lengkap
            </label>
            <input
              id="clientName"
              type="text"
              className="form-input"
              placeholder="Contoh: Reza Pratama"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="serviceSelect">
              Pilih Layanan
            </label>
            <select
              id="serviceSelect"
              className="form-select"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            >
              <optgroup label="SPECIAL HAIRCUT">
                {GROOMING_SERVICES.filter((s) => s.category === "haircut").map(
                  (svc) => (
                    <option key={svc.id} value={svc.name}>
                      {svc.name} ({svc.priceLabel})
                    </option>
                  )
                )}
              </optgroup>
              <optgroup label="SPECIAL TREATMENTS (*All Treatment Free Haircut)">
                {GROOMING_SERVICES.filter((s) => s.category === "treatment").map(
                  (svc) => (
                    <option key={svc.id} value={svc.name}>
                      {svc.name} ({svc.priceLabel}) — Free Haircut
                    </option>
                  )
                )}
              </optgroup>
            </select>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="bookingDate">
                Pilih Hari
              </label>
              <select
                id="bookingDate"
                className="form-select"
                value={preferredDay}
                onChange={(e) => setPreferredDay(e.target.value)}
              >
                <option value="Hari Ini">Hari Ini</option>
                <option value="Besok">Besok</option>
                <option value="Akhir Pekan Ini">Akhir Pekan Ini</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bookingTime">
                Pilih Jam (WIB)
              </label>
              <select
                id="bookingTime"
                className="form-select"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
              >
                {BOOKING_TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="modal-submit-btn">
            <span>Konfirmasi via WhatsApp ({STUDIO_META.whatsappDisplay})</span>
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </div>
  );
}
