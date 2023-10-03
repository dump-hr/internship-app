/*
  Warnings:

  - You are about to drop the column `disciplines` on the `Intern` table. All the data in the column will be lost.
  - You are about to drop the column `interview` on the `Intern` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DisciplineStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('Pending', 'Done', 'Missed');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('Pending', 'Done', 'Missed');

-- AlterTable
ALTER TABLE "Intern" DROP COLUMN "disciplines",
DROP COLUMN "interview";

-- CreateTable
CREATE TABLE "Interviewer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "disciplines" "Discipline"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interviewer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternDiscipline" (
    "internId" TEXT NOT NULL,
    "discipline" "Discipline" NOT NULL,
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
CREATE TABLE "InterviewSlot" (
    "id" TEXT NOT NULL,
    "internId" TEXT,
    "status" "InterviewStatus",
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "answers" JSONB NOT NULL,
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewMemberParticipation" (
    "interviewSlotId" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,

    CONSTRAINT "InterviewMemberParticipation_pkey" PRIMARY KEY ("interviewSlotId","interviewerId")
);

-- CreateTable
CREATE TABLE "_InterviewSlotToInterviewer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewSlot_internId_key" ON "InterviewSlot"("internId");

-- CreateIndex
CREATE UNIQUE INDEX "_InterviewSlotToInterviewer_AB_unique" ON "_InterviewSlotToInterviewer"("A", "B");

-- CreateIndex
CREATE INDEX "_InterviewSlotToInterviewer_B_index" ON "_InterviewSlotToInterviewer"("B");

-- AddForeignKey
ALTER TABLE "InternDiscipline" ADD CONSTRAINT "InternDiscipline_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternDiscipline" ADD CONSTRAINT "InternDiscipline_testSlotId_fkey" FOREIGN KEY ("testSlotId") REFERENCES "TestSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSlot" ADD CONSTRAINT "InterviewSlot_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewMemberParticipation" ADD CONSTRAINT "InterviewMemberParticipation_interviewSlotId_fkey" FOREIGN KEY ("interviewSlotId") REFERENCES "InterviewSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewMemberParticipation" ADD CONSTRAINT "InterviewMemberParticipation_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "Interviewer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewSlotToInterviewer" ADD CONSTRAINT "_InterviewSlotToInterviewer_A_fkey" FOREIGN KEY ("A") REFERENCES "InterviewSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewSlotToInterviewer" ADD CONSTRAINT "_InterviewSlotToInterviewer_B_fkey" FOREIGN KEY ("B") REFERENCES "Interviewer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
