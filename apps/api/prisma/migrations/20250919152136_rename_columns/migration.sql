/*
  Warnings:

  - You are about to drop the column `applicationYear` on the `OldInternResult` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `OldInternResult` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `OldInternResult` table. All the data in the column will be lost.
  - Added the required column `applicationDate` to the `OldInternResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `OldInternResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `OldInternResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OldInternResult" DROP COLUMN "applicationYear",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
