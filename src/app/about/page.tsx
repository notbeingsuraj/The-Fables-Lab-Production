import type { Metadata } from "next";
import About from "@/components/about/About";

export const metadata: Metadata = {
  title: "About — The Fables Lab",
  description:
    "Inside The Fables Lab — an independent AI and full-stack digital solutions studio. Thoughtful ideas, serious engineering, and practical AI for businesses that want to build better digital products.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — The Fables Lab",
    description:
      "Thoughtful ideas. Serious engineering. Where Ancient Stories Meet Future Tech.",
    url: "https://thefableslab.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <About />;
}
