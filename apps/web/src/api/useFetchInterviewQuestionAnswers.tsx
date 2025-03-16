import { useQuery } from 'react-query';

import { api } from '.';
import { InterviewQuestionAnswer } from '@internship-app/types';

const fetchInterviewQuestionAnswers = async (
  questionId: string,
): Promise<InterviewQuestionAnswer[]> => {
  return api.get<never, InterviewQuestionAnswer[]>(
    `/interview/questions/answers/${questionId}`,
  );
};

export const useFetchInterviewQuestionAnswers = (questionId: string) => {
  return useQuery<InterviewQuestionAnswer[]>(
    ['interview-question-answers', questionId],
    () => fetchInterviewQuestionAnswers(questionId),
  );
};
