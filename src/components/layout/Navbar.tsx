"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSynth } from "@/components/providers/SynthProvider";

const NAV_LINKS = [
  { label: "Home", href: "/", tag: "00" },
  { label: "The Lab", href: "/about", tag: "01" },
  { label: "Capabilities", href: "/services", tag: "02" },
  { label: "Process", href: "/process", tag: "03" },
  { label: "Work", href: "/projects", tag: "04" },
  { label: "Contact", href: "/contact", tag: "05" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { play, enabled } = useSynth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || isOpen
            ? "border-outline-variant/50 bg-surface-container-lowest/95 backdrop-blur-md"
            : "border-outline-variant/20 bg-surface-container-lowest/60 backdrop-blur-sm"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-space-md px-space-md lg:px-margin-desktop">
          {/* Logo mark */}
          <Link
            href="/"
            onClick={() => play(520)}
            className="group flex items-center gap-space-sm"
          >
            <span className="flex h-7 w-7 items-center justify-center bg-primary-fixed font-display text-[16px] leading-none text-on-primary-fixed transition-colors group-hover:bg-secondary-container group-hover:text-on-secondary">
              F
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] uppercase tracking-wider text-primary">
                Fables Lab
              </span>
              <span className="mt-0.5 hidden font-mono text-label-mono-sm uppercase tracking-widest text-outline sm:block">
                Creative Technology Studio
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => play(440 + Math.random() * 100, 0.04)}
                className={`group flex items-center gap-1.5 px-3 py-2 font-mono text-label-mono-md uppercase tracking-wider transition-colors ${
                  isActive(link.href)
                    ? "text-primary-fixed"
                    : "text-outline hover:text-on-surface"
                }`}
              >
                <span
                  className={`text-label-mono-sm transition-transform ${
                    isActive(link.href)
                      ? "text-primary-fixed"
                      : "text-outline-variant group-hover:translate-x-0.5"
                  }`}
                >
                  &gt;&gt;
                </span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right rail */}
          <div className="flex items-center gap-space-sm">
            <span className="hidden items-center gap-2 border border-outline-variant/40 bg-surface-container px-3 py-1.5 font-mono text-label-mono-sm uppercase tracking-wider text-tertiary-fixed-dim md:flex">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-ping" />
              {enabled ? "SYNTH: ON" : "SYNTH: OFF"}
            </span>
            <Link
              href="/contact"
              onClick={() => play(680, 0.06)}
              className="hidden bg-primary-fixed px-4 py-2 font-mono text-label-mono-md font-bold uppercase tracking-wider text-on-primary-fixed shadow-magenta-sm transition-all hover:bg-secondary-container hover:text-on-secondary sm:block"
            >
              [ Transmit ↗ ]
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => {
                play(360);
                setIsOpen((v) => !v);
              }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="flex h-9 w-9 items-center justify-center border border-outline-variant/50 bg-surface-container text-on-surface lg:hidden"
            >
              <span className="flex flex-col gap-1">
                <span
                  className={`block h-0.5 w-4 bg-current transition-transform ${isOpen ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span className={`block h-0.5 w-4 bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`} />
                <span
                  className={`block h-0.5 w-4 bg-current transition-transform ${isOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu — full-viewport terminal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-surface-container-lowest/98 pt-20 pb-16 px-space-md backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col border-t border-outline-variant/40">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      play(480, 0.05);
                      setIsOpen(false);
                    }}
                    className={`flex items-baseline justify-between border-b border-outline-variant/40 py-5 transition-colors ${
                      isActive(link.href) ? "text-primary-fixed" : "text-on-surface"
                    }`}
                  >
                    <span className="font-display text-4xl uppercase tracking-wide">
                      {link.label}
                    </span>
                    <span className="font-mono text-label-mono-sm uppercase tracking-widest text-outline">
                      [SYS_{link.tag}]
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center justify-between font-mono text-label-mono-sm uppercase tracking-widest text-outline">
              <span>NODE: NYC_247</span>
              <span className="text-secondary">&gt;&gt; CHANNEL OPEN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
