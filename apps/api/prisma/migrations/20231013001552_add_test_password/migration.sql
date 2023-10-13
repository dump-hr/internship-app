/*
  Warnings:

  - Added the required column `password` to the `TestSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestSlot" ADD COLUMN     "password" TEXT NOT NULL;
