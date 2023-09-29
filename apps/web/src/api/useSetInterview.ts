import { SetInterviewRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

const setInterview = async (req: SetInterviewRequest) => {
  return await api.put<SetInterviewRequest, never>(
    `/intern/setInterview/${req.internId}`,
    req,
  );
};

export const useSetInterview = (navigate: () => void) => {
  return useMutation({
    mutationFn: setInterview,
    mutationKey: ['timesSubmitted'],
    onSuccess: () => {
      toast.success('Intervju uspješno pohranjen!');
      navigate();
    },
    onError: (error: string) => {
      toast.error(`Greška pri pohranjivanju intervjua: ${error}`);
    },
  });
};
