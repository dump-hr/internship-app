/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Interviewer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Interviewer" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Interviewer_email_key" ON "Interviewer"("email");
