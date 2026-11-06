import {
  NavLinkItem,
  PartnerMarkItem,
  ServiceItem,
  StudioHourItem,
  StudioMetadata,
} from "@/types/barber";

export const STUDIO_META: StudioMetadata = {
  brandName: "STANDOUT BARBERSHOP",
  shortName: "STANDOUT",
  tagline: "Ready to Serve You with Our Best Service",
  establishedYear: "2019",
  cityCode: "BDL",
  cityFull: "Bandar Lampung",
  district: "Sukarame",
  address:
    "Ruko Bukit Indah Golf, Jl. Pangeran Senopati Blok F9, Harapan Jaya, Kec. Sukarame, Kota Bandar Lampung, Lampung",
  whatsappNumber: "6282246464426",
  whatsappDisplay: "0822-4646-4426",
  instagramHandle: "@standout_barber",
  instagramUrl: "https://www.instagram.com/standout_barber/",
  tiktokHandle: "@standout_barber",
  tiktokUrl: "https://www.tiktok.com/@standout_barber",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Standout+Barbershop+Ruko+Bukit+Indah+Golf+Jl+Pangeran+Senopati+Blok+F9+Sukarame+Bandar+Lampung",
  openHourWib: 10,
  closeHourWib: 22,
  hoursLabel: "10.00 – 22.00 WIB",
};

export const MEDIA_URLS = {
  heroPortrait:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7dc8b8f3-4ccb-4599-8ce4-7f7c7881bad9.webp",
  heroPortraitCutout: "/hero-portrait-cutout.webp",
  capCardPhoto:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a9d3641f-d629-46e5-8d2d-5f75386b803d.webp",
  qIndustrialPhoto:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9340eb08-877d-4d08-91fb-b70754541d98.webp",
  sideProfilePhoto:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/addecc7d-666f-4342-8290-ed7f7cbbffd6.webp",
  avatars: [
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/300f41b1-3de5-4153-afde-06e15e753ad0.webp",
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/bfff4cdf-4fda-4491-ada6-62f3b6236492.webp",
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/943b121e-fe72-479f-93ae-aa8cd1650f69.webp",
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c673306f-2b81-4c3d-a7d2-3df61d481abb.webp",
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2e4fcf11-d0fc-4f31-8f7a-dfe751777141.webp",
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/ab458fcd-4c2c-426f-8213-21cc3c7274be.webp",
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c1fcd833-5ac9-41e9-9352-fead7e64fa24.webp",
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4c2b3307-e555-4633-949c-efd3b7e09d82.webp",
  ],
} as const;

export const NAV_LINKS: NavLinkItem[] = [
  { id: "home", label: "Beranda", href: "#home" },
  { id: "studio", label: "Filosofi", href: "#manifesto" },
  { id: "works", label: "Layanan", href: "#services" },
  { id: "blog", label: "Lokasi", href: "#location" },
];

export const PARTNER_MARKS: PartnerMarkItem[] = [
  { name: "Taper", glyph: "circle" },
  { name: "Fade", glyph: "triangle" },
  { name: "Kontur", glyph: "square" },
  { name: "Klasik", glyph: "cross" },
  { name: "Tekstur", glyph: "diagonal" },
  { name: "Ritual", glyph: "diamond" },
];

export const JACKET_WORDMARKS: string[] = ["Presisi", "Karakter", "Klasik"];

export const MANIFESTO_STATEMENT =
  "Kami percaya penampilan terbaik lahir dari struktur yang presisi, bukan sekadar mengikuti tren sesaat. Setiap potongan dirancang untuk menegaskan karakter, meningkatkan kepercayaan diri, dan menciptakan kesan berkelas setiap hari.";

export const GROOMING_SERVICES: ServiceItem[] = [
  // 1. SPECIAL HAIRCUT
  {
    id: "haircut-wiji",
    category: "haircut",
    indexLabel: "01 / 09",
    name: "Haircut by Wiji Santoso",
    subtitle: "Haircut & Styling",
    description:
      "Potongan rambut eksklusif langsung ditangani oleh Founder / Master Barber Wiji Santoso. Termasuk analisis struktur kepala, potongan presisi, dan styling profesional.",
    duration: "40 MENIT",
    priceLabel: "45K",
    badge: "Master Barber",
    isPopular: true,
  },
  {
    id: "standout-haircut",
    category: "haircut",
    indexLabel: "02 / 09",
    name: "Standout Haircut",
    subtitle: "Haircut & Styling",
    description:
      "Potongan rambut presisi signature Standout Barbershop oleh barber berpengalaman. Konsultasi model, fade/taper bertekstur rapi, dan styling pomade/matte clay.",
    duration: "35 MENIT",
    priceLabel: "40K",
    isPopular: true,
  },
  {
    id: "additional-wash-towel",
    category: "haircut",
    indexLabel: "03 / 09",
    name: "Additional (Hairwash & Hot Towel)",
    subtitle: "Hairwash & Hot Towel",
    description:
      "Layanan tambahan cuci rambut menyegarkan (hairwash) dipadukan dengan kompres handuk hangat (hot towel) untuk kesegaran dan kebersihan maksimal pasca potong.",
    duration: "10 MENIT",
    priceLabel: "5K",
  },
  {
    id: "platinum-haircut",
    category: "haircut",
    indexLabel: "04 / 09",
    name: "Platinum Haircut",
    subtitle: "Haircut, Wash, Vitamin, Mask, Massage & Towel",
    description:
      "Paket perawatan lengkap termewah: Potongan presisi, cuci rambut (hairwash), vitamin rambut, masker rambut (hair mask), pijat rileks bahu & leher (short massage), dan kompres handuk hangat (hot towel).",
    duration: "55 MENIT",
    priceLabel: "85K",
    badge: "Paket Komplit",
    isPopular: true,
  },

  // 2. SPECIAL TREATMENTS (*All treatment free haircut)
  {
    id: "keratin-treatment",
    category: "treatment",
    indexLabel: "05 / 09",
    name: "Keratin Treatment",
    subtitle: "Termasuk Gratis Potong Rambut (Free Haircut)",
    description:
      "Perawatan keratin mendalam untuk merevitalisasi helaian rambut yang kering, megar, dan sulit diatur agar kembali halus, sehat, dan bervolume natural.",
    duration: "90 MENIT",
    priceLabel: "250K - 350K",
    badge: "Free Haircut",
  },
  {
    id: "platinum-smooth-keratin",
    category: "treatment",
    indexLabel: "06 / 09",
    name: "Platinum Smooth Keratin",
    subtitle: "Formula Keratin Premium · Free Haircut",
    description:
      "Formula keratin platinum tingkat lanjut untuk hasil pelurusan rambut ekstra halus, berkilau sehat alami, tahan lama, dan bebas kusut tanpa membuat rambut lepek.",
    duration: "120 MENIT",
    priceLabel: "350K - 400K",
    badge: "Free Haircut",
    isPopular: true,
  },
  {
    id: "perming-korean-perm",
    category: "treatment",
    indexLabel: "07 / 09",
    name: "Perming / Korean Perm",
    subtitle: "Korean Wave & Texture Perm · Free Haircut",
    description:
      "Pengeritingan gaya modern Korea (Korean Wave) atau texture perm pria untuk menambah volume rambut, gelombang natural dinamis, dan tampilan trendy.",
    duration: "90 MENIT",
    priceLabel: "250K - 350K",
    badge: "Trending · Free Haircut",
  },
  {
    id: "hair-color-fashion",
    category: "treatment",
    indexLabel: "08 / 09",
    name: "Hair Color Fashion",
    subtitle: "Bleaching & Fashion Shades · Free Haircut",
    description:
      "Pewarnaan rambut fashion berkelas dengan teknik bleaching profesional dan pilihan warna trendi (Ash Grey, Silver, Blonde, Pastel Highlight) sesuai karakter wajah.",
    duration: "120 MENIT",
    priceLabel: "250K - 600K",
    badge: "Free Haircut",
  },
  {
    id: "hair-color-basic",
    category: "treatment",
    indexLabel: "09 / 09",
    name: "Hair Color Basic",
    subtitle: "Hitam Natural / Dark Brown · Free Haircut",
    description:
      "Pewarnaan warna dasar alami untuk menutupi uban secara menyeluruh atau mengembalikan warna hitam/cokelat gelap rambut yang segar, bersih, dan rapi.",
    duration: "45 MENIT",
    priceLabel: "80K",
    badge: "Free Haircut",
  },
];

export const STUDIO_HOURS: StudioHourItem[] = [
  { days: "Senin – Kamis", hours: "10.00 – 22.00 WIB" },
  { days: "Jumat", hours: "10.00 – 22.00 WIB" },
  { days: "Sabtu – Minggu", hours: "10.00 – 22.00 WIB", isHighlight: true },
];

export const BOOKING_TIME_SLOTS: string[] = [
  "10:00 WIB",
  "11:30 WIB",
  "13:00 WIB",
  "15:00 WIB",
  "16:30 WIB",
  "18:30 WIB",
  "20:00 WIB",
  "21:00 WIB",
];
