import { useQuery } from 'react-query';

export const useQuestionAnswers = (questionId?: string) => {
  return useQuery(
    ['questionAnswers', questionId],
    async () => {
      const response = await fetch(
        `/api/interview-questions/${questionId}/answers`,
      );
      return response.json();
    },
    { enabled: !!questionId },
  );
};
