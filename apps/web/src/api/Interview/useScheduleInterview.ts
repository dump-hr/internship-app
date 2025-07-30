import { Intern, ScheduleInterviewRequest } from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '../constants/paths';
import { api } from './base';

const scheduleInterview = async ({
  interviewSlotId,
  internId,
}: ScheduleInterviewRequest) => {
  return await api.patch<never, Intern>(
    `/interview-slot/schedule/${interviewSlotId}`,
    { internId },
  );
};

export const useScheduleInterview = () => {
  const queryClient = useQueryClient();

  return useMutation(scheduleInterview, {
    onMutate: () => {
      return { toastId: toast.loading('Zakazivanje intervjua...') };
    },
    onSuccess: (data, variables, context) => {
      toast.success('Intervju uspješno zakazan!', { id: context?.toastId });
      queryClient.invalidateQueries(['status', variables.internId]);
      navigate(Path.Status.replace(':internId', data.id));
    },
    onError: (error: string, variables, context) => {
      toast.error(error, { id: context?.toastId });
      queryClient.invalidateQueries(['interview-slot', variables.internId]);
    },
  });
};
