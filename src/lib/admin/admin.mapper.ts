import { Report } from "@prisma/client";
import { AdminComplaint } from "./types";

export function mapReportToComplaint(report: Report): AdminComplaint {

  const routing = (report.routingExplanation ?? {}) as Record<string, any>;
  const extracted = (report.extractedEntities ?? {}) as Record<string, any>;
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

      matchedAssets:
        routing.matched_assets ?? [],

      matchedIssueTypes:
        routing.matched_issue_types ?? [],

      score:
        report.routingConfidence ?? 0,

      explanation:
        routing.department_name
          ? `Automatically routed to ${routing.department_name} using the knowledge graph.`
          : "No routing explanation available.",
    },

    extracted: {
      assets: extracted.assets ?? [],
      issueTypes: extracted.issue_types ?? [],
      keywords: extracted.keywords ?? [],
    },

    similarComplaints:
      (report.similarComplaintIds ?? []).map((id) => ({
        complaintId: id,
        title: id,
        category: "Unknown",
        similarity: 0,
      })),
  };
}