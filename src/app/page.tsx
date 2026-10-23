import type { Metadata } from "next";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Hero from "@/components/hero/Hero";
import Capabilities from "@/components/capabilities/Capabilities";
import Services from "@/components/services/Services";
import Process from "@/components/process/Process";
import Principles from "@/components/principles/Principles";
import About from "@/components/about/About";
import Pricing from "@/components/pricing/Pricing";
import SelectedWork from "@/components/work/SelectedWork";
import ProjectInquiry from "@/components/inquiry/ProjectInquiry";

export const metadata: Metadata = {
  title: "The Fables Lab — Digital Solutions Studio",
  description:
    "The Fables Lab is an independent AI and full-stack digital solutions studio. We help businesses design, engineer, launch, and grow digital products.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Fables Lab — Where Intelligence Becomes Digital Reality",
    description:
      "An independent digital solutions studio combining engineering, intelligence, design, distribution, and content into connected digital products.",
    type: "website",
    images: [
      { url: "/app-mockup.png", width: 1200, height: 630, alt: "The Fables Lab" },
    ],
  },
};

export default function Home() {
  return (
    <div className="w-full selection:bg-bronze/20 selection:text-surface">
      <Hero />

      <ScrollReveal>
        <Capabilities />
      </ScrollReveal>

      <ScrollReveal stagger>
        <Services />
      </ScrollReveal>

      <ScrollReveal>
        <Process />
      </ScrollReveal>

      <ScrollReveal stagger>
        <Principles />
      </ScrollReveal>

      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal>
        <Pricing />
      </ScrollReveal>

      <ScrollReveal>
        <SelectedWork />
      </ScrollReveal>

      <ProjectInquiry />
    </div>
  );
}
