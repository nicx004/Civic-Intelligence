import { z } from "zod";
import { ReportCategory } from "@prisma/client";

export const CreateReportSchema = z.object({
  title: z.string().min(5).max(100),

  description: z.string().min(20).max(1000),

  category: z.nativeEnum(ReportCategory),

  ward: z.string().min(1),
  locality: z.string().min(1),
  landmark: z.string().min(1),

  phone: z.string().optional().nullable(),

  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});

export type CreateReportInput = z.infer<typeof CreateReportSchema>;