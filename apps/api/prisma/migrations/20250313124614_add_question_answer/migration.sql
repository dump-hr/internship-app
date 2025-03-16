/*
  Warnings:

  - Added the required column `answer` to the `InterviewQuestionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewQuestionAnswer" ADD COLUMN     "answer" TEXT NOT NULL;
