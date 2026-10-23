"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/projects" },
  { label: "Approach", href: "/about" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 glass-nav"
      >
        <div className="flex h-12 items-center justify-between gap-4 px-4 lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="The Fables Lab home"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-outline rounded-sm text-[13px] font-mono font-bold uppercase tracking-wider text-bronze transition-colors hover:bg-bronze hover:text-surface">
              FL
            </span>
            <span className="hidden sm:block text-sm font-medium tracking-tight text-on-surface">
              The Fables Lab
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-500 ${
                  isActive(link.href) ? "text-on-surface" : "text-on-surface-variant"
                } hover:text-bronze`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2 border border-bronze bg-bronze text-[10px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Start a Project
            </Link>

            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="flex h-7 w-7 items-center justify-center border border-outline rounded-sm text-on-surface lg:hidden"
            >
              <span className="flex flex-col gap-1">
                <span
                  className={`block h-[1px] w-4 bg-current transition-transform ${isOpen ? "translate-y-1 rotate-45" : ""}`}
                />
                <span
                  className={`block h-[1px] w-4 bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-[1px] w-4 bg-current transition-transform ${isOpen ? "-translate-y-1 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-2xl lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-outline-variant/30">
            <span className="text-xs font-mono uppercase tracking-wider text-on-surface-muted">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-7 w-7 items-center justify-center border border-outline rounded-sm text-on-surface"
            >
              <span className="flex flex-col gap-1">
                <span className="block h-[1px] w-4 bg-current transition-transform rotate-45" />
                <span className="block h-[1px] w-4 bg-current transition-transform -rotate-45" />
              </span>
            </button>
          </div>
          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 border-b border-outline-variant/20 py-5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-on-surface border-l-2 border-bronze pl-3"
                    : "text-on-surface-variant hover:text-bronze"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-10 pt-8 border-t border-outline-variant/30">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2 border border-bronze bg-bronze text-[10px] font-bold uppercase tracking-wider text-surface"
              >
                Start a Project
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
