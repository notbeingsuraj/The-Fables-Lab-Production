"use client";

import Link from "next/link";

const SERVICE_LINKS = [
  { label: "Full-Stack Solutions", href: "/services" },
  { label: "AI Solutions", href: "/services" },
  { label: "Marketing Solutions", href: "/services" },
  { label: "UI/UX Design", href: "/services" },
  { label: "Community Building", href: "/services" },
  { label: "Content Management", href: "/services" },
] as const;

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/thefableslab", ariaLabel: "The Fables Lab on X" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/thefableslab", ariaLabel: "The Fables Lab on LinkedIn" },
  { label: "GitHub", href: "https://github.com/notbeingsuraj", ariaLabel: "The Fables Lab on GitHub" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/20 bg-surface/90 backdrop-blur">
      <div className="px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-7 w-7 items-center justify-center border border-outline rounded-sm font-mono text-xs font-bold uppercase tracking-wider text-bronze">
                FL
              </span>
              <span className="text-sm font-semibold uppercase tracking-tight text-on-surface">
                The Fables Lab
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
              An independent digital solutions studio where ancient stories meet future tech.
              We help businesses build, launch, market, and scale digital products.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-on-surface-muted mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-on-surface-variant transition-colors hover:text-bronze"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-on-surface-muted mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-on-surface-variant transition-colors hover:text-bronze"
                    aria-label={item.ariaLabel}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:hello@thefableslab.com"
                  className="text-sm text-on-surface-variant transition-colors hover:text-bronze"
                >
                  hello@thefableslab.com
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-on-surface-muted mb-4">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-on-surface-variant transition-colors hover:text-bronze">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-on-surface-variant transition-colors hover:text-bronze">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-on-surface-variant transition-colors hover:text-bronze">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom band */}
        <div className="mt-12 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-surface-muted">
            &copy; {new Date().getFullYear()} The Fables Lab. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-on-surface-muted">
            <a href="/contact" className="transition-colors hover:text-bronze">
              Contact
            </a>
            <span className="text-outline-variant">·</span>
            <a href="/projects" className="transition-colors hover:text-bronze">
              Work
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
