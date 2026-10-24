"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Start a project", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/thefableslab" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/109757348" },
  { label: "GitHub", href: "https://github.com/notbeingsuraj" },
];

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Link href="/" className="text-sm text-on-surface">
              The Fables Lab
            </Link>
            <p className="mt-6 max-w-[420px] text-body-md text-on-surface-variant">
              Where Ancient Stories Meet Future Tech. Strategy, design, engineering, and AI brought together to build products that move businesses forward.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm text-on-surface">Explore</p>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm text-on-surface">Connect</p>
            <ul className="mt-6 space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:hello@thefableslab.com"
                  className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  hello@thefableslab.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-outline-variant py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-on-surface-muted">
            © {new Date().getFullYear()} The Fables Lab. All rights reserved.
          </p>
          <p className="text-sm text-on-surface-muted">Chandigarh, India</p>
        </div>
      </div>
    </footer>
  );
}
