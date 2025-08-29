-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "subject" JSONB NOT NULL,
    "body" JSONB NOT NULL,
    "isSeen" BOOLEAN NOT NULL,
    "internId" TEXT NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
