import { Clock3, TrendingUp } from "lucide-react";
import { BarChart } from "@/components/admin/BarChart";
import { TrendChart } from "@/components/admin/TrendChart";
import { formatSignedPercent } from "@/lib/admin/format";
import { getAnalytics } from "@/lib/admin/admin.repository";

export default async function AnalyticsPage() {
  const { analyticsSummary, categoryDistribution, complaintsOverTime, departmentLoad, statusDistribution, topLocalities } = await getAnalytics();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">
          Civic operations trends across the last six months
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock3 className="h-4 w-4" aria-hidden="true" />
            <p className="text-sm font-medium">Average resolution time</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {analyticsSummary.avgResolutionDays.toFixed(1)} days
          </p>
          <p className="mt-1 text-xs font-semibold text-emerald-600">
            {formatSignedPercent(analyticsSummary.avgResolutionDaysChangePct)}{" "}
            <span className="font-normal text-slate-400">vs previous quarter</span>
          </p>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-2 text-slate-500">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            <p className="text-sm font-medium">Overall resolution rate</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {analyticsSummary.resolutionRatePct.toFixed(1)}%
          </p>
          <p className="mt-1 text-xs font-semibold text-emerald-600">
            {formatSignedPercent(analyticsSummary.resolutionRatePctChangePct)}{" "}
            <span className="font-normal text-slate-400">vs previous quarter</span>
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-semibold text-slate-900">Complaints over time</h2>
        <p className="mt-1 text-xs text-slate-500">Submitted versus resolved, last 6 months</p>
        <div className="mt-5">
          <TrendChart data={complaintsOverTime} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900">Complaints by category</h2>
          <div className="mt-5">
            <BarChart data={categoryDistribution} />
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900">Complaints by department</h2>
          <div className="mt-5">
            <BarChart data={departmentLoad} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900">Status distribution</h2>
          <div className="mt-5">
            <BarChart data={statusDistribution} />
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900">Highest complaint volume localities</h2>
          <div className="mt-5">
            <BarChart data={topLocalities} />
          </div>
        </div>
      </div>
    </div>
  );
}
