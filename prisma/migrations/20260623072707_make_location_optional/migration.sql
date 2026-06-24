/*
  Warnings:

  - Added the required column `landmark` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ward` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "landmark" TEXT NOT NULL,
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "ward" TEXT NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
