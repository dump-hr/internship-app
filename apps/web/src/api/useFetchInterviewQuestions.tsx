import { useQuery } from 'react-query';
import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const fetchInterviewQuestions = async () => {
  return await api.get<never, InterviewQuestion[]>('interview-question');
};

export function useFetchInterviewQuestions() {
  return useQuery(['interview-question'], fetchInterviewQuestions);
}

const fetchInterviewQuestion = async (
  id: string,
): Promise<InterviewQuestion> => {
  const res = await fetch(`/api/interview-question/${id}`);
  return res.json();
};

export function useFetchInterviewQuestion(id: string) {
  return useQuery(
    ['interview-question', id],
    () => fetchInterviewQuestion(id),
    {
      enabled: !!id,
      staleTime: 1000 * 60,
    },
  );
}
