-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "expectedOutput" TEXT[],
ADD COLUMN     "input" TEXT[];

-- AlterTable
ALTER TABLE "TestCaseCluster" ADD COLUMN     "maxExecutionTime" INTEGER NOT NULL DEFAULT 1000,
ADD COLUMN     "maxMemory" INTEGER NOT NULL DEFAULT 256;
