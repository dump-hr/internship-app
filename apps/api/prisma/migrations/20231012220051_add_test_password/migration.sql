/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `TestSlot` will be added. If there are existing duplicate values, this will fail.
  - The required column `password` was added to the `TestSlot` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "TestSlot" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TestSlot_password_key" ON "TestSlot"("password");
