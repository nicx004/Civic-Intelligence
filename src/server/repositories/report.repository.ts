import { prisma } from "@/lib/prisma";
import { CreateReportInput } from "../validation/report.schema";

export async function createReport(
  data: CreateReportInput & { userId: string }
) {
  console.log("REPOSITORY DATA:", data);

  return prisma.report.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,

      ward: data.ward,
      locality: data.locality,
      landmark: data.landmark,
      phone: data.phone,

      latitude: data.latitude,
      longitude: data.longitude,

      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
}

export async function getAllReports() {
  return prisma.report.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getReportById(id: string) {
  return prisma.report.findUnique({
    where: {
      id,
    },
  });
}