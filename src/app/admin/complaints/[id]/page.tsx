import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Compass, FileText, MapPin } from "lucide-react";
import { getAdminComplaint, getAdminComplaints, getDepartments } from "@/lib/admin/admin.repository";
import { formatDateTime, categoryLabel } from "@/lib/admin/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { CategoryTag } from "@/components/admin/CategoryTag";
import { RoutingExplanation } from "@/components/admin/RoutingExplanation";
import { ExtractedEntities } from "@/components/admin/ExtractedEntities";
import { SimilarComplaintList } from "@/components/admin/SimilarComplaintList";
import { ComplaintActions } from "@/components/admin/ComplaintActions";


export async function generateStaticParams() {
  const complaints = await getAdminComplaints();

  return complaints.map((complaint) => ({
    id: complaint.id,
  }));
}
export default async function ComplaintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [complaint, complaints, departments] = await Promise.all([
    getAdminComplaint(id),
    getAdminComplaints(),
    getDepartments(),
  ]);

  if (!complaint) {
    notFound();
  }

  const knownIds = complaints.map((item) => item.id);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/complaints"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-slate-500 hover:text-teal-700"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Back to complaints
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs text-slate-400">{complaint.id}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {complaint.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={complaint.status} />
            <CategoryTag category={complaint.category} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Complaint information */}
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <h2 className="text-base font-semibold text-slate-900">Complaint information</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{complaint.description}</p>

            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-4">
              <div>
                <dt className="text-xs font-medium text-slate-500">Category</dt>
                <dd className="mt-0.5 text-sm font-semibold text-slate-900">
                  {categoryLabel(complaint.category)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-500">Status</dt>
                <dd className="mt-0.5 text-sm font-semibold text-slate-900">{complaint.status}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-500">Created</dt>
                <dd className="mt-0.5 text-sm font-semibold text-slate-900">
                  {formatDateTime(complaint.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-500">Updated</dt>
                <dd className="mt-0.5 text-sm font-semibold text-slate-900">
                  {formatDateTime(complaint.updatedAt)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Location */}
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <h2 className="text-base font-semibold text-slate-900">Location</h2>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <dt className="text-xs font-medium text-slate-500">Ward</dt>
                <dd className="mt-0.5 text-sm font-semibold text-slate-900">{complaint.ward}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-slate-500">Locality</dt>
                <dd className="mt-0.5 text-sm font-semibold text-slate-900">{complaint.locality}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-medium text-slate-500">Landmark</dt>
                <dd className="mt-0.5 text-sm font-semibold text-slate-900">{complaint.landmark}</dd>
              </div>
              {complaint.latitude && complaint.longitude ? (
                <div className="col-span-2 sm:col-span-4">
                  <dt className="text-xs font-medium text-slate-500">Coordinates</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-slate-900">
                    {complaint.latitude.toFixed(4)}, {complaint.longitude.toFixed(4)}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          {/* Routing intelligence */}
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <h2 className="text-base font-semibold text-slate-900">Routing intelligence</h2>
            </div>
            <div className="mt-4">
              <RoutingExplanation routing={complaint.routing} />
            </div>
          </div>

          {/* Extracted understanding */}
          <div className="card p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Extracted complaint understanding
            </h2>
            <div className="mt-4">
              <ExtractedEntities entities={complaint.extracted} />
            </div>
          </div>

          {/* Similar complaints */}
          <div className="card p-6">
            <h2 className="text-base font-semibold text-slate-900">Similar historical complaints</h2>
            <p className="mt-1 text-xs text-slate-500">
              Semantically similar complaints retrieved for reference. Similarity does not by
              itself determine routing.
            </p>
            <div className="mt-3">
              <SimilarComplaintList items={complaint.similarComplaints} knownIds={knownIds} />
            </div>
          </div>
        </div>

        {/* Sidebar: actions */}
        <div className="flex flex-col gap-6">
          const departments = await getDepartments();

          <ComplaintActions
              complaintId={complaint.id}
              initialStatus={complaint.status}
              currentDepartmentId={complaint.routing.departmentId}
              departments={departments}
          />
        </div>
      </div>
    </div>
  );
}
