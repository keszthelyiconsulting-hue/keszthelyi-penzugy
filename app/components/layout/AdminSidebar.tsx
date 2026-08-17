"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="min-h-screen w-64 bg-[#111111] p-6 text-white">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C2A56A]">
          Keszthelyi
        </p>
        <h2 className="mt-2 text-xl font-semibold">
          Admin
        </h2>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/admin"
          className="rounded-lg px-4 py-3 transition hover:bg-white/10"
        >
          Ingatlanok
        </Link>

        <Link
          href="/admin/banks"
          className="rounded-lg px-4 py-3 transition hover:bg-white/10"
        >
          Bankok
        </Link>

        <Link
          href="/admin/bank-products"
          className="rounded-lg px-4 py-3 transition hover:bg-white/10"
        >
          Banki termékek
        </Link>

        <Link
          href="/admin/partners"
          className="rounded-lg px-4 py-3 transition hover:bg-white/10"
        >
          Partnerek
        </Link>

        <Link
          href="/admin/marketing"
          className="rounded-lg px-4 py-3 transition hover:bg-white/10"
        >
          Marketing
        </Link>
      </nav>
    </aside>
  );
}