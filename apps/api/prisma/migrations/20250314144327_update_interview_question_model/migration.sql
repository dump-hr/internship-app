/*
  Warnings:

  - The values [Development,Design,Marketing,Multimedia] on the enum `InterviewQuestionCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InterviewQuestionCategory_new" AS ENUM ('General', 'Personal', 'DisciplineSpecific', 'Final');
ALTER TABLE "InterviewQuestion" ALTER COLUMN "category" TYPE "InterviewQuestionCategory_new" USING ("category"::text::"InterviewQuestionCategory_new");
ALTER TYPE "InterviewQuestionCategory" RENAME TO "InterviewQuestionCategory_old";
ALTER TYPE "InterviewQuestionCategory_new" RENAME TO "InterviewQuestionCategory";
DROP TYPE "InterviewQuestionCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "InterviewQuestion" ADD COLUMN     "discipline" "Discipline";
