/*
  Warnings:

  - You are about to drop the column `fields` on the `Intern` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Discipline" AS ENUM ('Development', 'Design', 'Multimedia', 'Marketing');

-- AlterTable
ALTER TABLE "Intern" DROP COLUMN "fields",
ADD COLUMN     "disciplines" "Discipline"[];

-- DropEnum
DROP TYPE "Field";
