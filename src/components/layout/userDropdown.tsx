"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Props = {
  name: string;
  email: string;
  image?: string | null;
  logout: () => Promise<void>;
};

export default function UserDropdown({
  name,
  email,
  image,
  logout,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open user menu"
        aria-expanded={open}
        className="rounded-full transition hover:opacity-90"
      >
        <img
          src={image ?? "/default-avatar.png"}
          alt={name}
          className="h-11 w-11 rounded-full border border-slate-300"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

            {/* Profile */}
            <div className="flex items-center gap-3 border-b p-4">
            <img
                src={image ?? "/default-avatar.png"}
                alt={name}
                className="h-12 w-12 rounded-full border"
            />

            <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">
                {name}
                </p>

                <p className="truncate text-sm text-slate-500">
                {email}
                </p>
            </div>
            </div>

            {/* Menu */}
            <div className="py-2">

            <Link
                href="/my-reports"
                className="block px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                >
                My Reports
            </Link>

            <div classname = "my-2 border-t border-slate-200"></div>

            <form
                action={async () => {
                    setOpen(false);
                    await logout();
                }}
            >
                <button
                    type="submit"
                    className="block w-full px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                >
                    Sign Out
                </button>
            </form>
            </div>

        </div>
        )}
    </div>
  );
}