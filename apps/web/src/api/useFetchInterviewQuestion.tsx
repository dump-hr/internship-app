import { useQuery } from 'react-query';

import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const fetchInterviewQuestion = async (
  questionId: string,
): Promise<InterviewQuestion> => {
  return api.get<never, InterviewQuestion>(
    `/interview/questions/${questionId}`,
  );
};

export const useFetchInterviewQuestion = (questionId: string) => {
  return useQuery<InterviewQuestion>(['interview-question', questionId], () =>
    fetchInterviewQuestion(questionId),
  );
};
