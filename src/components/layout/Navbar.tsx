"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="The Fables Lab home"
          >
            <span className="text-sm tracking-tight text-on-surface">The Fables Lab</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-on-surface-variant transition-colors duration-300 hover:text-on-surface"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-outline-variant px-5 py-1.5 text-sm text-on-surface transition-all duration-300 hover:border-outline"
            >
              Start a project
            </Link>

            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
            >
              <span className="flex flex-col gap-1">
                <span
                  className={`block h-[1px] w-4 bg-on-surface transition-transform ${
                    isOpen ? "translate-y-1 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1px] w-4 bg-on-surface transition-opacity ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1px] w-4 bg-on-surface transition-transform ${
                    isOpen ? "-translate-y-1 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between px-6 py-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-sm text-on-surface">
              The Fables Lab
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center"
            >
              <span className="flex flex-col gap-1">
                <span className="block h-[1px] w-4 bg-on-surface rotate-45" />
                <span className="block h-[1px] w-4 bg-on-surface -rotate-45 -translate-y-[1px]" />
              </span>
            </button>
          </div>
          <nav className="flex flex-1 flex-col px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-t border-outline-variant py-6 text-2xl tracking-tight text-on-surface"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-outline-variant px-6 py-2 text-sm text-on-surface"
            >
              Start a project
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
