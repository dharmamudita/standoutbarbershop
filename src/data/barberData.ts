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
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Standout+Barbershop+Ruko+Bukit+Indah+Golf+Jl+Pangeran+Senopati+Blok+F9+Sukarame+Bandar+Lampung",
  openHourWib: 10,
  closeHourWib: 22,
  hoursLabel: "10.00 – 22.00 WIB",
};

export const MEDIA_URLS = {
  heroPortrait:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7dc8b8f3-4ccb-4599-8ce4-7f7c7881bad9.webp",
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
  {
    id: "signature-cut",
    indexLabel: "01 / 05",
    name: "Signature Standout Cut",
    description:
      "Konsultasi bentuk kepala & arah tumbuh rambut, potongan presisi (taper atau skin fade), cuci rambut menyegarkan, kompres handuk hangat, pijat bahu, dan penataan pomade/matte clay.",
    duration: "45 MENIT",
    priceLabel: "RP 65RB",
  },
  {
    id: "executive-ritual",
    indexLabel: "02 / 05",
    name: "Executive Cut & Beard Ritual",
    description:
      "Paket lengkap potong rambut presisi dipadukan dengan perapian jenggot & kumis menggunakan pisau cukur lurus, ritual handuk panas aromaterapi, serta serum penenang kulit.",
    duration: "60 MENIT",
    priceLabel: "RP 90RB",
  },
  {
    id: "razor-sculpt",
    indexLabel: "03 / 05",
    name: "Razor Line-Up & Cukur Jenggot",
    description:
      "Pembentukan garis rahang dan jenggot yang tajam, perapian kumis detail, kompres handuk hangat, dan aplikasi beard oil alami.",
    duration: "25 MENIT",
    priceLabel: "RP 35RB",
  },
  {
    id: "perm-color",
    indexLabel: "04 / 05",
    name: "Texture Perm & Pewarnaan Rambut",
    description:
      "Korean wave perm, down perm untuk merapikan rambut samping yang mengembang, atau pewarnaan monokrom ash/hitam natural sesuai karakter wajah.",
    duration: "90 MENIT",
    priceLabel: "RP 220RB+",
  },
  {
    id: "scalp-detox",
    indexLabel: "05 / 05",
    name: "Scalp Detox & Creambath Spa",
    description:
      "Eksfoliasi kulit kepala mendalam, terapi creambath dingin, pijat akupresur kepala & leher, serta hair tonic penguat akar rambut.",
    duration: "40 MENIT",
    priceLabel: "RP 55RB",
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
