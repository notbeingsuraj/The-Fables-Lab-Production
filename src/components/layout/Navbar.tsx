"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/projects" },
  { label: "Our Approach", href: "/about" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          scrolled || isOpen
            ? "border-outline-variant/40 bg-surface/85 backdrop-blur-md"
            : "border-outline-variant/10 bg-surface/60 backdrop-blur-sm"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-4 lg:px-6">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="The Fables Lab home"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-outline rounded-sm font-mono text-xs font-bold uppercase tracking-wider text-bronze transition-colors hover:bg-bronze hover:text-surface">
              FL
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold uppercase tracking-tight text-on-surface">
                The Fables Lab
              </span>
              <span className="block mt-0.5 text-[10px] font-mono uppercase tracking-[0.16em] text-on-surface-muted">
                Independent Digital Solutions Studio
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-on-surface" : "text-on-surface-variant"
                } hover:text-bronze`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right rail */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-bronze bg-bronze text-xs font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover"
            >
              Start a Project
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="flex h-9 w-9 items-center justify-center border border-outline rounded-sm text-on-surface lg:hidden"
            >
              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-[1px] w-5 bg-current transition-transform ${isOpen ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`block h-[1px] w-5 bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-[1px] w-5 bg-current transition-transform ${isOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col bg-surface/98 backdrop-blur-xl lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-outline-variant/30">
            <span className="text-xs font-mono uppercase tracking-wider text-on-surface-muted">
              MENU
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center border border-outline rounded-sm text-on-surface"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-[1px] w-5 bg-current transition-transform rotate-45" />
                <span className="block h-[1px] w-5 bg-current transition-transform -rotate-45" />
              </span>
            </button>
          </div>
          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 border-b border-outline-variant/20 py-4 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-on-surface border-l-2 border-bronze pl-3"
                    : "text-on-surface-variant hover:text-bronze"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8 pt-6 border-t border-outline-variant/30">
              <Link
                href="/contact"
                className="flex items-center justify-between gap-1.5 px-4 py-3 border border-bronze bg-bronze text-xs font-bold uppercase tracking-wider text-surface"
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
