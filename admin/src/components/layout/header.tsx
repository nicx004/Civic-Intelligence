"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
      <div className="relative mx-auto flex h-24 max-w-7xl items-center pl-2 pr-8">
        {/* ================= Left ================= */}
        <Link href={isAdmin ? "/admin" : "/"} className="flex items-center gap-4">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="National Emblem of India"
            className="h-16 w-auto object-contain"
          />

          <div>
            <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900">
              Civic Intelligence
            </h1>

            <p className="text-xs tracking-wide text-slate-500">
              {isAdmin ? "Municipal Admin Console" : "Citizen Complaint & Civic Services Portal"}
            </p>
          </div>

        </Link>

        {/* ================= Center ================= */}
        {!isAdmin ? (
          <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10">

            <Link
              href="/"
              className="font-medium text-slate-600 transition hover:text-teal-600"
            >
              Home
            </Link>

            <Link
              href="#how-it-works"
              className="font-medium text-slate-600 transition hover:text-teal-600"
            >
              How It Works
            </Link>

            <Link
              href="/track"
              className="font-medium text-slate-600 transition hover:text-teal-600"
            >
              Track Report
            </Link>

            <Link
              href="/about"
              className="font-medium text-slate-600 transition hover:text-teal-600"
            >
              About Us
            </Link>

          </nav>
        ) : null}

        {/* ================= Right ================= */}
        <div className="ml-auto flex items-center gap-4">
          {isAdmin ? (
            <>
              <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Admin
              </span>
              <Link
                href="/"
                className="rounded-xl border border-slate-300 px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Exit to citizen portal
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/api/auth/signin"
                className="rounded-xl border border-slate-300 px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Sign In
              </Link>

              <Link
                href="/report"
                className="rounded-xl bg-teal-600 px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-teal-700"
              >
                Report an Issue
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}