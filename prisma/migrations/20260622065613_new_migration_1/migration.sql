/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReportCategory" AS ENUM ('ROADS', 'WATER_SUPPLY', 'SEWAGE', 'GARBAGE', 'STREET_LIGHTING', 'TRAFFIC', 'ILLEGAL_CONSTRUCTION', 'PARKS', 'STRAY_ANIMALS', 'PUBLIC_SAFETY', 'OTHER');

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_categoryId_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "categoryId",
ADD COLUMN     "category" "ReportCategory" NOT NULL;

-- DropTable
DROP TABLE "Category";
