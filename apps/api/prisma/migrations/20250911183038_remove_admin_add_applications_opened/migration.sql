/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "InternshipApplication" (
    "id" SERIAL NOT NULL,
    "isOpened" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InternshipApplication_pkey" PRIMARY KEY ("id")
);
