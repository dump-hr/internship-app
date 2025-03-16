import { useQuery } from 'react-query';
import { api } from '.';
import { InterviewDetails } from '@internship-app/types';

const fetchInterviewQuestionAnswers = async (questionId: string) => {
  return await api.get<never, InterviewDetails[]>(
    `/interview-slot/interview-answers/${questionId}`,
  );
};

export const useFetchInterviewQuestionAnswers = (questionId: string) => {
  return useQuery(
    ['interviewQuestionAnswers', questionId],
    () => fetchInterviewQuestionAnswers(questionId),
    {
      enabled: !!questionId,
      refetchOnWindowFocus: false,
    },
  );
};
