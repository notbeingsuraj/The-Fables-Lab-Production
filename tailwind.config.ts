/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────────────────────────
      // THE FABLES LAB — Expressive Apple-inspired Premium Light
      // White canvas with deliberate color accents
      // ─────────────────────────────────────────────────────────────
      colors: {
        background: "#FFFFFF",
        "background-secondary": "#F5F5F7",
        surface: "#FFFFFF",
        "surface-elevated": "#FFFFFF",
        "surface-glass": "rgba(255, 255, 255, 0.78)",
        tertiary: "#FAFAFA",
        "surface-tint-blue": "rgba(0, 113, 227, 0.03)",
        "surface-tint-violet": "rgba(119, 85, 232, 0.03)",
        "surface-tint-coral": "rgba(255, 107, 90, 0.03)",
        "surface-tint-teal": "rgba(32, 164, 168, 0.03)",
        "surface-tint-amber": "rgba(245, 166, 35, 0.03)",

        "on-surface": "#1D1D1F",
        "on-surface-variant": "#6E6E73",
        "on-surface-muted": "#86868B",

        outline: "#D2D2D7",
        "outline-variant": "rgba(0, 0, 0, 0.06)",
        "outline-glass": "rgba(255, 255, 255, 0.72)",
        "border-subtle": "rgba(0, 0, 0, 0.06)",

        accent: "#0071E3",
        "accent-subtle": "rgba(0, 113, 227, 0.08)",
        "accent-strong": "#0059B3",
        violet: "#7755E8",
        "violet-subtle": "rgba(119, 85, 232, 0.08)",
        coral: "#FF6B5A",
        "coral-subtle": "rgba(255, 107, 90, 0.08)",
        teal: "#20A4A8",
        "teal-subtle": "rgba(32, 164, 168, 0.08)",
        amber: "#F5A623",
        "amber-subtle": "rgba(245, 166, 35, 0.08)",
        green: "#34C759",
        "green-subtle": "rgba(52, 199, 89, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "monospace"],
      },
      fontSize: {
        // Editorial scale — oversized headlines
        "display-hero": ["clamp(3.5rem, 11vw, 8.5rem)", { lineHeight: "1.0", letterSpacing: "-0.055em" }],
        "display-xl": ["clamp(3rem, 10vw, 7rem)", { lineHeight: "1.0", letterSpacing: "-0.055em" }],
        "headline-xl": ["clamp(2.75rem, 8vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.05em" }],
        "headline-lg": ["clamp(2.25rem, 6vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "headline-md": ["clamp(1.75rem, 4vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "headline-sm": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        "body-xl": ["clamp(1.125rem, 2vw, 1.375rem)", { lineHeight: "1.8" }],
        "body-lg": ["1.125rem", { lineHeight: "1.8" }],
        "body-md": ["1rem", { lineHeight: "1.8" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.7" }],
        "label-lg": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.08em" }],
        "label-md": ["0.8125rem", { lineHeight: "1.6", letterSpacing: "0.08em" }],
        "label-sm": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.1em" }],
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        section: "clamp(6rem, 14vw, 12rem)",
        "section-sm": "clamp(4rem, 10vw, 8rem)",
        gutter: "2rem",
        "gutter-tablet": "3rem",
        "gutter-desktop": "4rem",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        none: "0",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0, 0, 0, 0.02), 0 4px 16px rgba(0, 0, 0, 0.03)",
        "soft-lg": "0 1px 2px rgba(0, 0, 0, 0.02), 0 12px 40px rgba(0, 0, 0, 0.04)",
        glass: "0 4px 24px rgba(0, 0, 0, 0.045)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) both",
        "fade-in": "fadeIn 1s ease both",
        "scale-in": "scaleIn 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-premium": "cubic-bezier(0.25, 0, 0.35, 1)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
