import type { ComplaintCategory, ComplaintStatus } from "./types";

export const CATEGORY_LABELS: Record<ComplaintCategory, string> = {
  ROADS: "Roads",
  WATER_SUPPLY: "Water Supply",
  SEWAGE: "Sewage",
  GARBAGE: "Garbage",
  STREET_LIGHTING: "Street Lighting",
  TRAFFIC: "Traffic",
  ILLEGAL_CONSTRUCTION: "Illegal Construction",
  PARKS: "Parks",
  STRAY_ANIMALS: "Stray Animals",
  PUBLIC_SAFETY: "Public Safety",
  OTHER: "Other",
};

export const STATUS_LABELS: Record<ComplaintStatus, string> = {
  PENDING: "Pending",
  VERIFIED: "Verified",
  REJECTED: "Rejected",
  RESOLVED: "Resolved",
};

export function categoryLabel(category: ComplaintCategory | string): string {
  return CATEGORY_LABELS[category as ComplaintCategory] ?? category;
}

export function statusLabel(status: ComplaintStatus | string): string {
  return STATUS_LABELS[status as ComplaintStatus] ?? status;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`;
}

export function formatSimilarity(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatSignedPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-IN");
}
