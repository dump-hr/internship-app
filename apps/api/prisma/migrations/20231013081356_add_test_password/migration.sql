/*
  Warnings:

  - The required column `password` was added to the `TestSlot` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "TestSlot" ADD COLUMN     "password" TEXT NOT NULL;
