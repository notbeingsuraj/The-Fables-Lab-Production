"use client";

/**
 * Root error boundary — replaces the entire document when the root layout
 * itself fails. Must render <html>/<body> since no layout is guaranteed here.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121317",
          color: "#e3e2e8",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "2rem",
            padding: "2rem",
            border: "1px solid #93000a",
            background: "#1a1b20",
            boxShadow: "4px 4px 0px 0px #ffb4ab",
          }}
        >
          <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#ffb4ab", textTransform: "uppercase", fontWeight: 700 }}>
            &gt; ROOT_KERNEL :: CRITICAL FAULT
          </p>
          <p style={{ fontSize: "72px", lineHeight: 1, margin: "1.5rem 0 0", color: "#f5f4ef", fontWeight: 700 }}>
            500
          </p>
          <p style={{ fontSize: "18px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#ffb4ab", fontWeight: 700 }}>
            SYSTEM HALTED // LAYOUT FAILURE
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#c5c9ac" }}>
            The root layout failed to render, so the document shell could not be
            assembled. Reload to retry the boot sequence.
          </p>
          <p style={{ fontSize: 11, color: "#8f9378", textTransform: "uppercase", wordBreak: "break-all" }}>
            {error.message?.slice(0, 160) || "unknown exception"}
            {error.digest ? ` // DIGEST: ${error.digest}` : ""}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                border: "none",
                cursor: "pointer",
                padding: "1rem 1.5rem",
                background: "#ccf200",
                color: "#181e00",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "4px 4px 0px 0px #ff42ad",
              }}
            >
              [ REBOOT ↻ ]
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              style={{
                cursor: "pointer",
                padding: "1rem 1.5rem",
                background: "transparent",
                border: "1px solid #454932",
                color: "#e3e2e8",
                fontSize: 14,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              [ RETURN TO GATEWAY ]
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
