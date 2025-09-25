/*
  Warnings:

  - You are about to drop the column `lastUpdatedAt` on the `Email` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" DROP COLUMN "lastUpdatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
