/** Route-level suspense while the case file is fetched from the database. */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-space-md bg-surface-container-lowest px-space-md pt-14">
      <span className="font-display text-headline-lg uppercase tracking-tight text-surface-container-highest">
        FABLES
      </span>
      <span className="font-mono text-label-mono-md uppercase tracking-widest text-outline animate-pulse">
        {"// RETRIEVING CASE FILE..."}
      </span>
      <div className="h-1 w-48 overflow-hidden bg-surface-container-high">
        <div className="h-full w-1/3 animate-[marquee_1.2s_linear_infinite] bg-primary-fixed" />
      </div>
    </div>
  );
}
