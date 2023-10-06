import { InterviewSlot } from '@internship-app/types';
import { useQuery, useQueryClient } from 'react-query';

import { api } from '.';

const fetchInterviewSlots = async () => {
  return api.get<never, InterviewSlot[]>('/interview-slot');
};

export const useFetchInterviewSlots = () => {
  const queryKey = ['interview-slots'];
  const queryClient = useQueryClient();

  const { data, ...queryRest } = useQuery(queryKey, () => {
    return fetchInterviewSlots();
  });

  const refetchInterviewSlots = () => {
    queryClient.refetchQueries(queryKey);
  };

  return { data, refetchInterviewSlots, ...queryRest };
};
