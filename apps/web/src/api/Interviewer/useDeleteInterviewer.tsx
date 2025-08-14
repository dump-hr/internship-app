import { api } from '@api/index';
import { ErrorResponse } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { checkError } from 'src/helpers/checkError';

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
    onError: (error: ErrorResponse) => {
      checkError(error, 'Greška prilikom brisanja intervjuera!');
    },
  });
};
