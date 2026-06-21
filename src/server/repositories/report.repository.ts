import { prisma } from "@/lib/prisma";
import { CreateReportInput } from "../validation/report.schema";

export async function createReport(
  data: CreateReportInput & { userId: string }
) {
  return prisma.report.create({
    data,
  });
}