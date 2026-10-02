import { redirect } from "next/navigation";
import { isAdmin, adminPasswordConfigured } from "@/lib/admin-auth";
import { loginAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (isAdmin()) {
    redirect("/admin/inquiries");
  }

  const notConfigured = !adminPasswordConfigured();

  return (
    <div className="relative w-full bg-charcoal min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gridline bg-charcoal/90 p-10">
        <span className="text-neon-cyan font-mono font-bold text-xs tracking-widest uppercase mb-4 block">
          {"// Restricted Terminal"}
        </span>
        <h1 className="font-grotesk font-black text-4xl tracking-tighter text-off-white mb-2">
          ADMIN ACCESS
        </h1>
        <p className="text-off-white/50 font-mono text-xs tracking-widest uppercase mb-8">
          Authenticate to view inquiries
        </p>

        {notConfigured && (
          <div className="mb-6 p-4 bg-hot-pink/10 border border-hot-pink text-hot-pink font-mono text-xs tracking-widest">
            ADMIN_PASSWORD is not set. Add it to .env.local.
          </div>
        )}
        {searchParams.error && !notConfigured && (
          <div className="mb-6 p-4 bg-hot-pink/10 border border-hot-pink text-hot-pink font-mono text-xs tracking-widest text-center">
            Incorrect password.
          </div>
        )}

        <form action={loginAction} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-off-white/50 font-mono text-xs font-bold uppercase tracking-widest px-2 block"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={notConfigured}
              className="w-full bg-navy border border-gridline px-6 py-4 font-mono text-sm tracking-widest text-off-white focus:outline-none focus:border-neon-cyan transition-colors rounded-none disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={notConfigured}
            className="w-full py-4 bg-cyber-yellow text-charcoal font-mono font-bold uppercase tracking-widest text-sm hover:glow-yellow transition-all border border-gridline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}