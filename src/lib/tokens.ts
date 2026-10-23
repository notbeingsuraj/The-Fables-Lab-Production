/**
 * THE FABLES LAB — Design Tokens
 * Single source of truth for colors, spacing, typography, and motion.
 * Used by components that need JS-accessible theme values (e.g. Three.js materials).
 */

export const COLORS = {
  // Canvas
  background: 0x0a0a0a,      // matte charcoal
  surface: 0x141414,         // graphite
  surfaceElevated: 0x1e1e1e, // secondary surface
  surfaceBright: 0x2a2a2a,   // deep neutral gray

  // Text (as hex for reference)
  onSurface: 0xf5f5f0,       // warm white
  onSurfaceVariant: 0xa8a8a2, // muted gray
  onSurfaceMuted: 0x5a5a52,

  // Accent — muted bronze
  bronze: 0xa67c52,
  bronzeDim: 0x8c6844,
  bronzeHover: 0xb48a6c,
} as const;

export const TYPOGRAPHY = {
  // Editorial type scale (px, approximate for canvas labels)
  displayHero: 5.5,
  headlineXl: 4,
  headlineLg: 3,
  headlineMd: 1.5,
  headlineSm: 1.25,
  bodyLg: 1.125,
  bodyMd: 1,
  labelMd: 0.75,
  labelSm: 0.6875,
} as const;

export const MOTION = {
  // Duration scale (seconds)
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  slower: 1.6,

  // Easing curves (cubic-bezier)
  easeOut: [0.25, 1, 0.5, 1],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOut: [0.45, 0, 0.55, 1],

  // Damping factors for pointer interpolation (0-1, higher = faster snap)
  pointerDamping: 0.12,
  rotationDamping: 0.08,
  scrollDamping: 0.1,

  // Bounds for pointer parallax
  pointerMaxTravel: 0.6, // world units
} as const;

export const BREAKPOINTS = {
  mobile: 320,
  mobileSmall: 375,
  mobileLarge: 390,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  wide: 1920,
} as const;

export type ColorKey = keyof typeof COLORS;
