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
    console.log("ADMIN LAYOUT LOADED");

    return (
      <div className="min-h-screen bg-red-200">
        <h1 className="text-4xl font-bold">ADMIN LAYOUT</h1>

        <AdminSidebar />

        <main className="px-4 pb-16 pt-6 sm:px-6 md:ml-64 md:px-8 md:pt-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    );
}