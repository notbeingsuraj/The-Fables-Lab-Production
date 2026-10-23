import type { Metadata } from "next";
import ProjectInquiry from "@/components/inquiry/ProjectInquiry";

export const metadata: Metadata = {
  title: "Contact — The Fables Lab",
  description:
    "Open a direct channel to The Fables Lab. Tell us what you're working on — we'll help you define the right digital solution.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — The Fables Lab",
    description:
      "Have a problem worth building for? Tell us what you're working on.",
    url: "https://thefableslab.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ProjectInquiry />;
}
