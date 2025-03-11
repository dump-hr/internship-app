/*
  Warnings:

  - The values [Grade] on the enum `QuestionCategory` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `questionType` on the `InterviewQuestion` table. All the data in the column will be lost.
  - Added the required column `type` to the `InterviewQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionCategory_new" AS ENUM ('General', 'Personal', 'Dev', 'Marketing', 'Design', 'Multimedia', 'Final');
ALTER TABLE "InterviewQuestion" ALTER COLUMN "questionCategory" TYPE "QuestionCategory_new" USING ("questionCategory"::text::"QuestionCategory_new");
ALTER TYPE "QuestionCategory" RENAME TO "QuestionCategory_old";
ALTER TYPE "QuestionCategory_new" RENAME TO "QuestionCategory";
DROP TYPE "QuestionCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "InterviewQuestion" DROP COLUMN "questionType",
ADD COLUMN     "type" "QuestionType" NOT NULL;
