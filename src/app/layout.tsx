import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "The Fables Lab — Software Designed for Operational Clarity",
  description:
    "We build systems that reduce payment delays, structure workflows, and automate operational coordination for modern businesses.",
  keywords: [
    "operational software",
    "workflow systems",
    "distributor operations",
    "business software",
    "operational clarity",
  ],
  openGraph: {
    title: "The Fables Lab — Software Designed for Operational Clarity",
    description:
      "Systems that reduce payment delays, structure workflows, and automate operational coordination.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased bg-void text-text-primary`}
      >
        <Navbar />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
