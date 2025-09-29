/*
  Warnings:

  - Added the required column `applicationYear` to the `OldInternResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OldInternResult" ADD COLUMN     "applicationYear" TIMESTAMP(3) NOT NULL;
