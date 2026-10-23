import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SITE_URL = "https://thefableslab.com";
const SITE_NAME = "The Fables Lab";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Digital Solutions Studio`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "The Fables Lab is an independent digital solutions studio. We help businesses build, launch, market, and scale digital products through AI, full-stack engineering, intelligent marketing, and thoughtful design.",
  keywords: [
    "digital solutions studio",
    "AI solutions",
    "full-stack engineering",
    "web application development",
    "UI/UX design",
    "digital marketing",
    "content management systems",
    "community building",
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
    title: `${SITE_NAME} — Where Intelligence Becomes Digital Reality`,
    description:
      "An independent digital solutions studio combining engineering, intelligence, design, distribution, and content into connected digital products.",
    images: [
      {
        url: "/app-mockup.png",
        width: 1200,
        height: 630,
        alt: "The Fables Lab — Digital Solutions Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Digital Solutions Studio`,
    description:
      "AI, full-stack engineering, intelligent marketing, and thoughtful design. We build digital products that last.",
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
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-background font-sans text-on-surface antialiased">
        <Navbar />
        <main className="min-h-screen flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
