import { Intern, InternActionRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const applyInternAction = async (req: InternActionRequest) => {
  return await api.put<InternActionRequest, never>(
    `/intern/action/${req.internId}`,
    req,
  );
};

export const useApplyInternAction = (intern: Intern) => {
  const queryClient = useQueryClient();

  return useMutation(applyInternAction, {
    onSuccess: () => {
      toast.success('Akcija uspješno izvedena!');
      queryClient.invalidateQueries(['intern', intern.id]);
    },
    onError: (error: string) => {
      toast.error(`Greška pri izvođenju akcije: ${error}`);
    },
  });
};
