"use client";

/**
 * WebAudio mechanical-switch synthesizer.
 *
 * Generates the short "thock" transient used across the site whenever a key,
 * button, or the 3D switch core is struck. A single AudioContext is created
 * lazily (browsers require a user gesture) and shared by every caller.
 */

let audioCtx: AudioContext | null = null;
let enabled = true;
const listeners = new Set<(value: boolean) => void>();

if (typeof window !== "undefined") {
  try {
    const stored = window.localStorage.getItem("fables-synth");
    if (stored !== null) enabled = stored === "on";
  } catch {
    /* storage unavailable — keep default */
  }
}

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      void audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/** Play a mechanical "thock" — triangle transient through a falling lowpass. */
export function playThock(freq = 480, duration = 0.05) {
  if (!enabled) return;
  const ctx = ensureContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn("AudioContext error:", err);
  }
}

export function isSynthEnabled() {
  return enabled;
}

export function setSynthEnabled(value: boolean) {
  enabled = value;
  try {
    window.localStorage.setItem("fables-synth", value ? "on" : "off");
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((listener) => listener(value));
}

export function toggleSynth() {
  setSynthEnabled(!enabled);
  if (enabled) playThock(620, 0.05);
  return enabled;
}

export function subscribeSynth(listener: (value: boolean) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
