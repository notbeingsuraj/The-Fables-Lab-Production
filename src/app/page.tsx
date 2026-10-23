import type { Metadata } from "next";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Hero from "@/components/hero/Hero";
import Capabilities from "@/components/capabilities/Capabilities";
import Services from "@/components/services/Services";
import Process from "@/components/process/Process";
import Principles from "@/components/principles/Principles";
import SelectedWork from "@/components/work/SelectedWork";
import ProjectInquiry from "@/components/inquiry/ProjectInquiry";

export const metadata: Metadata = {
  title: "The Fables Lab — Digital Solutions Studio",
  description:
    "The Fables Lab is an independent digital solutions studio. We help businesses build, launch, market, and scale digital products through AI, full-stack engineering, intelligent marketing, and thoughtful design.",
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

/**
 * Home — the Fables Lab public site.
 *
 * Sections are scroll-revealed via GSAP + ScrollTrigger. The 3D hero canvas
 * loads lazily and degrades gracefully when WebGL is unavailable.
 */
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
        <SelectedWork />
      </ScrollReveal>

      <ProjectInquiry />
    </div>
  );
}
