import type { Metadata, Viewport } from "next";
import { Anton, Chivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SynthProvider } from "@/components/providers/SynthProvider";

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  weight: "400",
});

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://thefableslab.com";
const SITE_NAME = "The Fables Lab";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Creative Technology Studio`,
    template: `%s // ${SITE_NAME}`,
  },
  description:
    "A creative technology studio fusing ancient narrative archetypes with real-time WebGL, agentic AI, and tactile hardware. We turn impossible into interactive.",
  keywords: [
    "creative technology studio",
    "WebGL studio",
    "Three.js development",
    "interactive 3D",
    "AI experiences",
    "agentic systems",
    "hardware prototyping",
    "MVP engineering",
    "design systems",
    "New York City studio",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — We Turn Impossible Into Interactive`,
    description:
      "High-voltage digital experiences: WebGL shaders, agentic intelligence, tactical interfaces, and kinetic hardware.",
    images: [
      {
        url: "/app-mockup.png",
        width: 1200,
        height: 630,
        alt: "The Fables Lab — Creative Technology Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Creative Technology Studio`,
    description:
      "WebGL, agentic AI, and tactile hardware. We turn impossible into interactive.",
    creator: "@thefableslab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#121317",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${chivo.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-background font-chivo text-on-surface antialiased">
        <SynthProvider>
          <Navbar />
          <main className="min-h-screen flex flex-col">{children}</main>
          <Footer />
          {/* Global CRT raster overlay — decorative only. */}
          <div
            aria-hidden
            className="scanline-overlay fixed inset-0 z-[60] opacity-[0.15]"
          />
        </SynthProvider>
      </body>
    </html>
  );
}
