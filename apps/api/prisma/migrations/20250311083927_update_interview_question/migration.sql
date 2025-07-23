/*
  Warnings:

  - You are about to drop the `SelectOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "QuestionType" ADD VALUE 'Checkbox';
ALTER TYPE "QuestionType" ADD VALUE 'TextArea';
ALTER TYPE "QuestionType" ADD VALUE 'Date';
ALTER TYPE "QuestionType" ADD VALUE 'DateTime';
ALTER TYPE "QuestionType" ADD VALUE 'Number';

-- DropForeignKey
ALTER TABLE "SelectOption" DROP CONSTRAINT "SelectOption_questionId_fkey";

-- AlterTable
ALTER TABLE "InterviewQuestion" ADD COLUMN     "maxValue" INTEGER,
ADD COLUMN     "minValue" INTEGER,
ADD COLUMN     "stepValue" INTEGER DEFAULT 1;

-- DropTable
DROP TABLE "SelectOption";

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
