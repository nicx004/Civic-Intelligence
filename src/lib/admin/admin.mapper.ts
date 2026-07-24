import { Report } from "@prisma/client";
import { AdminComplaint } from "./types";

export function mapReportToComplaint(report: Report): AdminComplaint {
  const routing = (report.routingExplanation ?? {}) as Record<string, any>;

  const candidateDepartments =
    (report.candidateDepartments as any[]) ??
    routing.candidate_departments ??
    [];

  const extracted = (report.extractedEntities ?? {}) as Record<string, any>;

  const similar =
    (report.similarComplaints as any[]) ?? [];

  console.log(report.createdAt, typeof report.createdAt);

  return {
    id: report.id,

    title: report.title,
    description: report.description,

    category: report.category,
    status: report.status,

    ward: report.ward,
    locality: report.locality,
    landmark: report.landmark,

    phone: report.phone ?? undefined,

    latitude: report.latitude ?? undefined,
    longitude: report.longitude ?? undefined,

    createdAt:
      report.createdAt instanceof Date
        ? report.createdAt.toISOString()
        : report.createdAt,

    updatedAt:
      report.updatedAt instanceof Date
        ? report.updatedAt.toISOString()
        : report.updatedAt,

    routing: {
      departmentId:
        routing.department_id ??
        report.assignedDepartmentId ??
        "unassigned",

      departmentName:
        routing.department_name ??
        report.assignedDepartmentId ??
        "Unassigned",

      routingSource: "Knowledge Graph",

      matchedAssets: routing.matched_assets ?? [],

      matchedIssueTypes: routing.matched_issue_types ?? [],

      score: report.routingConfidence ?? 0,

      explanation: routing.department_name
        ? `Automatically routed to ${routing.department_name} using the knowledge graph.`
        : "No routing explanation available.",

      candidateDepartments: candidateDepartments.map((dept: any) => ({
        departmentId:
          dept.department_id ??
          dept.departmentId ??
          "",

        departmentName:
          dept.department_name ??
          dept.departmentName ??
          "Unknown Department",

        confidence:
          dept.confidence ?? 0,

        matchedAssets:
          dept.matched_assets ??
          dept.matchedAssets ??
          [],

        matchedIssueTypes:
          dept.matched_issue_types ??
          dept.matchedIssueTypes ??
          [],
      })),
    },

    extracted: {
      assets: extracted.assets ?? [],
      issueTypes: extracted.issue_types ?? [],
      keywords: extracted.keywords ?? [],
    },

    similarComplaints: similar.map((item) => ({
      complaintId: item.complaint_id,
      title: item.title,
      category: item.category,
      similarity: item.similarity,
    })),
  };
}