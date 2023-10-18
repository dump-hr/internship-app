/*
  Warnings:

  - You are about to drop the column `notes` on the `InterviewSlot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Intern" ADD COLUMN     "notes" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "InterviewSlot" DROP COLUMN "notes";
