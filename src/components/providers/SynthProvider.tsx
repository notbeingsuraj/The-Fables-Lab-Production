"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  isSynthEnabled,
  playThock as playThockEngine,
  subscribeSynth,
  toggleSynth as toggleSynthEngine,
} from "@/lib/audio";

interface SynthContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (freq?: number, duration?: number) => void;
}

const SynthContext = createContext<SynthContextValue>({
  enabled: true,
  toggle: () => {},
  play: () => {},
});

export function SynthProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSynthEnabled());
    const unsubscribe = subscribeSynth(setEnabled);
    return () => {
      unsubscribe();
    };
  }, []);

  const toggle = useCallback(() => {
    toggleSynthEngine();
  }, []);

  const play = useCallback((freq?: number, duration?: number) => {
    playThockEngine(freq, duration);
  }, []);

  return (
    <SynthContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SynthContext.Provider>
  );
}

export function useSynth() {
  return useContext(SynthContext);
}
