/*
  Warnings:

  - The values [Development,Design,Multimedia] on the enum `Field` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Field_new" AS ENUM ('Programiranje', 'Dizajn', 'Multimedija', 'Marketing');
ALTER TABLE "Intern" ALTER COLUMN "fields" TYPE "Field_new"[] USING ("fields"::text::"Field_new"[]);
ALTER TYPE "Field" RENAME TO "Field_old";
ALTER TYPE "Field_new" RENAME TO "Field";
DROP TYPE "Field_old";
COMMIT;
