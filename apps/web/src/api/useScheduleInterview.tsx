import { ScheduleInterviewRequest } from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

const scheduleInterview = async ({
  interviewSlotId,
  internId,
}: ScheduleInterviewRequest) => {
  return await api.patch(`/interview-slot/schedule/${interviewSlotId}`, {
    internId,
  });
};

export const useScheduleInterview = (navigate: () => void) => {
  return useMutation(scheduleInterview, {
    onMutate: () => {
      return { toastId: toast.loading('Zakavivanje intervjua...') };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Intervju uspješno zakazan!', { id: context?.toastId });
      navigate();
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
