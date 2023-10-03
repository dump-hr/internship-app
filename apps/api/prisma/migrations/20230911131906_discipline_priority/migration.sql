/*
  Warnings:

  - Added the required column `priority` to the `InternDiscipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InternDiscipline" ADD COLUMN     "priority" INTEGER NOT NULL;
