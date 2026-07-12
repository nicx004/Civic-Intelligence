import * as reportRepository from "../repositories/report.repository";
import { CreateReportInput } from "../validation/report.schema";
import { ApiError } from "../utils/api-error";

export async function createReport(
  data: CreateReportInput,
  userId: string
) {
  const report = await reportRepository.createReport({
    ...data,
    userId,
  });

  void fetch(
  `${process.env.GRAPHRAG_API_URL}/process-report/${report.id}`,
  {
    method: "POST",
  }
)
  .then(async (response) => {
    if (!response.ok) {
      console.error(
        "GraphRAG processing failed:",
        await response.text()
      );
    }
  })
  .catch((error) => {
    console.error("Failed to reach GraphRAG service:", error);
  });

  return report;
}

export async function getAllReports() {
  return reportRepository.getAllReports();
}

export async function getReportById(id: string) {
  const report = await reportRepository.getReportById(id);

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  return report;
}