import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STANDOUT BARBERSHOP — Studio Cukur & Perawatan Pria · Bandar Lampung",
  description:
    "Standout Barbershop — Studio cukur rambut pria presisi & perawatan modern di Ruko Bukit Indah Golf, Sukarame, Bandar Lampung. Buka setiap hari 10.00 – 22.00 WIB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

