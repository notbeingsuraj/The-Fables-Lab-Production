"use client";

import Link from "next/link";

const NAV = {
  Products: [
    { label: "DistributorOS", href: "#distributor-os" },
    { label: "Initiatives", href: "#initiatives" },
  ],
  Company: [
    { label: "Principles", href: "#principles" },
    { label: "Why We Exist", href: "#why-we-exist" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-void border-t border-border/30 relative overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

        {/* Main footer body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 py-20 border-b border-border/25">

          {/* Brand block */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
            <div>
              <Link href="/" className="inline-block mb-4">
                <span
                  className="font-display font-medium text-text-primary tracking-tight"
                  style={{ fontSize: "1.0625rem", letterSpacing: "-0.015em" }}
                >
                  The Fables Lab
                </span>
              </Link>
              <p className="text-text-muted text-[13.5px] leading-relaxed max-w-xs">
                Software designed for operational clarity.
              </p>
              <p className="text-text-dim text-[12px] leading-relaxed max-w-xs mt-1.5">
                Building operational systems for modern businesses.
              </p>
            </div>

            {/* Builder-energy status */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" />
                <span className="text-[11px] font-mono text-text-dim tracking-wider">
                  Currently focused on DistributorOS.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="text-[11px] font-mono text-text-dim tracking-wider">
                  Operational systems, in progress.
                </span>
              </div>
            </div>
          </div>

          {/* Navigation groups */}
          <div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 gap-12 lg:pl-8">
            {Object.entries(NAV).map(([group, links]) => (
              <div key={group}>
                <p className="text-[10px] font-mono font-medium text-text-dim uppercase tracking-widest mb-6">
                  {group}
                </p>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-text-muted hover:text-text-primary transition-colors duration-300 tracking-tight"
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-8">
          <p className="text-[11px] font-mono text-text-dim tracking-wider">
            © {new Date().getFullYear()} The Fables Lab — Chandigarh, India
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "X", href: "https://x.com/thefableslab" },
              { label: "LinkedIn", href: "https://www.linkedin.com/company/109757348" },
              { label: "GitHub", href: "https://github.com/notbeingsuraj" },
            ].map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-text-dim hover:text-text-muted transition-colors duration-300 uppercase tracking-widest"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
