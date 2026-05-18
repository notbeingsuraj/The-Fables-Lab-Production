"use client";

import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { label: "DistributorOS", href: "#distributor-os" },
    { label: "Current Focus", href: "#current-focus" },
    { label: "Initiatives", href: "#initiatives" },
  ],
  Company: [
    { label: "Principles", href: "#principles" },
    { label: "Contact", href: "/contact" },
  ],
  Connect: [
    { label: "X", href: "https://x.com/thefableslab" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/109757348" },
    { label: "GitHub", href: "https://github.com/notbeingsuraj" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-void border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">

        {/* Top: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-14 pb-14 border-b border-border/30">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-5">
              <span className="font-display font-semibold text-[15px] text-text-primary tracking-tight">
                The Fables Lab
              </span>
            </Link>
            <p className="text-text-muted text-[13px] leading-relaxed max-w-xs">
              Software designed for operational clarity. We build systems that help businesses operate with less friction, fewer delays, and clearer coordination.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <p className="text-label-sm font-medium text-text-dim uppercase mb-4">
                  {category}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-text-muted hover:text-text-secondary transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[11px] text-text-dim">
            © {new Date().getFullYear()} The Fables Lab
          </p>
          <p className="text-[11px] text-text-dim">
            Chandigarh, India
          </p>
        </div>
      </div>
    </footer>
  );
}
