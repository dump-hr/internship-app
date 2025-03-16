-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('Field', 'TextArea', 'Select', 'Checkbox', 'Date', 'DateTime', 'Radio', 'Number', 'Slider');

-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('General', 'Personal', 'Development', 'Design', 'Marketing', 'Multimedia', 'Final');

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "category" "QuestionCategory" NOT NULL,
    "min" INTEGER,
    "max" INTEGER,
    "step" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);
