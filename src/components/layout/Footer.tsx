"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-void border-t border-border/40 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-text-muted text-[13px] font-medium tracking-tight">
          The Fables Lab. Software designed for operational clarity.
        </p>
        <div className="flex gap-6">
          {[
            { label: "DistributorOS", href: "#distributor-os" },
            { label: "Principles", href: "#principles" },
            { label: "Initiatives", href: "#initiatives" },
            { label: "Contact", href: "/contact" }
          ].map((link) => (
            <Link 
              key={link.label}
              href={link.href}
              className="text-text-dim hover:text-text-primary transition-colors text-[13px] font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
