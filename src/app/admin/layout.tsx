import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";

/**
 * Gates every /admin/* route except /admin/login, which lives outside this
 * branch (see app/(admin-auth)/admin/login) so it stays reachable while signed out.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAdmin()) {
    redirect("/admin/login");
  }
  return <>{children}</>;
}