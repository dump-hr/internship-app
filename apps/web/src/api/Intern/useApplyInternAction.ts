import { api } from '@api/index';
import { InternActionRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

const applyInternAction = async (req: InternActionRequest) => {
  return await api.put<InternActionRequest, never>(
    `/intern/action/${req.internId}`,
    req,
  );
};

export const useApplyInternAction = () => {
  const queryClient = useQueryClient();

  return useMutation(applyInternAction, {
    onSuccess: (_data, variables) => {
      toast.success('Akcija uspješno izvedena!');
      queryClient.invalidateQueries(['intern', variables.internId]);
    },
    onError: () => {
      toast.error('Greška pri primjeni akcije na internu');
    },
  });
};
