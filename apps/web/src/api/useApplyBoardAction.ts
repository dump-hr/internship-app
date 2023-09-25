import { BoardActionRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

const applyBoardAction = async (req: BoardActionRequest) => {
  return await api.put<BoardActionRequest, never>(`/intern/boardAction`, req);
};

export const useApplyBoardAction = (refresh: () => void) => {
  return useMutation({
    mutationFn: applyBoardAction,
    mutationKey: ['timesSubmitted'],
    onSuccess: () => {
      toast.success('Akcija uspješno izvedena!');
      refresh();
    },
    onError: (error: string) => {
      toast.error(`Greška pri izvođenju akcije: ${error}`);
    },
  });
};
