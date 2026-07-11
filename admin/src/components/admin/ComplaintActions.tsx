"use client";

import { useState } from "react";
import { CheckCircle2, RefreshCw, ShieldAlert, XCircle } from "lucide-react";
import type { ComplaintStatus } from "@/lib/admin/types";
import { mockDepartments } from "@/lib/admin/mock-data";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";

export function ComplaintActions({
  initialStatus,
  currentDepartment,
}: {
  initialStatus: ComplaintStatus;
  currentDepartment: string;
}) {
  const [status, setStatus] = useState<ComplaintStatus>(initialStatus);
  const [department, setDepartment] = useState(currentDepartment);
  const [reassigning, setReassigning] = useState(false);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">Administrative actions</p>
        <StatusBadge status={status} />
      </div>
      <p className="mt-1 text-xs text-slate-500">
        These controls update the on-screen preview only; no backend changes are made.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          className="!min-h-0 !py-2 text-sm"
          onClick={() => setStatus("VERIFIED")}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
          Verify complaint
        </Button>
        <Button
          type="button"
          variant="outline"
          className="!min-h-0 !py-2 text-sm"
          onClick={() => setStatus("RESOLVED")}
        >
          <ShieldAlert className="mr-2 h-4 w-4" aria-hidden="true" />
          Mark as resolved
        </Button>
        <Button
          type="button"
          variant="outline"
          className="!min-h-0 !py-2 text-sm text-rose-600 hover:border-rose-300 hover:bg-rose-50"
          onClick={() => setStatus("REJECTED")}
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
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          <label htmlFor="reassign-department" className="label">
            Reassign to department
          </label>
          <select
            id="reassign-department"
            className="input select"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            {mockDepartments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <p className="field-hint">
            Currently previewing reassignment to <strong>{department}</strong>. This is a UI
            preview only.
          </p>
        </div>
      ) : null}
    </div>
  );
}
