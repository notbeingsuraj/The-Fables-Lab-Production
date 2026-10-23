"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

interface FormData {
  name: string;
  email: string;
  company: string;
  services: string[];
  budget: string;
  brief: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  company?: string;
  brief?: string;
  services?: string;
}

const BUDGET_OPTIONS = [
  { label: "Under $5,000", value: "under-5k" },
  { label: "$5,000 – $15,000", value: "5k-15k" },
  { label: "$15,000 – $50,000", value: "15k-50k" },
  { label: "$50,000 – $100,000", value: "50k-100k" },
  { label: "$100,000+", value: "100k-plus" },
  { label: "Not sure yet", value: "unsure" },
] as const;

export default function ProjectInquiry() {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    services: [],
    budget: "",
    brief: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = status === "sending";

  const updateField = (key: keyof FormData, value: string | string[]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof FieldErrors];
        return next;
      });
    }
  };

  const toggleService = (serviceId: string) => {
    setData((prev) => {
      const next = prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId];
      return { ...prev, services: next };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.services;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    setErrors({});

    const nextErrors: FieldErrors = {};
    if (!data.name.trim()) nextErrors.name = "Name is required.";
    if (!data.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!data.company.trim()) nextErrors.company = "Company or project name is required.";
    if (data.services.length === 0) nextErrors.services = "Select at least one service.";
    if (!data.brief.trim()) nextErrors.brief = "Tell us about the project.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          project_name: data.company.trim(),
          architecture_details: `SERVICES: ${data.services.join(", ")}\nBUDGET: ${data.budget || "Not specified"}\n\nBRIEF:\n${data.brief.trim()}`,
        }),
      });
      const body = await res.json();

      if (res.ok && body.success) {
        setStatus("sent");
        setMessage(
          "Transmission received. The lab responds within 24 operational hours.",
        );
        setSubmissionId(body.id || null);
        formRef.current?.reset();
        setData({
          name: "",
          email: "",
          company: "",
          services: [],
          budget: "",
          brief: "",
        });
      } else {
        setStatus("error");
        setErrors(body.fields || {});
        setMessage(body.error || "Signal lost. Please retry the transmission.");
      }
    } catch {
      setStatus("error");
      setMessage("Uplink unavailable. Check your connection and retry.");
    }
  };

  const inputClass =
    "w-full border border-outline-variant/50 bg-surface-low px-3 py-2 text-sm font-mono text-on-surface placeholder:text-on-surface-muted focus:border-bronze focus:outline-none transition-colors rounded-sm";
  const labelClass =
    "mb-1.5 block text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted";

  if (status === "sent") {
    return (
      <section
        id="inquiry"
        className="w-full bg-surface py-section lg:py-[8rem] px-4 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bronze bg-bronze text-xs font-mono font-bold text-surface mb-6"
          >
            ✓
          </div>
          <h2 className="mb-4 font-display text-[clamp(2rem,5vw,3rem)] leading-[1.05] tracking-tight text-on-surface">
            Transmission received
          </h2>
          <p className="mb-8 text-body-md text-on-surface-variant leading-relaxed">
            {message}
            {submissionId && (
              <span className="block mt-2 text-xs font-mono text-on-surface-muted">
                Reference: {submissionId}
              </span>
            )}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-outline-variant/50 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:border-bronze hover:text-bronze transition-colors"
          >
            Explore capabilities
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="inquiry"
      className="w-full bg-background py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 items-start">
          <div className="lg:col-span-5">
            <span className="inline-block mb-4 px-3 py-1 border border-bronze/30 bg-bronze/10 text-xs font-mono font-bold uppercase tracking-wider text-bronze">
              Project inquiry
            </span>
            <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface">
              Have a problem worth building for
            </h2>
            <p className="mb-8 text-body-md text-on-surface-variant leading-relaxed max-w-xs">
              Tell us what you are working on. We will help define the right
              digital solution.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-sm text-on-surface-variant">
                  Fixed-bid sprints — no open-ended hourly meters
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-sm text-on-surface-variant">
                  Response within 24 operational hours
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} htmlFor="inq-name">
                    Name
                    <span className="text-bronze/50">Required</span>
                  </label>
                  <input
                    id="inq-name"
                    value={data.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Ada Fable"
                    className={inputClass}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-bronze-dim">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass} htmlFor="inq-email">
                    Work email
                    <span className="text-bronze/50">Required</span>
                  </label>
                  <input
                    id="inq-email"
                    type="email"
                    value={data.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="you@company.com"
                    className={inputClass}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-bronze-dim">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="inq-company">
                  Company or project name
                  <span className="text-bronze/50">Required</span>
                </label>
                <input
                  id="inq-company"
                  value={data.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder="Codename for the thing you want built"
                  className={inputClass}
                  disabled={isSubmitting}
                />
                {errors.company && (
                  <p className="mt-1 text-[11px] text-bronze-dim">{errors.company}</p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="inq-services">
                  Services required
                  <span className="text-bronze/50">Required</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      role="checkbox"
                      aria-checked={data.services.includes(service.id)}
                      onClick={() => toggleService(service.id)}
                      className={`flex items-center gap-2 border rounded-sm px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                        data.services.includes(service.id)
                          ? "border-bronze bg-bronze text-surface shadow-soft"
                          : "border-outline-variant/50 bg-surface-low text-on-surface-variant hover:border-bronze/50 hover:text-bronze"
                      }`}
                    >
                      {service.number}. {service.title}
                    </button>
                  ))}
                </div>
                {errors.services && (
                  <p className="mt-1 text-[11px] text-bronze-dim">{errors.services}</p>
                )}
              </div>

              <div>
                <label className={labelClass} htmlFor="inq-budget">
                  Project budget (optional)
                </label>
                <select
                  id="inq-budget"
                  value={data.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                  disabled={isSubmitting}
                >
                  <option value="">Select a range</option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="inq-brief">
                  Project brief
                  <span className="text-bronze/50">Required</span>
                </label>
                <textarea
                  id="inq-brief"
                  value={data.brief}
                  onChange={(e) => updateField("brief", e.target.value)}
                  rows={6}
                  placeholder="Describe the problem, the constraints, the deadline, and what done looks like."
                  className={`${inputClass} h-32 resize-y leading-relaxed`}
                  disabled={isSubmitting}
                />
                {errors.brief && (
                  <p className="mt-1 text-[11px] text-bronze-dim">{errors.brief}</p>
                )}
              </div>

              {message && status === "error" && (
                <div className="border border-bronze/30 bg-bronze/5 p-3 text-[11px] uppercase font-mono text-bronze-dim">
                  &gt; {message}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 border text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    isSubmitting
                      ? "border-outline-variant/40 bg-surface-low text-on-surface-muted"
                      : "border-bronze bg-bronze text-surface hover:bg-bronze-hover"
                  }`}
                >
                  {isSubmitting ? "Transmitting" : "Start a Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
