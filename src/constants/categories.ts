import { ReportCategory } from "@prisma/client";

export const CATEGORIES = [
  { value: ReportCategory.ROADS, label: "Roads & Potholes" },
  { value: ReportCategory.WATER_SUPPLY, label: "Water Supply" },
  { value: ReportCategory.SEWAGE, label: "Sewage & Drainage" },
  { value: ReportCategory.GARBAGE, label: "Garbage Collection" },
  { value: ReportCategory.STREET_LIGHTING, label: "Street Lighting" },
  { value: ReportCategory.TRAFFIC, label: "Traffic & Signals" },
  { value: ReportCategory.ILLEGAL_CONSTRUCTION, label: "Illegal Construction" },
  { value: ReportCategory.PARKS, label: "Public Parks" },
  { value: ReportCategory.STRAY_ANIMALS, label: "Stray Animals" },
  { value: ReportCategory.PUBLIC_SAFETY, label: "Public Safety" },
  { value: ReportCategory.OTHER, label: "Other" },
] as const;