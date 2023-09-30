import { Intern, ScheduleTestRequest } from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '../constants/paths';
import { api } from '.';

const scheduleTest = async ({ testSlotId, internId }: ScheduleTestRequest) => {
  return await api.patch<never, Intern>(`/test-slot/schedule/${testSlotId}`, {
    internId,
  });
};

export const useScheduleTest = () => {
  return useMutation(scheduleTest, {
    onMutate: () => {
      return { toastId: toast.loading('Zakazivanje testa...') };
    },
    onSuccess: (_data, variables, context) => {
      toast.success('Test uspješno zakazan!', { id: context?.toastId });
      navigate(Path.Status.replace(':internId', variables.internId));
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
