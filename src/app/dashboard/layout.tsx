"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TOKEN_STORAGE_KEY } from "../../lib/auth";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/users", label: "Kelola Data User" },
  { href: "/dashboard/challanges", label: "Kelola Data Challenges" },
  { href: "/dashboard/habits", label: "Kelola Data Habits" },
  { href: "/dashboard/reports", label: "Report Agregat" },
] as const;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      router.replace("/");
      return;
    }
    setChecking(false);
  }, [router]);

  const activeLabel = useMemo(() => {
    const m = NAV.find((n) => pathname === n.href);
    return m?.label ?? "Dashboard";
  }, [pathname]);

  function signOut() {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    router.replace("/");
  }

  function NavLink({ href, label }: { href: string; label: string }) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setSidebarOpen(false)}
        className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
          isActive
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
        }`}
      >
        {label}
      </Link>
    );
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <span className="text-sm font-medium text-slate-500">
          Menyiapkan dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white px-6 py-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-base font-bold text-indigo-600">Mindsphere</div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600"
              >
                Tutup
              </button>
            </div>
            <nav className="space-y-2">
              {NAV.map((n) => (
                <NavLink key={n.href} href={n.href} label={n.label} />
              ))}
            </nav>
            <div className="mt-8">
              <button
                type="button"
                onClick={signOut}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Keluar
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-72 flex-shrink-0 flex-col justify-between border-r border-slate-200 bg-white/80 px-6 py-8 shadow-md lg:flex">
        <div className="space-y-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
              Mindsphere
            </div>
            <div className="mt-1 text-xl font-bold text-[#0F172A]">Admin</div>
          </div>

          <nav className="space-y-2">
            {NAV.map((n) => (
              <NavLink key={n.href} href={n.href} label={n.label} />
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
            Butuh bantuan? Lihat pusat bantuan.
          </div>
          <button
            type="button"
            onClick={signOut}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        {/* Full-bleed white header */}
        <header className="-mx-4 mb-8 sm:-mx-6 md:-mx-8 lg:-mx-10">
          <div className="flex items-center justify-between bg-white px-4 py-4 shadow-sm sm:px-6 md:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 lg:hidden"
              >
                Menu
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">
                  {activeLabel}
                </h1>
                <p className="mt-1 text-xs text-slate-500">Panel admin Mindsphere</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="search"
                placeholder="Cari..."
                className="hidden w-56 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-100 sm:block"
              />
              <button className="rounded-xl bg-primary-gradient px-4 py-2 text-sm font-semibold text-white shadow-sm">
                Aksi Cepat
              </button>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
