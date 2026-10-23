/**
 * THE FABLES LAB — Design Tokens
 * Single source of truth for colors, spacing, typography, and motion.
 * Used by components that need JS-accessible theme values (e.g. Three.js materials).
 */

export const COLORS = {
  // Canvas — Dark mode (primary)
  background: 0x080808,        // matte near-black
  surface: 0x111112,           // secondary background
  surfaceElevated: 0x19191B,   // elevated surface
  surfaceBright: 0x2A2A2C,     // surface bright

  // Text
  onSurface: 0xF5F5F7,         // primary text
  onSurfaceVariant: 0xA1A1A6,  // secondary text
  onSurfaceMuted: 0x6E6E73,    // tertiary text

  // Accent — muted bronze
  bronze: 0xa67c52,
  bronzeDim: 0x8c6844,
  bronzeHover: 0xb48a6c,
} as const;

export const TYPOGRAPHY = {
  // Editorial type scale (px, approximate for canvas labels)
  displayHero: 4.5,
  headlineXl: 3.5,
  headlineLg: 2.5,
  headlineMd: 1.25,
  headlineSm: 1,
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
  pointerDamping: 0.1,
  rotationDamping: 0.06,
  scrollDamping: 0.08,

  // Bounds for pointer parallax
  pointerMaxTravel: 0.4, // world units
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
