-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('General', 'Personal', 'Dev', 'Marketing', 'Design', 'Multimedia', 'Grade');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('Slider', 'Field', 'Radio', 'Select');

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "questionCategory" "QuestionCategory" NOT NULL,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "SelectOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SelectOption" ADD CONSTRAINT "SelectOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
