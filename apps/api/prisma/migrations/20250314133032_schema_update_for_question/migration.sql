/*
  Warnings:

  - You are about to drop the `QuestionOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionOption" DROP CONSTRAINT "QuestionOption_questionId_fkey";

-- AlterTable
ALTER TABLE "InterviewQuestion" ADD COLUMN     "options" TEXT[];

-- DropTable
DROP TABLE "QuestionOption";
