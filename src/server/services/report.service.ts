import * as reportRepository from "../repositories/report.repository";
import { CreateReportInput } from "../validation/report.schema";
import { ApiError } from "../utils/api-error";

export async function createReport(
  data: CreateReportInput,
  userId: string
) {
  // Future business logic will go here

  return reportRepository.createReport({
    ...data,
    userId,
  });
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