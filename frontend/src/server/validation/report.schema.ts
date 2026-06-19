import { z } from "zod";

export const CreateReportSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  latitude: z.number(),
  longitude: z.number(),
  categoryId: z.string(),
});

export type CreateReportInput = z.infer<typeof CreateReportSchema>;