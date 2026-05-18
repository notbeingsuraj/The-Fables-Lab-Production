import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Core Surfaces ────────────────────────────────────────────
        void: "#0a0a0a",
        surface: "#111113",
        elevated: "#1a1a1e",
        border: "#232326",
        "border-subtle": "#1a1a1d",

        // ─── Text Hierarchy ───────────────────────────────────────────
        "text-primary": "#f5f5f7",
        "text-secondary": "#a1a1a6",
        "text-muted": "#6e6e73",
        "text-dim": "#48484d",

        // ─── Accent — singular, restrained ────────────────────────────
        accent: "#4a9eff",
        "accent-muted": "#3a7fd4",
        "accent-subtle": "rgba(74, 158, 255, 0.08)",

        // ─── Warm Neutrals (for contrast sections) ───────────────────
        "warm-bg": "#fafaf9",
        "warm-surface": "#ffffff",
        "warm-border": "#e8e8e6",
        "warm-text": "#1a1a1a",
        "warm-secondary": "#6b6b6b",
        "warm-muted": "#999999",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Display scale — typography IS the design
        "display-hero": ["clamp(3rem, 6.5vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "label-sm": ["0.625rem", { lineHeight: "1.3", letterSpacing: "0.1em" }],
      },
      spacing: {
        section: "clamp(6rem, 12vw, 10rem)",
        "section-sm": "clamp(4rem, 8vw, 6rem)",
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
        pill: "9999px",
      },
      backgroundImage: {
        "gradient-void": "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,158,255,0.04) 0%, transparent 70%)",
        "gradient-subtle": "linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.8s ease both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
