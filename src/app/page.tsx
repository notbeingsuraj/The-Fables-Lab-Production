import type { Metadata } from "next";
import NewHero from "@/components/home/NewHero";
import CredibilityStrip from "@/components/home/CredibilityStrip";
import SelectedWorks from "@/components/home/SelectedWorks";
import Philosophy from "@/components/home/Philosophy";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "The Fables Lab — Design & Physical Engineering Studio",
  description:
    "Big ideas deserve better execution. We design, engineer, and launch digital products, AI-powered solutions, and digital experiences built around real business needs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Fables Lab — Design & Physical Engineering Studio",
    description:
      "Big ideas deserve better execution. We design, engineer, and launch digital products, AI-powered solutions, and digital experiences built around real business needs.",
    type: "website",
    images: [
      { url: "/app-mockup.png", width: 1200, height: 630, alt: "The Fables Lab" },
    ],
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <NewHero />
      <CredibilityStrip />
      <SelectedWorks />
      <Philosophy />
      <FinalCTA />
    </div>
  );
}
