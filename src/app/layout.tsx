import type { Metadata } from "next";
import { Sora, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = "https://catering-frontend.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Catering Control Tower · โรงอาหารโรงงาน mock dashboard",
    template: "%s · Catering Control Tower",
  },
  description:
    "ศูนย์ควบคุมการผลิตอาหารโรงงาน mock UI สำหรับบริหารสูตรวัตถุดิบ ต้นทุน จัดซื้อ ใบเสนอราคา และสต็อก พร้อมรองรับการเชื่อมต่อ Odoo.",
  keywords: [
    "catering dashboard",
    "โรงอาหารโรงงาน",
    "mock data",
    "Odoo integration",
    "industrial kitchen monitoring",
  ],
  authors: [{ name: "Catering Ops Demo" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Catering Control Tower · โรงอาหารโรงงาน mock dashboard",
    description:
      "แดชบอร์ด mock สำหรับควบคุมสูตรการผลิต ต้นทุน ใบเสนอราคา และสต็อก พร้อมต่อยอดเชื่อมต่อ Odoo.",
    siteName: "Catering Control Tower",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Catering Control Tower dashboard overview",
      },
    ],
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catering Control Tower",
    description:
      "Mock dashboard สำหรับ contractor โรงอาหาร คุมสูตร ต้นทุน ใบเสนอราคา และสต็อกครบวงจร.",
    images: ["/og-cover.png"],
  },
  themeColor: "#0F4C3A",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${sora.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
