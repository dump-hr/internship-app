import { InternDecisionRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

const setInternDecision = async (req: InternDecisionRequest) => {
  return await api.put<InternDecisionRequest, never>(
    `/intern/setDecision/${req.internId}`,
    req,
  );
};

export const useSetInternDecision = () => {
  return useMutation({
    mutationFn: setInternDecision,
    mutationKey: ['timesSubmitted'],
    onSuccess: () => {
      toast.success('Odluka je primijenjena!');
    },
    onError: (error: string) => {
      toast.error(`Greška pri pohranjivanju odluke: ${error}`);
    },
  });
};
