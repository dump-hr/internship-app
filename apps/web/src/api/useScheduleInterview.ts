import { Intern, ScheduleInterviewRequest } from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '../constants/paths';
import { api } from '.';

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
  return useMutation(scheduleInterview, {
    onMutate: () => {
      return { toastId: toast.loading('Zakavivanje intervjua...') };
    },
    onSuccess: (data, _variables, context) => {
      toast.success('Intervju uspješno zakazan!', { id: context?.toastId });
      navigate(Path.Status.replace(':internId', data.id));
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
