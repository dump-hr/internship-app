import { Intern, ScheduleTestRequest } from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '../constants/paths';
import { unAuthApi } from '.';

const scheduleTest = async ({ testSlotId, internId }: ScheduleTestRequest) => {
  return await unAuthApi.patch<never, Intern>(
    `/test-slot/schedule/${testSlotId}`,
    {
      internId,
    },
  );
};

export const useScheduleTest = () => {
  const queryClient = useQueryClient();

  return useMutation(scheduleTest, {
    onMutate: () => {
      return { toastId: toast.loading('Zakazivanje testa...') };
    },
    onSuccess: (_data, variables, context) => {
      toast.success('Test uspješno zakazan!', { id: context?.toastId });
      queryClient.invalidateQueries(['status', variables.internId]);
      navigate(Path.Status.replace(':internId', variables.internId));
    },
    onError: (error: string, variables, context) => {
      toast.error(error, { id: context?.toastId });
      queryClient.invalidateQueries([
        'test-slot',
        variables.discipline,
        variables.internId,
      ]);
    },
  });
};
