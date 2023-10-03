-- CreateEnum
CREATE TYPE "CodingLanguage" AS ENUM ('Python', 'CPP', 'C', 'CS', 'JavaScript');

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

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_testSlotId_fkey" FOREIGN KEY ("testSlotId") REFERENCES "TestSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternQuestionAnswer" ADD CONSTRAINT "InternQuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "TestQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternQuestionAnswer" ADD CONSTRAINT "InternQuestionAnswer_internDisciplineInternId_internDiscip_fkey" FOREIGN KEY ("internDisciplineInternId", "internDisciplineDiscipline") REFERENCES "InternDiscipline"("internId", "discipline") ON DELETE RESTRICT ON UPDATE CASCADE;
