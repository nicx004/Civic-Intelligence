import { prisma } from "@/lib/prisma";
import { mapReportToComplaint } from "./admin.mapper";
import type { AdminComplaint } from "./types";
import { getOntologyDepartments } from "@/lib/graphrag/client";
import type { Department } from "./types";
import { revalidatePath } from "next/cache";

export async function getAdminComplaints(): Promise<AdminComplaint[]> {
  const reports = await prisma.report.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return reports.map(mapReportToComplaint);
}

export async function getAdminComplaint(
  id: string
): Promise<AdminComplaint | null> {
  const report = await prisma.report.findUnique({
    where: {
      id,
    },
  });

  return report ? mapReportToComplaint(report) : null;
}

export async function getDashboardData() {
  const reports = await prisma.report.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const complaints = reports.map(mapReportToComplaint);

  const dashboardMetrics = {
    totalComplaints: reports.length,
    totalComplaintsChangePct: 0,

    pendingComplaints: reports.filter(
      (r) => r.status === "PENDING"
    ).length,
    pendingComplaintsChangePct: 0,

    verifiedComplaints: reports.filter(
      (r) => r.status === "VERIFIED"
    ).length,
    verifiedComplaintsChangePct: 0,

    resolvedComplaints: reports.filter(
      (r) => r.status === "RESOLVED"
    ).length,
    resolvedComplaintsChangePct: 0,
  };

  const departmentMap = new Map<string, number>();

  for (const report of reports) {
    if (report.status === "RESOLVED") continue;

    const department =
      report.assignedDepartmentId ?? "Unassigned";

    departmentMap.set(
      department,
      (departmentMap.get(department) ?? 0) + 1
    );
  }

  const departmentWorkload = [...departmentMap.entries()]
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const categoryMap = new Map<string, number>();

  for (const report of reports) {
    categoryMap.set(
      report.category,
      (categoryMap.get(report.category) ?? 0) + 1
    );
  }

  const categoryDistribution = [...categoryMap.entries()].map(
    ([label, value]) => ({
      label,
      value,
    })
  );

  return {
    complaints,
    dashboardMetrics,
    departmentWorkload,
    categoryDistribution,
  };
}
export async function getDepartments(): Promise<Department[]> {
  const [ontologyDepartments, reports] = await Promise.all([
    getOntologyDepartments(),
    prisma.report.findMany(),
  ]);

  return ontologyDepartments.map((department) => {
    const departmentReports = reports.filter(
      (report) => report.assignedDepartmentId === department.id
    );

    const pendingComplaints = departmentReports.filter(
      (r) => r.status === "PENDING"
    ).length;

    const activeComplaints = departmentReports.filter(
      (r) => r.status === "VERIFIED"
    ).length;

    const resolvedComplaints = departmentReports.filter(
      (r) => r.status === "RESOLVED"
    ).length;

    const resolutionRate =
      departmentReports.length === 0
        ? 0
        : Math.round(
            (resolvedComplaints / departmentReports.length) * 100
          );

    return {
      id: department.id,
      name: department.name,

      pendingComplaints,
      activeComplaints,
      resolvedComplaints,
      resolutionRate,

      categoriesHandled: [],
      assetsHandled: department.assets,
      issueTypesHandled: department.issue_types,
    };
  });
}
export async function getDepartment(id: string) {
  const departments = await getDepartments();

  const department = departments.find((d) => d.id === id);

  if (!department) {
    return null;
  }

  const reports = await prisma.report.findMany({
    where: {
      assignedDepartmentId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const complaints = reports.map(mapReportToComplaint);

  return {
    department,
    complaints,
  };
}
export async function getAnalytics() {
  const [reports, departments] = await Promise.all([
    prisma.report.findMany({
      orderBy: {
        createdAt: "asc",
      },
    }),
    getDepartments(),
  ]);

  const resolvedReports = reports.filter(
    (r) => r.status === "RESOLVED"
  );

  const resolutionRate =
    reports.length === 0
      ? 0
      : (resolvedReports.length / reports.length) * 100;

  const analyticsSummary = {
    avgResolutionDays: 0,
    avgResolutionDaysChangePct: 0,
    resolutionRatePct: resolutionRate,
    resolutionRatePctChangePct: 0,
  };

  const categoryMap = new Map<string, number>();

  for (const report of reports) {
    categoryMap.set(
      report.category,
      (categoryMap.get(report.category) ?? 0) + 1
    );
  }

  const categoryDistribution = [...categoryMap.entries()].map(
    ([label, value]) => ({
      label,
      value,
    })
  );

  const departmentLoad = departments.map((department) => ({
    label: department.name,
    value:
      department.pendingComplaints +
      department.activeComplaints,
  }));

  const statusMap = new Map<string, number>();

  for (const report of reports) {
    statusMap.set(
      report.status,
      (statusMap.get(report.status) ?? 0) + 1
    );
  }

  const statusDistribution = [...statusMap.entries()].map(
    ([label, value]) => ({
      label,
      value,
    })
  );

  const localityMap = new Map<string, number>();

  for (const report of reports) {
    localityMap.set(
      report.locality,
      (localityMap.get(report.locality) ?? 0) + 1
    );
  }

  const topLocalities = [...localityMap.entries()]
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return {
    analyticsSummary,
    categoryDistribution,
    departmentLoad,
    statusDistribution,
    topLocalities,

    complaintsOverTime: [],
  };
}
export async function updateComplaintStatus(
  id: string,
  status: "PENDING" | "VERIFIED" | "REJECTED" | "RESOLVED"
) {
  await prisma.report.update({
    where: { id },
    data: { status },
  });

}

export async function reassignComplaint(
  id: string,
  departmentId: string
) {
  await prisma.report.update({
    where: { id },
    data: {
      assignedDepartmentId: departmentId,
    },
  });

}