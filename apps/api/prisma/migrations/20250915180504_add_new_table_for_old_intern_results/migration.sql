-- CreateTable
CREATE TABLE "OldInternResult" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "discipline" TEXT,
    "test_score" INTEGER,
    "interview_score" INTEGER,

    CONSTRAINT "OldInternResult_pkey" PRIMARY KEY ("id")
);
