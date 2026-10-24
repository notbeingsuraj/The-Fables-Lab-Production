import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import Services from "@/components/services/Services";
import Process from "@/components/process/Process";
import SelectedWork from "@/components/work/SelectedWork";
import About from "@/components/about/About";
import Pricing from "@/components/pricing/Pricing";
import ProjectInquiry from "@/components/inquiry/ProjectInquiry";

export const metadata: Metadata = {
  title: "The Fables Lab — Premium Digital Studio",
  description:
    "The Fables Lab is a premium digital studio building real products — full-stack apps, AI workflows, design systems, and growth, with precision and craft.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Fables Lab — Premium Digital Studio",
    description:
      "Real engineering work. Strategy, design, engineering, and AI brought together to build products that move businesses forward.",
    type: "website",
    images: [
      { url: "/app-mockup.png", width: 1200, height: 630, alt: "The Fables Lab" },
    ],
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Services />
      <Process />
      <SelectedWork />
      <About />
      <Pricing />
      <ProjectInquiry />
    </div>
  );
}
