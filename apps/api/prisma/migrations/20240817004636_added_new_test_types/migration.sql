-- AlterTable
ALTER TABLE "TestSlot" ADD COLUMN     "testClusterId" TEXT;

-- CreateTable
CREATE TABLE "TestCaseCluster" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "testQuestionId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "TestCaseCluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL,
    "testCaseClusterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluatedCluster" (
    "internQuestionAnswerId" TEXT NOT NULL,
    "testClusterId" TEXT NOT NULL,

    CONSTRAINT "EvaluatedCluster_pkey" PRIMARY KEY ("internQuestionAnswerId","testClusterId")
);

-- CreateTable
CREATE TABLE "EvaluatedCase" (
    "testCaseId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "userOutput" TEXT,
    "evaluatedClusterInternQuestionAnswerId" TEXT NOT NULL,
    "evaluatedClusterTestClusterId" TEXT NOT NULL,
    "internQuestionAnswerId" TEXT,

    CONSTRAINT "EvaluatedCase_pkey" PRIMARY KEY ("testCaseId","evaluatedClusterInternQuestionAnswerId","evaluatedClusterTestClusterId")
);

-- AddForeignKey
ALTER TABLE "TestCaseCluster" ADD CONSTRAINT "TestCaseCluster_testQuestionId_fkey" FOREIGN KEY ("testQuestionId") REFERENCES "TestQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_testCaseClusterId_fkey" FOREIGN KEY ("testCaseClusterId") REFERENCES "TestCaseCluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCluster" ADD CONSTRAINT "EvaluatedCluster_internQuestionAnswerId_fkey" FOREIGN KEY ("internQuestionAnswerId") REFERENCES "InternQuestionAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCluster" ADD CONSTRAINT "EvaluatedCluster_testClusterId_fkey" FOREIGN KEY ("testClusterId") REFERENCES "TestCaseCluster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCase" ADD CONSTRAINT "EvaluatedCase_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCase" ADD CONSTRAINT "EvaluatedCase_evaluatedClusterInternQuestionAnswerId_evalu_fkey" FOREIGN KEY ("evaluatedClusterInternQuestionAnswerId", "evaluatedClusterTestClusterId") REFERENCES "EvaluatedCluster"("internQuestionAnswerId", "testClusterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCase" ADD CONSTRAINT "EvaluatedCase_internQuestionAnswerId_fkey" FOREIGN KEY ("internQuestionAnswerId") REFERENCES "InternQuestionAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
