import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://thefableslab.com";
const SITE_NAME = "The Fables Lab";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Design & Physical Engineering Studio`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "The Fables Lab is an independent digital atelier building products, AI-powered solutions, and digital experiences with precision and craft.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Design & Physical Engineering Studio`,
    description:
      "Big ideas deserve better execution. We design, engineer, and launch digital products, AI-powered solutions, and digital experiences built around real business needs.",
    images: [
      { url: "/app-mockup.png", width: 1200, height: 630, alt: "The Fables Lab" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Design & Physical Engineering Studio`,
    description:
      "Big ideas deserve better execution. We design, engineer, and launch digital products, AI-powered solutions, and digital experiences built around real business needs.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-background font-sans text-on-surface antialiased">
        <Navbar />
        <main className="min-h-screen flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
