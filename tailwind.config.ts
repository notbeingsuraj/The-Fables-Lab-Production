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
      // THE FABLES LAB — Apple-Grade Premium Minimal
      // Monochromatic palette with muted bronze accent
      // ─────────────────────────────────────────────────────────────
      colors: {
        // Dark mode (primary)
        background: "#080808",
        "background-secondary": "#111112",
        surface: "#19191B",
        "surface-elevated": "#2A2A2C",
        "surface-glass": "rgba(25, 25, 27, 0.6)",

        // Text
        "on-surface": "#F5F5F7",      // primary text
        "on-surface-variant": "#A1A1A6", // secondary text
        "on-surface-muted": "#6E6E73", // tertiary text

        // Borders
        outline: "rgba(255, 255, 255, 0.12)",
        "outline-variant": "rgba(255, 255, 255, 0.06)",
        "outline-glass": "rgba(255, 255, 255, 0.18)",

        // Accent — muted bronze
        bronze: "#a67c52",
        "bronze-dim": "#8c6844",
        "bronze-hover": "#b48a6c",
        "bronze-subtle": "rgba(166, 124, 82, 0.12)",
        "bronze-glass": "rgba(166, 124, 82, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Editorial display scale
        "display-hero": ["clamp(3rem, 8vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "headline-xl": ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "headline-lg": ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
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
        section: "clamp(5rem, 12vw, 10rem)",
        "section-sm": "clamp(3rem, 8vw, 6rem)",
        gutter: "1.5rem",
        "gutter-tablet": "2rem",
        "gutter-desktop": "3rem",
        max: "clamp(2rem, 8vw, 4rem)",
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
        glass: "0 1px 0px 0px rgba(255, 255, 255, 0.1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) both",
        "fade-in": "fadeIn 1s ease both",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) both",
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
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.98)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "ease-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
