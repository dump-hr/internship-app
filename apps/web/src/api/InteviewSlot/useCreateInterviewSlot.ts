import { api } from '@api/index';
import { CreateInterviewSlotDto } from '@internship-app/types';
import { useMutation, useQueryClient } from 'react-query';

const createInterviewSlot = (data: CreateInterviewSlotDto) =>
  api.post<CreateInterviewSlotDto, never>('/interview-slot', data);

export const useCreateInterviewSlot = () => {
  const queryClient = useQueryClient();

  return useMutation(createInterviewSlot, {
    onMutate: () => {},
    onSuccess: () => {
      void queryClient.invalidateQueries(['interview-slot']);
    },
    onError: (error: string) => {
      console.log('error creating interview slot: ', error);
    },
  });
};
