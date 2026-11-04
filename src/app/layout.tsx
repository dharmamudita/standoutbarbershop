import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1A3AA3",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://standoutbarbershop.vercel.app"),
  title: "STANDOUT BARBERSHOP — Studio Cukur & Perawatan Pria · Bandar Lampung",
  description:
    "Standout Barbershop — Studio cukur rambut pria presisi & perawatan modern di Ruko Bukit Indah Golf, Sukarame, Bandar Lampung. Buka setiap hari 10.00 – 22.00 WIB.",
  keywords: [
    "Standout Barbershop",
    "Barbershop Bandar Lampung",
    "Barber Sukarame",
    "Cukur Rambut Pria Lampung",
    "Potong Rambut Sukarame",
    "Hairstylist Pria Lampung",
    "Standout Barber",
  ],
  authors: [{ name: "Standout Barbershop" }],
  creator: "Standout Barbershop",
  publisher: "Standout Barbershop",
  applicationName: "Standout Barbershop",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "STANDOUT BARBERSHOP — Studio Cukur & Perawatan Pria · Bandar Lampung",
    description:
      "Studio cukur rambut pria presisi & perawatan modern di Ruko Bukit Indah Golf, Sukarame, Bandar Lampung.",
    url: "https://standoutbarbershop.vercel.app",
    siteName: "Standout Barbershop",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Standout Barbershop — Studio Cukur Presisi Bandar Lampung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STANDOUT BARBERSHOP — Studio Cukur & Perawatan Pria · Bandar Lampung",
    description:
      "Studio cukur rambut pria presisi & perawatan modern di Sukarame, Bandar Lampung.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: "Standout Barbershop",
    alternateName: "Standout Barber Bandar Lampung",
    image: "https://standoutbarbershop.vercel.app/icon-512.png",
    logo: "https://standoutbarbershop.vercel.app/icon.svg",
    url: "https://standoutbarbershop.vercel.app",
    telephone: "+6282246464426",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Ruko Bukit Indah Golf, Jl. Pangeran Senopati Blok F9, Sukarame",
      addressLocality: "Bandar Lampung",
      addressRegion: "Lampung",
      postalCode: "35131",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -5.385,
      longitude: 105.305,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
    sameAs: ["https://instagram.com/standout_barber"],
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1A3AA3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
