/*
  Warnings:

  - You are about to drop the column `description` on the `TestCaseCluster` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TestCaseCluster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestCaseCluster" DROP COLUMN "description",
DROP COLUMN "name";
