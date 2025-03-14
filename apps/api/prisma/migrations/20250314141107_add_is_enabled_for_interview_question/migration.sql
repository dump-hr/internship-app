/*
  Warnings:

  - Added the required column `isEnabled` to the `InterviewQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewQuestion" ADD COLUMN     "isEnabled" BOOLEAN NOT NULL;
