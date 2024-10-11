import {
  Intern,
  InterviewSlot,
  ScheduleInterviewRequest,
} from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '../constants/paths';
import { api, graphApi } from '.';

const scheduleInterview = async ({
  interviewSlotId,
  internId,
}: ScheduleInterviewRequest) => {
  return await api.patch<never, Intern>(
    `/interview-slot/schedule/${interviewSlotId}`,
    { internId },
  );
};

const getInterviewerData = async (interviewSlotId: string) => {
  return await api.get<never, InterviewSlot>(
    `/interview-slot/${interviewSlotId}`,
  );
};

const sendInterviewEvents = async (interviewSlotId: string) => {
  const interviewData = await getInterviewerData(interviewSlotId);

  console.log('Interview data: ', interviewData);

  const event = {
    subject:
      'Intervju: ' +
      interviewData.intern.firstName +
      interviewData.intern.lastName,
    start: {
      dateTime: interviewData.start,
      timeZone: 'UTC',
    },
    end: {
      dateTime: interviewData.end,
      timeZone: 'UTC',
    },
    location: {
      displayName: 'ured@dump.hr',
    },
    attendees: interviewData.interviewers.map((email) => ({
      emailAddress: { address: email },
    })),
  };

  console.log('Event: ', event);

  const response = await graphApi.post('/me/events', event);
  console.log('response: ', response);
};

export const useScheduleInterview = () => {
  const queryClient = useQueryClient();

  return useMutation(scheduleInterview, {
    onMutate: () => {
      return { toastId: toast.loading('Zakazivanje intervjua...') };
    },
    onSuccess: async (data, variables, context) => {
      await sendInterviewEvents(variables.interviewSlotId);
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
