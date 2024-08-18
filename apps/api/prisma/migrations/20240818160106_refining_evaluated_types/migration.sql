/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `EvaluatedCase` table. All the data in the column will be lost.
  - Added the required column `evaluationStatus` to the `EvaluatedCase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAccepted` to the `EvaluatedCluster` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EvaluationResult" AS ENUM ('AcceptedAnswer', 'WrongAnswer', 'TimeLimitExceeded', 'MemoryLimitExceeded', 'RuntimeError', 'CompilationError');

-- AlterTable
ALTER TABLE "EvaluatedCase" DROP COLUMN "isCorrect",
ADD COLUMN     "error" TEXT,
ADD COLUMN     "evaluationStatus" "EvaluationResult" NOT NULL,
ADD COLUMN     "executionTime" INTEGER,
ADD COLUMN     "memoryUsed" INTEGER;

-- AlterTable
ALTER TABLE "EvaluatedCluster" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL;
