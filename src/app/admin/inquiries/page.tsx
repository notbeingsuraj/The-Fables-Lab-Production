import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { countByStatus, listContacts } from "@/lib/db/contacts";
import { toContactJSON } from "@/lib/db/serialize";
import type { ContactStatus } from "@/lib/db/schema";
import {
  deleteContactAction,
  logoutAction,
  setContactStatusAction,
} from "../actions";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

const STATUS_STYLES: Record<ContactStatus, string> = {
  new: "border-neon-cyan text-neon-cyan bg-neon-cyan/10",
  read: "border-gridline text-off-white/60 bg-charcoal",
  archived: "border-gridline text-off-white/40 bg-charcoal",
};

function StatusPill({ status }: { status: ContactStatus }) {
  return (
    <span
      className={`inline-block px-3 py-1 border font-mono text-[10px] uppercase tracking-widest ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string; page?: string };
}) {
  if (!isAdmin()) {
    redirect("/admin/login");
  }

  const statusParam = searchParams.status ?? "all";
  const status = (["all", "new", "read", "archived"] as const).includes(
    statusParam as "all"
  )
    ? (statusParam as "all" | ContactStatus)
    : "all";

  const q = (searchParams.q ?? "").slice(0, 100);
  const page = Math.max(1, Number(searchParams.page) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [counts, { items, total }] = await Promise.all([
    countByStatus(),
    listContacts({ status, search: q, limit: PAGE_SIZE, skip }),
  ]);

  const contacts = items.map(toContactJSON);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const buildHref = (overrides: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    const next = { status, q, page, ...overrides };
    if (next.status && next.status !== "all") params.set("status", String(next.status));
    if (next.q) params.set("q", String(next.q));
    if (next.page && Number(next.page) > 1) params.set("page", String(next.page));
    const qs = params.toString();
    return `/admin/inquiries${qs ? `?${qs}` : ""}`;
  };

  const filters: { label: string; value: string; count: number }[] = [
    { label: "All", value: "all", count: counts.new + counts.read + counts.archived },
    { label: "New", value: "new", count: counts.new },
    { label: "Read", value: "read", count: counts.read },
    { label: "Archived", value: "archived", count: counts.archived },
  ];

  return (
    <div className="relative w-full min-h-screen bg-charcoal px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-gridline pb-8 mb-10">
          <div>
            <span className="text-neon-cyan font-mono font-bold text-xs tracking-widest uppercase mb-3 block">
              {"// Inbox"}
            </span>
            <h1 className="font-grotesk font-black text-5xl tracking-tighter text-off-white">
              INQUIRIES
              {counts.new > 0 && (
                <span className="ml-4 align-middle px-3 py-1 bg-hot-pink text-charcoal font-mono text-xs font-bold tracking-widest">
                  {counts.new} NEW
                </span>
              )}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/admin/projects/new"
              className="px-5 py-3 border border-gridline font-mono text-xs uppercase tracking-widest text-off-white hover:border-neon-cyan hover:text-neon-cyan transition-colors"
            >
              + New Project
            </Link>
            <Link
              href="/"
              className="px-5 py-3 border border-gridline font-mono text-xs uppercase tracking-widest text-off-white/60 hover:text-off-white transition-colors"
            >
              View Site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-5 py-3 border border-hot-pink font-mono text-xs uppercase tracking-widest text-hot-pink hover:bg-hot-pink hover:text-charcoal transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>

        {/* Filters + search */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <Link
                key={f.value}
                href={buildHref({ status: f.value === "all" ? "all" : f.value, page: 1 })}
                className={`px-4 py-2 border font-mono text-xs uppercase tracking-widest transition-colors ${
                  status === f.value
                    ? "border-off-white bg-off-white text-charcoal"
                    : "border-gridline text-off-white/60 hover:border-off-white hover:text-off-white"
                }`}
              >
                {f.label} ({f.count})
              </Link>
            ))}
          </div>
          <form className="flex gap-2" method="GET">
            <input type="hidden" name="status" value={status} />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search name / email / project"
              className="w-64 bg-navy border border-gridline px-4 py-2 font-mono text-xs tracking-widest text-off-white focus:outline-none focus:border-neon-cyan transition-colors rounded-none placeholder:text-gridline"
            />
            <button
              type="submit"
              className="px-4 py-2 border border-gridline font-mono text-xs uppercase tracking-widest text-off-white hover:border-neon-cyan hover:text-neon-cyan transition-colors"
            >
              Go
            </button>
          </form>
        </div>

        {/* Table */}
        {contacts.length === 0 ? (
          <div className="border border-gridline bg-navy/40 p-16 text-center">
            <span className="text-off-white/50 font-mono tracking-widest uppercase">
              No inquiries found.
            </span>
          </div>
        ) : (
          <div className="border border-gridline overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gridline bg-navy/60">
                  {["Received", "Name", "Email", "Project", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-off-white/50 font-bold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gridline/60 hover:bg-navy/30 transition-colors align-top"
                  >
                    <td className="px-5 py-4 font-mono text-[11px] tracking-widest text-off-white/50 whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs tracking-widest text-off-white whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={`mailto:${c.email}`}
                        className="font-mono text-xs tracking-widest text-neon-cyan hover:underline"
                      >
                        {c.email}
                      </a>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs tracking-widest text-off-white/80">
                      {c.project_name}
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill status={c.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {(["new", "read", "archived"] as const)
                          .filter((s) => s !== c.status)
                          .map((s) => (
                            <form key={s} action={setContactStatusAction.bind(null, c.id, s)}>
                              <button
                                type="submit"
                                className="px-3 py-1.5 border border-gridline font-mono text-[10px] uppercase tracking-widest text-off-white/60 hover:border-neon-cyan hover:text-neon-cyan transition-colors"
                              >
                                {s}
                              </button>
                            </form>
                          ))}
                        <form action={deleteContactAction.bind(null, c.id)}>
                          <button
                            type="submit"
                            className="px-3 py-1.5 border border-gridline font-mono text-[10px] uppercase tracking-widest text-off-white/40 hover:border-hot-pink hover:text-hot-pink transition-colors"
                          >
                            Del
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Expanded detail rows */}
        <div className="mt-8 space-y-4">
          {contacts.map((c) => (
            <details
              key={`d-${c.id}`}
              className="border border-gridline bg-navy/30 p-6 group"
            >
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-off-white/50 hover:text-neon-cyan transition-colors list-none">
                + Details — {c.name} / {c.project_name}
              </summary>
              <p className="mt-5 font-mono text-xs leading-relaxed tracking-widest text-off-white/80 whitespace-pre-wrap">
                {c.architecture_details}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest text-off-white/30">
                <span>id: {c.id}</span>
                <span>source: {c.source}</span>
                <span>received: {c.createdAt}</span>
              </div>
            </details>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4 border-t border-gridline pt-8">
            {page > 1 && (
              <Link
                href={buildHref({ page: page - 1 })}
                className="px-5 py-3 border border-gridline font-mono text-xs uppercase tracking-widest text-off-white hover:border-neon-cyan hover:text-neon-cyan transition-colors"
              >
                Prev
              </Link>
            )}
            <span className="font-mono text-xs tracking-widest text-off-white/50">
              Page {page} / {totalPages} — {total} total
            </span>
            {page < totalPages && (
              <Link
                href={buildHref({ page: page + 1 })}
                className="px-5 py-3 border border-gridline font-mono text-xs uppercase tracking-widest text-off-white hover:border-neon-cyan hover:text-neon-cyan transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}