import { useQuery } from 'react-query';
import { api } from '.';

//zamini any

const fetchInterviewQuestionAnswers = async (questionId: string) => {
  return await api.get<never, any[]>(
    `/interview-slot/interview-answers/${questionId}`,
  );
};

export const useFetchInterviewQuestionAnswers = (questionId: string) => {
  return useQuery(['interviewQuestionAnswers', questionId], () =>
    fetchInterviewQuestionAnswers(questionId),
  );
};
