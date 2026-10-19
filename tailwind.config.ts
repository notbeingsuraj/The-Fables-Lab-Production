import type { Config } from "tailwindcss";

/**
 * THE FABLES LAB — Maximalist Design System
 * Cyberpunk Maximalism × Structural Brutalism.
 *
 * Token names mirror the design spec (surface-container-*, primary-container,
 * tertiary-fixed-dim, ...). A set of *legacy* aliases (charcoal, off-white,
 * gridline, neon-*, electric-blue, ...) is kept at the bottom so older views
 * (admin console, seeds) render consistently with the new palette.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Canvas & Structure ──────────────────────────────────────
        background: "#121317",
        surface: "#121317",
        "surface-dim": "#121317",
        "surface-bright": "#38393e",
        "surface-container-lowest": "#0d0e12",
        "surface-container-low": "#1a1b20",
        "surface-container": "#1e1f24",
        "surface-container-high": "#292a2e",
        "surface-container-highest": "#343439",
        "on-surface": "#e3e2e8",
        "on-surface-variant": "#c5c9ac",
        "inverse-surface": "#e3e2e8",
        "inverse-on-surface": "#2f3035",
        outline: "#8f9378",
        "outline-variant": "#454932",

        // ─── Primary — Electric Acid Green ───────────────────────────
        "surface-tint": "#b3d400",
        primary: "#ffffff",
        "on-primary": "#2b3400",
        "primary-container": "#ccf200",
        "on-primary-container": "#5a6c00",
        "inverse-primary": "#546500",
        "primary-fixed": "#ccf200",
        "primary-fixed-dim": "#b3d400",
        "on-primary-fixed": "#181e00",
        "on-primary-fixed-variant": "#3f4c00",

        // ─── Secondary — Cyberpunk Magenta ───────────────────────────
        secondary: "#ffafd1",
        "on-secondary": "#63003e",
        "secondary-container": "#ff42ad",
        "on-secondary-container": "#570036",
        "secondary-fixed": "#ffd8e6",
        "secondary-fixed-dim": "#ffafd1",
        "on-secondary-fixed": "#3d0025",
        "on-secondary-fixed-variant": "#8b0059",

        // ─── Tertiary — Laser Cyan ───────────────────────────────────
        tertiary: "#ffffff",
        "on-tertiary": "#00363d",
        "tertiary-container": "#9cf0ff",
        "on-tertiary-container": "#006f7c",
        "tertiary-fixed": "#9cf0ff",
        "tertiary-fixed-dim": "#00daf3",
        "on-tertiary-fixed": "#001f24",
        "on-tertiary-fixed-variant": "#004f58",

        // ─── Error ───────────────────────────────────────────────────
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",

        // ─── Extra Emissives ─────────────────────────────────────────
        signal: "#ff5a1f",
        "on-signal": "#3a0d00",
        ultraviolet: "#8b5cff",
        "terminal-white": "#f5f4ef",

        // ─── Legacy aliases (minimal-era tokens) ─────────────────────
        void: "#0d0e12",
        elevated: "#1e1f24",
        border: "#292a2e",
        "border-subtle": "#1e1f24",
        "text-primary": "#e3e2e8",
        "text-secondary": "#c5c9ac",
        "text-muted": "#8f9378",
        "text-dim": "#777984",
        accent: "#ccf200",
        "accent-muted": "#b3d400",
        "accent-subtle": "rgba(204, 242, 0, 0.08)",

        // ─── Legacy aliases (first-brutalist-era tokens) ─────────────
        charcoal: "#121317",
        navy: "#1a1b20",
        "off-white": "#e3e2e8",
        gridline: "#292a2e",
        "electric-blue": "#00e5ff",
        "neon-cyan": "#00daf3",
        "neon-green": "#ccf200",
        "cyber-yellow": "#d7ff00",
        "hot-pink": "#ff42ad",
        "neon-purple": "#8b5cff",
        purple: "#8b5cff",
        "bright-orange": "#ff5a1f",

        // ─── Warm neutrals (legacy) ──────────────────────────────────
        "warm-bg": "#fafaf9",
        "warm-surface": "#ffffff",
        "warm-border": "#e8e8e6",
        "warm-text": "#1a1a1a",
        "warm-secondary": "#6b6b6b",
        "warm-muted": "#999999",
      },
      fontFamily: {
        anton: ["var(--font-anton)", "Impact", "Haettenschweiler", "sans-serif"],
        chivo: ["var(--font-chivo)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
        // Semantic aliases
        sans: ["var(--font-chivo)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        grotesk: ["var(--font-chivo)", "system-ui", "sans-serif"],
        label: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Display — Anton, always uppercase, tight leading
        "display-hero": ["clamp(3rem, 8.5vw, 96px)", { lineHeight: "0.96", letterSpacing: "0.02em" }],
        "headline-xl": ["clamp(2.25rem, 5.5vw, 64px)", { lineHeight: "1", letterSpacing: "0.02em" }],
        "headline-lg": ["clamp(1.75rem, 3.6vw, 40px)", { lineHeight: "1.05", letterSpacing: "0.02em" }],
        // Content — Chivo
        "headline-md": ["24px", { lineHeight: "28px", letterSpacing: "-0.01em" }],
        "headline-sm": ["18px", { lineHeight: "24px", letterSpacing: "0em" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        "body-md": ["15px", { lineHeight: "22px" }],
        "body-sm": ["13px", { lineHeight: "18px" }],
        // Telemetry — JetBrains Mono
        "label-mono-lg": ["14px", { lineHeight: "18px", letterSpacing: "0.06em" }],
        "label-mono-md": ["12px", { lineHeight: "16px", letterSpacing: "0.08em" }],
        "label-mono-sm": ["10px", { lineHeight: "12px", letterSpacing: "0.12em" }],
        // Legacy display scale
        "display-hero-legacy": ["clamp(3rem, 6.5vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "label-sm": ["0.625rem", { lineHeight: "1.3", letterSpacing: "0.1em" }],
      },
      spacing: {
        // Mechanical rhythm scale from the design spec
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "space-2xl": "4rem",
        gutter: "1rem",
        "gutter-tablet": "1.5rem",
        "gutter-desktop": "2rem",
        margin: "1rem",
        "margin-tablet": "2rem",
        "margin-desktop": "3rem",
        // Legacy section scale
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
      boxShadow: {
        // Hard-edged displacement only — no blur, per the design system.
        acid: "4px 4px 0px 0px #ccf200",
        magenta: "4px 4px 0px 0px #ff42ad",
        cyan: "4px 4px 0px 0px #00daf3",
        "acid-sm": "3px 3px 0px 0px #ccf200",
        "magenta-sm": "3px 3px 0px 0px #ff42ad",
        "cyan-sm": "3px 3px 0px 0px #00daf3",
        "panel-sm": "3px 3px 0px 0px #343439",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        blink: "blink 1s steps(1) infinite",
        flicker: "flicker 4s linear infinite",
        "spin-slow": "spin 60s linear infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.8s ease both",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.4" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.7" },
          "97%": { opacity: "1" },
        },
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
      backgroundImage: {
        "gradient-void": "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(204,242,0,0.05) 0%, transparent 70%)",
        "gradient-subtle": "linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)",
        "grid-fine":
          "linear-gradient(rgba(29,32,41,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(29,32,41,0.55) 1px, transparent 1px)",
        "warning-stripes":
          "repeating-linear-gradient(45deg, #d7ff00 0 12px, #08090d 12px 24px)",
      },
    },
  },
  plugins: [],
};

export default config;
