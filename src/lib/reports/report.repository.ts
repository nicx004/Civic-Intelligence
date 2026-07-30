import { prisma } from "@/lib/prisma";

export async function getUserReports(userId: string) {
  return prisma.report.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserReport(
  reportId: string,
  userId: string,
) {
  return prisma.report.findFirst({
    where: {
      id: reportId,
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      category: true,
      ward: true,
      locality: true,
      landmark: true,
      createdAt: true,
      updatedAt: true,
      graphStatus: true,
      assignedDepartmentId: true,
      images: true,
    },
  });
}