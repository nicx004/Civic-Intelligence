import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Console — Civic Intelligence",
  description: "Municipal operations dashboard for Civic Intelligence.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="px-4 pb-16 pt-6 sm:px-6 md:ml-64 md:px-8 md:pt-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}