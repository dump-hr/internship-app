/*
  Warnings:

  - The values [Checkbox] on the enum `InterviewQuestionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InterviewQuestionType_new" AS ENUM ('Field', 'TextArea', 'Select', 'Slider', 'Date', 'DateTime', 'Radio', 'Number');
ALTER TABLE "InterviewQuestion" ALTER COLUMN "type" TYPE "InterviewQuestionType_new" USING ("type"::text::"InterviewQuestionType_new");
ALTER TYPE "InterviewQuestionType" RENAME TO "InterviewQuestionType_old";
ALTER TYPE "InterviewQuestionType_new" RENAME TO "InterviewQuestionType";
DROP TYPE "InterviewQuestionType_old";
COMMIT;
