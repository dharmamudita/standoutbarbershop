"use client";

import React from "react";
import { STUDIO_HOURS, STUDIO_META } from "@/data/barberData";
import { useWibStatus } from "@/utils/motion";

interface StudioFooterSectionProps {
  onOpenBooking: () => void;
}

export default function StudioFooterSection({
  onOpenBooking,
}: StudioFooterSectionProps) {
  const wibStatus = useWibStatus();

  return (
    <footer
      className="studio-footer-section"
      id="location"
      aria-label="Lokasi Studio dan Kontak"
    >
      <div className="studio-grid">
        {/* Left Paper Card: Address & Direct Booking */}
        <div className="studio-info-panel">
          <div>
            <div className="studio-badge-row">
              <span className="studio-pill">
                <span
                  className="live-dot"
                  style={{
                    backgroundColor: wibStatus.isOpen ? "#4ade80" : "#f59e0b",
                  }}
                />
                <span>{wibStatus.statusLabel}</span>
              </span>
              <a
                href={STUDIO_META.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-ig-handle"
              >
                {STUDIO_META.instagramHandle} ↗
              </a>
            </div>

            <h2 className="studio-headline">
              Kunjungi Studio Utama {STUDIO_META.district}
            </h2>
            <p className="studio-address">{STUDIO_META.address}</p>
          </div>

          <div className="studio-actions-row">
            <button
              type="button"
              className="btn-primary-dark"
              onClick={onOpenBooking}
            >
              <span>Reservasi via WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </button>
            <a
              href={STUDIO_META.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
            >
              <span>Buka di Google Maps</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Right Dark Card: Operational Hours & Direct Line */}
        <div className="studio-hours-panel">
          <div>
            <div className="hours-title">Jam Operasional &amp; Layanan</div>
            <div className="hours-table">
              {STUDIO_HOURS.map((row) => (
                <div key={row.days} className="hours-row">
                  <span className="hours-day">{row.days}</span>
                  <span className="hours-time">{row.hours}</span>
                </div>
              ))}
              <div className="hours-row">
                <span className="hours-day">WhatsApp Resmi</span>
                <a
                  href={`https://wa.me/${STUDIO_META.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hours-time"
                >
                  {STUDIO_META.whatsappDisplay} ↗
                </a>
              </div>
            </div>
          </div>

          <p className="hours-concierge-note">
            Pelanggan langsung (*walk-in*) selalu kami sambut. Untuk jam ramai
            akhir pekan (16.00 – 21.00 WIB), kami menyarankan reservasi kursi
            lebih awal.
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span className="footer-brand-word">{STUDIO_META.brandName}</span>
        <span>
          Ruko Bukit Indah Golf Blok F9 · {STUDIO_META.cityFull}
        </span>
        <span>© 2026 Standout Barber. Seluruh Hak Cipta Dilindungi.</span>
      </div>
    </footer>
  );
}
