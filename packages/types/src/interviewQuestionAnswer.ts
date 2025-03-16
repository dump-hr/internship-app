export type InterviewQuestionAnswer = {
  id: string;
  value: any;
  flagged: boolean;
  questionId: string;
  interviewSlotId: string;
  createdAt: string;
  updatedAt: string;
  interviewSlot?: {
    intern?: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
};
