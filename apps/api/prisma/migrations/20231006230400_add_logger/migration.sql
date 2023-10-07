-- CreateEnum
CREATE TYPE "InternLogAction" AS ENUM ('OpenStatusPage', 'OpenInterviewPage', 'OpenTestPage');

-- CreateEnum
CREATE TYPE "AdminLogAction" AS ENUM ('Create', 'Update', 'Delete', 'Email');

-- CreateTable
CREATE TABLE "InternLog" (
    "id" TEXT NOT NULL,
    "internId" TEXT NOT NULL,
    "action" "InternLogAction" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InternLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminLog" (
    "id" TEXT NOT NULL,
    "action" "AdminLogAction" NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InternLog" ADD CONSTRAINT "InternLog_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
