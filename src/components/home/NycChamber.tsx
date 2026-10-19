const NYC_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDy4ApYV5Uy1IBIQuzTeTQo0HRBxILNCkFOcgtzPpUyzeJzIouMxnhkfrnODFoiOOdsnAyQYUVeMY6loo5Dy_Fq5TmtaeF8tSC86BGTXlme_SLFSE5eynBxWE6BVZFRqygp9F1buZRkC6aRp-lfQ2KjEqreFYK8ybDyMv0d_IGn5cWImvJlzNv-tMf-MiivAscLGk0R7r86VLB_Jijux_8RKP40Ln3Kxl9zCPzr5KhCv1Uh-0qiUko";

const SENSORS = [
  { label: "Frequency Band", value: "142.800 MHz", width: "w-3/4", tone: "bg-tertiary-fixed-dim", readout: "text-tertiary-fixed-dim", pulse: true },
  { label: "Subway Vibration Index", value: "3.4 RMS", width: "w-1/2", tone: "bg-secondary", readout: "text-secondary", pulse: false },
  { label: "Neon Grid Voltage", value: "220V STABLE", width: "w-[92%]", tone: "bg-primary-fixed", readout: "text-primary-fixed", pulse: false },
];

const BARCODE_BARS = [
  [0, 3], [5, 6], [14, 2], [18, 8], [29, 4], [36, 2], [42, 6], [52, 10],
  [66, 3], [73, 7], [84, 2], [89, 8], [101, 5], [109, 2], [114, 7], [124, 4],
  [131, 8], [142, 2], [147, 6], [156, 10], [170, 3], [176, 6], [186, 4], [194, 6],
];

/**
 * SECTION 03 — NYC after dark. A camera-feed visual node paired with a sensor
 * diagnostics rail and a tactical hardware serial label. Also reused on /about.
 */
export default function NycChamber({ className = "" }: { className?: string }) {
  return (
    <section
      id="nyc-chamber"
      className={`relative w-full overflow-hidden bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop ${className}`}
    >
      <div className="mb-space-xl flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <div className="mb-space-xs flex items-center gap-space-xs font-mono text-label-mono-sm font-bold uppercase tracking-widest text-secondary">
            <span className="inline-block h-2 w-2 animate-ping bg-secondary" />
            <span>LOCATION TELEMETRY // MANHATTAN DOWNTOWN</span>
          </div>
          <h2 className="font-display text-headline-lg uppercase tracking-tight text-primary">
            NYC AT 02:00 AM // WET ASPHALT &amp; NEON
          </h2>
        </div>
        {/* Subway transit pill */}
        <div className="flex items-center gap-space-sm border border-outline-variant/30 bg-surface-container px-space-md py-space-xs shadow-acid-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal font-display text-body-md text-primary">
            F
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-fixed font-display text-body-md text-on-primary-fixed">
            M
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-label-mono-sm font-bold uppercase text-primary">
              CANAL ST // BROADWAY
            </span>
            <span className="font-mono text-label-mono-sm uppercase text-outline">
              STATION ACCESS CODE: 0xNYC
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-space-lg lg:grid-cols-12">
        {/* Main visual showcase node */}
        <div className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden border border-outline-variant/30 bg-surface-container p-space-lg lg:col-span-8 lg:min-h-[500px]">
          <div
            role="img"
            aria-label="Cinematic night photograph of New York City Canal Street at 2:00 AM in heavy rain, with neon reflections in acid green, magenta and cyan."
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${NYC_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="border border-tertiary-fixed-dim/40 bg-surface-container-lowest/90 px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-widest text-tertiary-fixed-dim backdrop-blur-md">
              [CAM_FEED 04 // LIVE_STREET_LOG]
            </span>
            <span className="bg-secondary-container px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-wider text-on-secondary shadow-[2px_2px_0px_0px_#000]">
              PRECIPITATION: 88%
            </span>
          </div>

          <div className="relative z-10 max-w-xl space-y-space-xs">
            <div className="flex items-center gap-space-xs font-mono text-label-mono-sm text-primary-fixed">
              <span className="text-[16px] leading-none">◍</span>
              <span>HUMIDITY: 94% // AMBIENT SOUNDSCAPE: ACTIVE</span>
            </div>
            <h3 className="font-display text-headline-md uppercase text-primary">
              WHERE STORIES INCUBATE UNDER ACID LIGHT
            </h3>
            <p className="text-body-sm leading-relaxed text-on-surface-variant">
              Our physical laboratory operates on night shifts. When the city
              sleeps, our high-bandwidth renders bake, generative fables
              synthesize, and analog mechanical keyboards trigger experimental
              prototypes.
            </p>
          </div>
        </div>

        {/* Right telemetry diagnostics rail */}
        <div className="flex flex-col justify-between space-y-space-lg border border-outline-variant/30 bg-surface-container-low p-space-lg lg:col-span-4">
          <div>
            <div className="mb-space-md flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed">
                [SENSOR SUITE 02]
              </span>
              <span className="font-mono text-label-mono-sm text-outline">NODE: MANHATTAN_04</span>
            </div>
            <div className="space-y-space-md">
              {SENSORS.map((sensor) => (
                <div key={sensor.label}>
                  <div className="mb-1 flex justify-between font-mono text-label-mono-sm">
                    <span className="uppercase text-outline">{sensor.label}</span>
                    <span className={`tabular-nums ${sensor.readout}`}>{sensor.value}</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest">
                    <div
                      className={`h-full ${sensor.tone} ${sensor.width} ${sensor.pulse ? "animate-pulse" : ""}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industrial barcode & serial label */}
          <div className="space-y-space-sm border border-outline-variant/30 bg-surface-container-lowest p-space-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-label-mono-sm font-bold uppercase text-on-surface">
                TACTICAL HARDWARE KEY
              </span>
              <span className="font-mono text-label-mono-sm text-primary-fixed">VERIFIED</span>
            </div>
            <svg className="h-10 w-full text-primary" fill="currentColor" viewBox="0 0 200 40" aria-hidden>
              {BARCODE_BARS.map(([x, w]) => (
                <rect key={x} x={x} y={0} width={w} height={40} />
              ))}
            </svg>
            <div className="flex justify-between font-mono text-label-mono-sm text-outline">
              <span>* FL-NYC-2025-001 *</span>
              <span>CHIP ID: 9481-B</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
