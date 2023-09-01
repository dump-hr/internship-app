/*
  Warnings:

  - The values [Programiranje,Dizajn,Multimedija] on the enum `Field` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Counter` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Field_new" AS ENUM ('Development', 'Design', 'Multimedia', 'Marketing');
ALTER TABLE "Intern" ALTER COLUMN "fields" TYPE "Field_new"[] USING ("fields"::text::"Field_new"[]);
ALTER TYPE "Field" RENAME TO "Field_old";
ALTER TYPE "Field_new" RENAME TO "Field";
DROP TYPE "Field_old";
COMMIT;

-- DropTable
DROP TABLE "Counter";
