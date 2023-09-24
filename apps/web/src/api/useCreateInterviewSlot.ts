import { CreateInterviewSlotDto } from '@internship-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const createInterviewSlot = (data: CreateInterviewSlotDto) =>
  api.post<CreateInterviewSlotDto, never>('/interview-slot', data);

export const useCreateInterviewSlot = () => {
  const queryClient = useQueryClient();

  return useMutation(createInterviewSlot, {
    onMutate: () => {},
    onSuccess: (_data, _variables, context) => {
      void queryClient.invalidateQueries(['interview-slot']);
    },
    onError: (error: string, _variables, context) => {},
  });
};
