-- CreateEnum
CREATE TYPE "GraphStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "assignedDepartmentId" TEXT,
ADD COLUMN     "extractedEntities" JSONB,
ADD COLUMN     "graphStatus" "GraphStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "matchedOntologyNodes" JSONB,
ADD COLUMN     "normalizedEntities" JSONB,
ADD COLUMN     "processedAt" TIMESTAMP(3),
ADD COLUMN     "routingConfidence" INTEGER,
ADD COLUMN     "routingExplanation" JSONB,
ADD COLUMN     "similarComplaintIds" TEXT[];
