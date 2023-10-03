-- CreateEnum
CREATE TYPE "Discipline" AS ENUM ('Development', 'Design', 'Multimedia', 'Marketing');

-- CreateEnum
CREATE TYPE "DisciplineStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('NoRight', 'PickTerm', 'Pending', 'Done', 'Missed');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('PickTerm', 'Pending', 'Done', 'Missed');

-- CreateEnum
CREATE TYPE "CodingLanguage" AS ENUM ('Python', 'CPP', 'C', 'CS', 'JavaScript');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interviewer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "disciplines" "Discipline"[],
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intern" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "data" JSONB NOT NULL,
    "interviewStatus" "InterviewStatus" NOT NULL DEFAULT 'NoRight',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternDiscipline" (
    "internId" TEXT NOT NULL,
    "discipline" "Discipline" NOT NULL,
    "priority" INTEGER NOT NULL,
    "status" "DisciplineStatus" NOT NULL,
    "testSlotId" TEXT,
    "testStatus" "TestStatus",
    "testScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternDiscipline_pkey" PRIMARY KEY ("internId","discipline")
);

-- CreateTable
CREATE TABLE "TestSlot" (
    "id" TEXT NOT NULL,
    "discipline" "Discipline" NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "maxPoints" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestQuestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "testSlotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternQuestionAnswer" (
    "id" TEXT NOT NULL,
    "language" "CodingLanguage" NOT NULL,
    "code" TEXT NOT NULL,
    "score" INTEGER,
    "questionId" TEXT NOT NULL,
    "internDisciplineInternId" TEXT NOT NULL,
    "internDisciplineDiscipline" "Discipline" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternQuestionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewSlot" (
    "id" TEXT NOT NULL,
    "internId" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "answers" JSONB NOT NULL,
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "InterviewSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewMemberParticipation" (
    "interviewSlotId" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,

    CONSTRAINT "InterviewMemberParticipation_pkey" PRIMARY KEY ("interviewSlotId","interviewerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Interviewer_email_key" ON "Interviewer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Intern_email_key" ON "Intern"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewSlot_internId_key" ON "InterviewSlot"("internId");

-- AddForeignKey
ALTER TABLE "InternDiscipline" ADD CONSTRAINT "InternDiscipline_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternDiscipline" ADD CONSTRAINT "InternDiscipline_testSlotId_fkey" FOREIGN KEY ("testSlotId") REFERENCES "TestSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_testSlotId_fkey" FOREIGN KEY ("testSlotId") REFERENCES "TestSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternQuestionAnswer" ADD CONSTRAINT "InternQuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "TestQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternQuestionAnswer" ADD CONSTRAINT "InternQuestionAnswer_internDisciplineInternId_internDiscip_fkey" FOREIGN KEY ("internDisciplineInternId", "internDisciplineDiscipline") REFERENCES "InternDiscipline"("internId", "discipline") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSlot" ADD CONSTRAINT "InterviewSlot_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewMemberParticipation" ADD CONSTRAINT "InterviewMemberParticipation_interviewSlotId_fkey" FOREIGN KEY ("interviewSlotId") REFERENCES "InterviewSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewMemberParticipation" ADD CONSTRAINT "InterviewMemberParticipation_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "Interviewer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
