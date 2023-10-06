/*
  Warnings:

  - The values [CS] on the enum `CodingLanguage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CodingLanguage_new" AS ENUM ('JavaScript', 'Python', 'CSharp', 'CPP', 'C', 'Java', 'Go');
ALTER TABLE "InternQuestionAnswer" ALTER COLUMN "language" TYPE "CodingLanguage_new" USING ("language"::text::"CodingLanguage_new");
ALTER TYPE "CodingLanguage" RENAME TO "CodingLanguage_old";
ALTER TYPE "CodingLanguage_new" RENAME TO "CodingLanguage";
DROP TYPE "CodingLanguage_old";
COMMIT;
