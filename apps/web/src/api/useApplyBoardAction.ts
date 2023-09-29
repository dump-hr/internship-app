import { BoardActionRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const applyBoardAction = async (req: BoardActionRequest) => {
  return await api.put<BoardActionRequest, never>(`/intern/boardAction`, req);
};

export const useApplyBoardAction = () => {
  const queryClient = useQueryClient();

  return useMutation(applyBoardAction, {
    onSuccess: () => {
      toast.success('Akcija uspješno izvedena!');
      queryClient.invalidateQueries('intern');
    },
    onError: (error: string) => {
      toast.error(`Greška pri izvođenju akcije: ${error}`);
    },
  });
};
