"use client";

import { useState } from "react";
import { useSynth } from "@/components/providers/SynthProvider";

const SCOPES = [
  "3D / WebGL",
  "AI Systems",
  "MVP Engineering",
  "Design System",
  "Kinetic Hardware",
  "Spatial Audio",
  "Not Sure Yet",
] as const;

interface FieldErrors {
  name?: string;
  email?: string;
  project_name?: string;
  architecture_details?: string;
}

/** Terminal dispatch form — posts to POST /api/contact. */
export default function DispatchForm() {
  const { play } = useSynth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [details, setDetails] = useState("");
  const [scopes, setScopes] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const toggleScope = (scope: string) => {
    play(440, 0.04);
    setScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setMessage("");

    const scopeLine = scopes.length ? `SCOPE VECTOR: ${scopes.join(", ")}\n\n` : "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          project_name: projectName,
          architecture_details: `${scopeLine}${details}`,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        play(760, 0.1);
        setStatus("sent");
        setMessage("TRANSMISSION RECEIVED // The lab responds within 24 operational hours.");
      } else {
        play(220, 0.12);
        setStatus("error");
        setErrors(data.fields || {});
        setMessage(data.error || "Signal lost. Please retry the transmission.");
      }
    } catch {
      play(220, 0.12);
      setStatus("error");
      setMessage("Uplink unavailable. Check your connection and retry.");
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-primary-fixed/50 bg-surface-container-low p-space-xl shadow-acid">
        <div className="mb-space-md flex items-center gap-space-sm">
          <span className="h-3 w-3 animate-ping bg-primary-fixed" />
          <span className="font-mono text-label-mono-md font-bold uppercase tracking-widest text-primary-fixed">
            [ACK] TRANSMISSION CONFIRMED
          </span>
        </div>
        <h3 className="font-display text-headline-lg uppercase text-primary">
          SIGNAL LOCKED.
        </h3>
        <p className="mt-space-sm max-w-md text-body-md leading-relaxed text-on-surface-variant">
          {message}
        </p>
        <div className="mt-space-lg flex flex-wrap gap-space-sm font-mono text-label-mono-sm uppercase text-outline">
          <span className="border border-outline-variant/40 px-space-sm py-1">
            TICKET: AUTO-GENERATED
          </span>
          <span className="border border-outline-variant/40 px-space-sm py-1">
            CHANNEL: ENCRYPTED
          </span>
          <span className="border border-outline-variant/40 px-space-sm py-1 text-tertiary-fixed-dim">
            STATUS: QUEUED ✓
          </span>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full border border-outline-variant/50 bg-surface-container-lowest px-space-md py-space-sm font-mono text-label-mono-md text-on-surface placeholder:text-outline-variant focus:border-primary-fixed focus:outline-none transition-colors";
  const labelCls =
    "mb-space-xs flex items-center justify-between font-mono text-label-mono-sm font-bold uppercase tracking-widest";

  return (
    <form onSubmit={handleSubmit} className="border border-outline-variant/30 bg-surface-container p-space-lg shadow-acid lg:p-space-xl">
      <div className="mb-space-lg flex items-center justify-between border-b border-outline-variant/40 pb-space-sm">
        <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed">
          &gt; /dispatch --open --priority=HIGH
        </span>
        <span className="font-mono text-label-mono-sm text-outline">FORM:CONTACT</span>
      </div>

      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
        <div>
          <label className={`${labelCls} text-tertiary-fixed-dim`} htmlFor="dispatch-name">
            <span>{"> AGENT NAME"}</span>
            <span className="text-outline-variant">REQ</span>
          </label>
          <input
            id="dispatch-name"
            name="name"
            value={name}
            maxLength={120}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Fable"
            className={inputCls}
            required
          />
          {errors.name && (
            <p className="mt-1 font-mono text-label-mono-sm text-error">{errors.name}</p>
          )}
        </div>

        <div>
          <label className={`${labelCls} text-tertiary-fixed-dim`} htmlFor="dispatch-email">
            <span>{"> RETURN FREQUENCY"}</span>
            <span className="text-outline-variant">REQ</span>
          </label>
          <input
            id="dispatch-email"
            name="email"
            type="email"
            value={email}
            maxLength={254}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputCls}
            required
          />
          {errors.email && (
            <p className="mt-1 font-mono text-label-mono-sm text-error">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="mt-space-md">
        <label className={`${labelCls} text-secondary`} htmlFor="dispatch-project">
          <span>{"> PROJECT VECTOR"}</span>
          <span className="text-outline-variant">REQ</span>
        </label>
        <input
          id="dispatch-project"
          name="project_name"
          value={projectName}
          maxLength={160}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Codename for the thing you want built"
          className={inputCls}
          required
        />
        {errors.project_name && (
          <p className="mt-1 font-mono text-label-mono-sm text-error">{errors.project_name}</p>
        )}
      </div>

      <div className="mt-space-md">
        <span className={`${labelCls} text-secondary`}>
          <span>{"> SCOPE MATRIX // SELECT ALL THAT APPLY"}</span>
          <span className="text-outline-variant">{scopes.length} ACTIVE</span>
        </span>
        <div className="flex flex-wrap gap-space-xs">
          {SCOPES.map((scope) => (
            <button
              key={scope}
              type="button"
              onClick={() => toggleScope(scope)}
              aria-pressed={scopes.includes(scope)}
              className={`border px-space-sm py-1.5 font-mono text-label-mono-sm uppercase tracking-wider transition-all ${
                scopes.includes(scope)
                  ? "border-primary-fixed bg-primary-fixed text-on-primary-fixed shadow-magenta-sm"
                  : "border-outline-variant/50 bg-surface-container-lowest text-on-surface-variant hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim"
              }`}
            >
              [{scope}]
            </button>
          ))}
        </div>
      </div>

      <div className="mt-space-md">
        <label className={`${labelCls} text-secondary`} htmlFor="dispatch-payload">
          <span>{"> TRANSMISSION PAYLOAD"}</span>
          <span className="text-outline-variant">{details.length}/8000</span>
        </label>
        <textarea
          id="dispatch-payload"
          name="architecture_details"
          value={details}
          maxLength={8000}
          rows={7}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={
            "Describe the entity, the constraints, the deadline, and what \"done\" looks like. Links welcome."
          }
          className={`${inputCls} resize-y leading-relaxed`}
          required
        />
        {errors.architecture_details && (
          <p className="mt-1 font-mono text-label-mono-sm text-error">
            {errors.architecture_details}
          </p>
        )}
      </div>

      {message && status === "error" && (
        <div className="mt-space-md border border-error/40 bg-error-container/20 px-space-md py-space-sm font-mono text-label-mono-sm uppercase text-error">
          &gt; {message}
        </div>
      )}

      <div className="mt-space-lg flex flex-wrap items-center justify-between gap-space-md border-t border-outline-variant/40 pt-space-md">
        <span className="font-mono text-label-mono-sm uppercase text-outline-variant">
          PAYLOAD ID: 0xTRANSMIT_FL // AVG RESPONSE: &lt; 24H
        </span>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-primary-container px-space-xl py-space-md text-headline-sm uppercase font-bold tracking-widest text-on-primary-container shadow-cyan transition-all hover:bg-secondary-container hover:text-on-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "[ TRANSMITTING... ]" : "[ TRANSMIT DISPATCH ↗ ]"}
        </button>
      </div>
    </form>
  );
}
