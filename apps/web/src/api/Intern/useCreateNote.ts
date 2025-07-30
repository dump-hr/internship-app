import { CreateNoteRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../base';

const createNote = async (req: CreateNoteRequest) => {
  return await api.post<CreateNoteRequest, never>(
    `/intern/note/${req.internId}`,
    req,
  );
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation(createNote, {
    onSuccess: (_data, variables) => {
      toast.success('Nota uspješno dodana!');
      queryClient.invalidateQueries(['intern', variables.internId]);
    },
    onError: (error: string) => {
      toast.error(`Greška pri izvođenju akcije: ${error}`);
    },
  });
};
