import { useQuery } from 'react-query';
import { InterviewQuestionAnswer } from '@internship-app/types';

const fetchQuestionAnswers = async (
  id: string,
): Promise<InterviewQuestionAnswer[]> => {
  const res = await fetch(`/api/interview-question/${id}/answers`);
  return res.json();
};

export function useFetchQuestionAnswers(id: string) {
  return useQuery(['question-answers', id], () => fetchQuestionAnswers(id), {
    enabled: !!id,
    staleTime: 1000 * 60,
  });
}
