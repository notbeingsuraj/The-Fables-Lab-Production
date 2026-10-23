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
      // THE FABLES LAB — Cinematic Premium
      // Near-black, graphite, warm white, single bronze accent
      // ─────────────────────────────────────────────────────────────
      colors: {
        background: "#080808",
        "background-secondary": "#111112",
        surface: "#19191B",
        "surface-elevated": "#2A2A2C",
        "surface-glass": "rgba(25, 25, 27, 0.55)",

        "on-surface": "#F5F5F7",
        "on-surface-variant": "#A1A1A6",
        "on-surface-muted": "#6E6E73",

        outline: "rgba(255, 255, 255, 0.10)",
        "outline-variant": "rgba(255, 255, 255, 0.05)",
        "outline-glass": "rgba(255, 255, 255, 0.14)",

        bronze: "#a67c52",
        "bronze-dim": "#8c6844",
        "bronze-hover": "#b48a6c",
        "bronze-subtle": "rgba(166, 124, 82, 0.10)",
        "bronze-glass": "rgba(166, 124, 82, 0.06)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "SF Mono", "monospace"],
      },
      fontSize: {
        // Editorial scale — oversized headlines
        "display-hero": ["clamp(3.5rem, 11vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "headline-xl": ["clamp(2.75rem, 8vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "headline-lg": ["clamp(2rem, 5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "headline-md": ["1.5rem", { lineHeight: "1.35" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body-md": ["1rem", { lineHeight: "1.75" }],
        "body-sm": ["0.875rem", { lineHeight: "1.65" }],
        "label-lg": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.14em" }],
        "label-md": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.16em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
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
        none: "0",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.35)",
        "soft-lg": "0 8px 48px -8px rgba(0, 0, 0, 0.4)",
        edge: "1px 1px 0px 0px #a67c52",
        glass: "0 1px 0px 0px rgba(255, 255, 255, 0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.23, 1, 0.32, 1) both",
        "fade-in": "fadeIn 1s ease both",
        "scale-in": "scaleIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both",
        "float": "float 6s ease-in-out infinite",
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
