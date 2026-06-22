import { z } from "zod";
import { ReportCategory } from "@prisma/client";

export const CreateReportSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  latitude: z.number(),
  longitude: z.number(),
  category:z.nativeEnum(ReportCategory)
});

export type CreateReportInput = z.infer<typeof CreateReportSchema>;