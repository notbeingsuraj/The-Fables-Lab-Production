import { type ReactNode } from "react";

/**
 * Infinite looping telemetry ribbon. The content is duplicated inline so the
 * -50% keyframe translate produces a seamless loop.
 */
export default function Marquee({
  children,
  speed = "normal",
  className = "",
}: {
  children: ReactNode;
  speed?: "normal" | "fast";
  className?: string;
}) {
  const animation = speed === "fast" ? "animate-marquee-fast" : "animate-marquee";
  return (
    <div className={`flex-1 whitespace-nowrap overflow-hidden ${className}`}>
      <div className={`inline-block ${animation} whitespace-nowrap`}>
        {children}
        <span aria-hidden className="inline-block">
          {children}
        </span>
      </div>
    </div>
  );
}
