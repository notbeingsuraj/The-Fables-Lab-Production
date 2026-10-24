import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://thefableslab.com";
const SITE_NAME = "The Fables Lab";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Where Ancient Stories Meet Future Tech`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "The Fables Lab is a premium digital solutions studio combining software engineering, AI, design, marketing, community building, and content management to build products that move businesses forward.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Where Ancient Stories Meet Future Tech`,
    description:
      "Strategy, design, engineering, and AI brought together to build products that move businesses forward.",
    images: [
      { url: "/app-mockup.png", width: 1200, height: 630, alt: "The Fables Lab" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Digital Solutions Studio`,
    description:
      "Strategy, design, engineering, and AI brought together to build products that move businesses forward.",
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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background font-sans text-on-surface antialiased">
        <Navbar />
        <main className="min-h-screen flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
