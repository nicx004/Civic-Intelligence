import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserReport } from "@/lib/reports/report.repository";
import ReportDetails from "@/components/reports/ReportDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReportDetailsPage({
  params,
}: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const { id } = await params;

  const report = await getUserReport(
    id,
    session.user.id,
  );

  if (!report) {
    notFound();
  }

  return (
    <main className="app-shell py-10">
        <ReportDetails report={report} />
    </main>
  );
}