import type { Metadata } from "next";
import DispatchForm from "@/components/contact/DispatchForm";

export const metadata: Metadata = {
  title: "Contact — The Fables Lab",
  description: "Start a project with The Fables Lab. Tell us about your idea and we’ll outline a roadmap within 48 hours.",
};

export default function ContactPage() {
  return (
    <div className="w-full pt-16 bg-background">
      <section className="w-full bg-canvas-white py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-5 space-y-space-md">
            <span className="font-caption-strong text-caption-strong text-action-blue-base uppercase tracking-wider">Dispatch</span>
            <h1 className="font-display-lg text-display-lg text-ink-primary tracking-tight">Start a project</h1>
            <p className="font-body-large text-body-large text-ink-secondary">
              Tell us about your goals, timeline, and budget. We&apos;ll review and get back with a concrete plan within 48 hours.
            </p>
            <div className="space-y-space-xs pt-space-sm">
              <p className="font-caption text-caption text-ink-muted">Email</p>
              <a href="mailto:imysuraj1218@gmail.com" className="font-body-strong text-body-strong text-ink-primary hover:text-action-blue-base transition-colors">
                imysuraj1218@gmail.com
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-canvas-parchment rounded-2xl p-space-lg lg:p-space-xl">
              <DispatchForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
