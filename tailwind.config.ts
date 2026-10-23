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
      // THE FABLES LAB — Premium Minimal
      // Background: matte charcoal / near-black
      // Surfaces: graphite & deep neutral gray
      // Text: warm white primary, muted gray secondary
      // Accent: muted bronze (applied consistently)
      // ─────────────────────────────────────────────────────────────
      colors: {
        background: "#0a0a0a",
        surface: "#141414",
        "surface-dim": "#0d0d0d",
        "surface-elevated": "#1e1e1e",
        "surface-bright": "#2a2a2a",

        "on-surface": "#f5f5f0",      // warm white
        "on-surface-variant": "#a8a8a2", // muted gray
        "on-surface-muted": "#6e6e68",

        outline: "#242424",
        "outline-variant": "#1a1a1a",

        bronze: "#a67c52",
        "bronze-dim": "#8c6844",
        "bronze-hover": "#b48a6c",
        "bronze-subtle": "rgba(166, 124, 82, 0.10)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-hero": ["clamp(2.75rem, 7vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "headline-xl": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "headline-lg": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "headline-md": ["1.25rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label-lg": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.12em" }],
        "label-md": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.14em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.16em" }],
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
        section: "clamp(4rem, 10vw, 9rem)",
        "section-sm": "clamp(3rem, 8vw, 6rem)",
        gutter: "1.5rem",
        "gutter-tablet": "2rem",
        "gutter-desktop": "3rem",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        none: "0",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(0, 0, 0, 0.4)",
        "soft-lg": "0 8px 40px -8px rgba(0, 0, 0, 0.5)",
        edge: "1px 1px 0px 0px #a67c52",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) both",
        "fade-in": "fadeIn 1s ease both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
