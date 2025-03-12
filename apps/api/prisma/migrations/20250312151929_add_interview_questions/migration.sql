-- CreateEnum
CREATE TYPE "InterviewQuestionType" AS ENUM ('Field', 'TextArea', 'Select', 'Slider', 'Checkbox', 'Date', 'DateTime', 'Radio', 'Number');

-- CreateEnum
CREATE TYPE "InterviewQuestionCategory" AS ENUM ('General', 'Personal', 'Development', 'Design', 'Marketing', 'Multimedia', 'Final');

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" "InterviewQuestionType" NOT NULL,
    "category" "InterviewQuestionCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestionDetails" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "options" JSONB,
    "min" INTEGER,
    "max" INTEGER,
    "step" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewQuestionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestionAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "internDisciplineInternId" TEXT NOT NULL,
    "internDisciplineDiscipline" "Discipline" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewQuestionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewQuestionDetails_questionId_key" ON "InterviewQuestionDetails"("questionId");

-- AddForeignKey
ALTER TABLE "InterviewQuestionDetails" ADD CONSTRAINT "InterviewQuestionDetails_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestionAnswer" ADD CONSTRAINT "InterviewQuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestionAnswer" ADD CONSTRAINT "InterviewQuestionAnswer_internDisciplineInternId_internDis_fkey" FOREIGN KEY ("internDisciplineInternId", "internDisciplineDiscipline") REFERENCES "InternDiscipline"("internId", "discipline") ON DELETE RESTRICT ON UPDATE CASCADE;
