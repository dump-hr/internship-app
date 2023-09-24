/*
  Warnings:

  - You are about to drop the column `hasInterviewRight` on the `Intern` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `InterviewSlot` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "InterviewStatus" ADD VALUE 'NoRight';
ALTER TYPE "InterviewStatus" ADD VALUE 'PickTerm';

-- AlterEnum
ALTER TYPE "TestStatus" ADD VALUE 'PickTerm';
COMMIT;

-- AlterTable
ALTER TABLE "Intern" DROP COLUMN "hasInterviewRight",
ADD COLUMN     "interviewStatus" "InterviewStatus" NOT NULL DEFAULT 'NoRight';

-- AlterTable
ALTER TABLE "InterviewSlot" DROP COLUMN "status";
