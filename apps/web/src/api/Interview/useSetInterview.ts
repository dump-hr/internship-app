import { ErrorResponse, SetInterviewRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '@api/index';
import { checkError } from 'src/helpers/checkError';

const setInterview = async (req: SetInterviewRequest) => {
  return await api.put<SetInterviewRequest, never>(
    `/intern/setInterview/${req.internId}`,
    req,
  );
};

export const useSetInterview = (navigate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(setInterview, {
    onSuccess: (_data, variables) => {
      toast.success('Intervju uspješno pohranjen!');
      queryClient.invalidateQueries(['intern', variables.internId]);
      navigate();
    },
    onError: (error: ErrorResponse) => {
      checkError(error, 'Greška pri pohranjivanju intervjua');
    },
  });
};
