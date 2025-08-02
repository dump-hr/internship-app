import { ErrorResponse, InternActionRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '@api/index';
import { checkError } from 'src/helpers/checkError';

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
    onError: (error: ErrorResponse) => {
      checkError(error);
    },
  });
};
