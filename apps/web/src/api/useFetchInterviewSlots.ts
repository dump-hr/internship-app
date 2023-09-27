import { InterviewSlot } from '@internship-app/types';
import { useQuery, useQueryClient } from 'react-query';

import { api } from '.';

const fetchInterviewSlots = async (
  disciplines: string[] | null,
  interviewers: string[] | null,
) => {
  const params: Record<string, string> = {};

  if (disciplines) {
    params['disciplines'] = disciplines.join(',');
  }

  if (interviewers) {
    params['interviewers'] = interviewers.join(',');
  }
  return api.get<never, InterviewSlot[]>('/interview-slot', { params });
};

export const useFetchInterviewSlots = (
  disciplines: string[] | null,
  interviewers: string[] | null,
) => {
  const queryKey = ['interview-slots'];
  const queryClient = useQueryClient();

  const { data, ...queryRest } = useQuery(queryKey, () => {
    return fetchInterviewSlots(disciplines, interviewers);
  });

  const refetchInterviewSlots = () => {
    queryClient.refetchQueries(queryKey);
  };

  return { data, refetchInterviewSlots, ...queryRest };
};
