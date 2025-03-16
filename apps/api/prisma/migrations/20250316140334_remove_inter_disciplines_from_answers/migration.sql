/*
  Warnings:

  - You are about to drop the column `internDisciplineDiscipline` on the `InterviewQuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `internDisciplineInternId` on the `InterviewQuestionAnswer` table. All the data in the column will be lost.
  - Added the required column `internId` to the `InterviewQuestionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InterviewQuestionAnswer" DROP CONSTRAINT "InterviewQuestionAnswer_internDisciplineInternId_internDis_fkey";

-- AlterTable
ALTER TABLE "InterviewQuestionAnswer" DROP COLUMN "internDisciplineDiscipline",
DROP COLUMN "internDisciplineInternId",
ADD COLUMN     "internId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InterviewQuestionAnswer" ADD CONSTRAINT "InterviewQuestionAnswer_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
