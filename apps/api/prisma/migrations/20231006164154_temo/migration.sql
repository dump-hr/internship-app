-- CreateEnum
CREATE TYPE "InternLogAction" AS ENUM ('OpenStatusPage', 'OpenInterviewPage', 'OpenTestPage');

-- CreateTable
CREATE TABLE "InternLog" (
    "id" TEXT NOT NULL,
    "internId" TEXT NOT NULL,
    "action" "InternLogAction" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InternLog" ADD CONSTRAINT "InternLog_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
