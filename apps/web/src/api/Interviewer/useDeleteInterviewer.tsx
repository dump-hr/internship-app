import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from './base';

const deleteInterviewer = async (id: string) => {
  return api.delete(`/interviewer/${id}`);
};

export const useDeleteInterviewer = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteInterviewer, {
    onSuccess: () => {
      queryClient.invalidateQueries('interviewer');
      toast.success('Intervjuer uspješno obrisan!');
    },
    onError: () => {
      toast.error('Greška prilikom brisanja intervjuera!');
    },
  });
};
