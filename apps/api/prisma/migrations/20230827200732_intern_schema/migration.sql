/*
  Warnings:

  - Added the required column `firstName` to the `Intern` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Intern` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Field" AS ENUM ('Development', 'Design', 'Multimedia', 'Marketing');

-- AlterTable
ALTER TABLE "Intern" ADD COLUMN     "fields" "Field"[],
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
