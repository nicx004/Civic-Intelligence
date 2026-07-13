"use client";

import { useState } from "react";
import { CheckCircle2, RefreshCw, ShieldAlert, XCircle } from "lucide-react";
import type { ComplaintStatus } from "@/lib/admin/types";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import {
  verifyComplaint,
  rejectComplaint,
  resolveComplaint,
  moveComplaint,
} from "@/app/admin/actions";

import { useRouter } from "next/navigation";


export function ComplaintActions({
  
  complaintId,
  initialStatus,
  currentDepartmentId,
  departments,
}: {
  
  complaintId: string;
  initialStatus: ComplaintStatus;
  currentDepartmentId: string;
  departments: { id: string; name: string }[];
}){
  const router = useRouter();
  const [reassigning, setReassigning] = useState(false);
  const [department, setDepartment] = useState(currentDepartmentId);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">Administrative actions</p>
        <StatusBadge status={initialStatus} />
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Administrative actions are applied immediately and persisted to the database.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          className="!min-h-0 !py-2 text-sm"
          onClick={async () => {
            await verifyComplaint(complaintId);
            router.refresh();
          }}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
          Verify complaint
        </Button>
        <Button
          type="button"
          variant="outline"
          className="!min-h-0 !py-2 text-sm"
          onClick={async () => {
            await resolveComplaint(complaintId);
            router.refresh();
          }}
        >
          <ShieldAlert className="mr-2 h-4 w-4" aria-hidden="true" />
          Mark as resolved
        </Button>
        <Button
          type="button"
          variant="outline"
          className="!min-h-0 !py-2 text-sm text-rose-600 hover:border-rose-300 hover:bg-rose-50"
          onClick={async () => {
            await rejectComplaint(complaintId);
            router.refresh();
          }}
        >
          <XCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          Reject complaint
        </Button>
        <Button
          type="button"
          variant="outline"
          className="!min-h-0 !py-2 text-sm"
          onClick={() => setReassigning((value) => !value)}
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Reassign department
        </Button>
      </div>

      {reassigning ? (
        <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
          <label htmlFor="reassign-department" className="label">
            Reassign to department
          </label>

          <select
            id="reassign-department"
            className="input select"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          <Button
            type="button"
            onClick={async () => {
              await moveComplaint(complaintId, department);
              router.refresh();
              setReassigning(false);
            }}
          >
            Apply Reassignment
          </Button>
        </div>
      ) : null}
    </div>
  );
}
