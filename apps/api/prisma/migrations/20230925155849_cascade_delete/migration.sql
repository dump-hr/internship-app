-- DropForeignKey
ALTER TABLE "InterviewMemberParticipation" DROP CONSTRAINT "InterviewMemberParticipation_interviewSlotId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewMemberParticipation" DROP CONSTRAINT "InterviewMemberParticipation_interviewerId_fkey";

-- AddForeignKey
ALTER TABLE "InterviewMemberParticipation" ADD CONSTRAINT "InterviewMemberParticipation_interviewSlotId_fkey" FOREIGN KEY ("interviewSlotId") REFERENCES "InterviewSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewMemberParticipation" ADD CONSTRAINT "InterviewMemberParticipation_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "Interviewer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
