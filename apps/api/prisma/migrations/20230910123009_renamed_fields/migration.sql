/*
  Warnings:

  - You are about to drop the `_InterviewSlotToInterviewer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InterviewSlotToInterviewer" DROP CONSTRAINT "_InterviewSlotToInterviewer_A_fkey";

-- DropForeignKey
ALTER TABLE "_InterviewSlotToInterviewer" DROP CONSTRAINT "_InterviewSlotToInterviewer_B_fkey";

-- DropTable
DROP TABLE "_InterviewSlotToInterviewer";
