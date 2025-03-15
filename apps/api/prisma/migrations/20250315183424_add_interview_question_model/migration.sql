-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('Field', 'Slider', 'TextArea', 'Select', 'Checkbox', 'Radio', 'Date', 'DateTime', 'Number');

-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('General', 'Personal', 'Development', 'Design', 'Marketing', 'Multimedia', 'Final');

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "category" "QuestionCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "min" INTEGER,
    "max" INTEGER,
    "step" INTEGER,
    "options" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestionAnswer" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "questionId" TEXT NOT NULL,
    "interviewSlotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewQuestionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewQuestionAnswer_questionId_interviewSlotId_key" ON "InterviewQuestionAnswer"("questionId", "interviewSlotId");

-- AddForeignKey
ALTER TABLE "InterviewQuestionAnswer" ADD CONSTRAINT "InterviewQuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestionAnswer" ADD CONSTRAINT "InterviewQuestionAnswer_interviewSlotId_fkey" FOREIGN KEY ("interviewSlotId") REFERENCES "InterviewSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
