import { useQuery } from 'react-query';

export const useFetchInterviewQuestions = (
  page: number,
  limit: number,
  type?: string,
  category?: string,
) => {
  return useQuery(['questions', page, limit, type, category], async () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(type && { type }),
      ...(category && { category }),
    });

    const response = await fetch(`/api/interview-questions?${params}`);
    return response.json();
  });
};
