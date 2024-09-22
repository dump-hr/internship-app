-- DropForeignKey
ALTER TABLE "EvaluatedCase" DROP CONSTRAINT "EvaluatedCase_evaluatedClusterInternQuestionAnswerId_evalu_fkey";

-- DropForeignKey
ALTER TABLE "EvaluatedCase" DROP CONSTRAINT "EvaluatedCase_testCaseId_fkey";

-- DropForeignKey
ALTER TABLE "EvaluatedCluster" DROP CONSTRAINT "EvaluatedCluster_internQuestionAnswerId_fkey";

-- DropForeignKey
ALTER TABLE "EvaluatedCluster" DROP CONSTRAINT "EvaluatedCluster_testClusterId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_testCaseClusterId_fkey";

-- DropForeignKey
ALTER TABLE "TestCaseCluster" DROP CONSTRAINT "TestCaseCluster_testQuestionId_fkey";

-- AddForeignKey
ALTER TABLE "TestCaseCluster" ADD CONSTRAINT "TestCaseCluster_testQuestionId_fkey" FOREIGN KEY ("testQuestionId") REFERENCES "TestQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_testCaseClusterId_fkey" FOREIGN KEY ("testCaseClusterId") REFERENCES "TestCaseCluster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCluster" ADD CONSTRAINT "EvaluatedCluster_internQuestionAnswerId_fkey" FOREIGN KEY ("internQuestionAnswerId") REFERENCES "InternQuestionAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCluster" ADD CONSTRAINT "EvaluatedCluster_testClusterId_fkey" FOREIGN KEY ("testClusterId") REFERENCES "TestCaseCluster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCase" ADD CONSTRAINT "EvaluatedCase_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedCase" ADD CONSTRAINT "EvaluatedCase_evaluatedClusterInternQuestionAnswerId_evalu_fkey" FOREIGN KEY ("evaluatedClusterInternQuestionAnswerId", "evaluatedClusterTestClusterId") REFERENCES "EvaluatedCluster"("internQuestionAnswerId", "testClusterId") ON DELETE CASCADE ON UPDATE CASCADE;
