// Frontend-only admin types.
// Mirrors the Prisma schema (ReportCategory / ReportStatus) and the future
// GraphRAG routing/retrieval response shapes, without importing @prisma/client
// so this module has zero backend dependencies.

export type ComplaintCategory =
  | "ROADS"
  | "WATER_SUPPLY"
  | "SEWAGE"
  | "GARBAGE"
  | "STREET_LIGHTING"
  | "TRAFFIC"
  | "ILLEGAL_CONSTRUCTION"
  | "PARKS"
  | "STRAY_ANIMALS"
  | "PUBLIC_SAFETY"
  | "OTHER";

export type ComplaintStatus = "PENDING" | "VERIFIED" | "REJECTED" | "RESOLVED";

export interface CandidateDepartment {
    departmentId: string;
    departmentName: string;
    confidence: number;

    matchedAssets: string[];
    matchedIssueTypes: string[];
}
export interface RoutingResult {
  departmentId: string;
  departmentName: string;
  routingSource: "Knowledge Graph" | "Manual Reassignment";
  matchedAssets: string[];
  matchedIssueTypes: string[];
  score: number;
  explanation: string;

  candidateDepartments: CandidateDepartment[];
}

export interface ExtractedEntities {
  assets: string[];
  issueTypes: string[];
  keywords: string[];
}

export interface SimilarComplaint {
  complaintId: string;
  title: string;
  category: string;
  status?: ComplaintStatus;
  similarity: number; // 0-1
}

export interface AdminComplaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  ward: string;
  locality: string;
  landmark: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
  routing: RoutingResult;
  extracted: ExtractedEntities;
  similarComplaints: SimilarComplaint[];
}

export interface Department {
  id: string;
  name: string;
  activeComplaints: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  resolutionRate: number; // percent, 0-100
  categoriesHandled: string[];
  assetsHandled: string[];
  issueTypesHandled: string[];
}
