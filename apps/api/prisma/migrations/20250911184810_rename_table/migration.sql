/*
  Warnings:

  - You are about to drop the `InternshipApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "InternshipApplication";

-- CreateTable
CREATE TABLE "InternshipApplicationStatus" (
    "id" SERIAL NOT NULL,
    "isOpened" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InternshipApplicationStatus_pkey" PRIMARY KEY ("id")
);
