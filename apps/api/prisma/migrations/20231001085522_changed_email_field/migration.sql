/*
  Warnings:

  - Made the column `email` on table `Interviewer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Interviewer" ALTER COLUMN "email" SET NOT NULL;
