import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserReports } from "@/lib/reports/report.repository";
import ReportCard from "@/components/reports/ReportCard";

export default async function MyReportsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const reports = await getUserReports(session.user.id);

  return (
    <main className="app-shell py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">
          My Reports
        </h1>

        <p className="mt-2 text-slate-600">
          Track the status of every complaint you've submitted.
        </p>

        <div className="mt-8 space-y-5">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
            />
          ))}
        </div>
      </div>
    </main>
  );
}