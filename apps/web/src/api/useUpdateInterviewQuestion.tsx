import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const updateInterviewQuestion = async ({
  id,
  data,
}: {
  id: string;
  data: InterviewQuestion;
}) => {
  await api.patch(`/interview-question/${id}`, data);
};

export const useUpdateInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(updateInterviewQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('interview-question');
      toast.success('Pitanje uspješno ažurirano!');
    },
    onError: (error: any) => {
      toast.error(`Greška prilikom ažuriranja! (${error})`);
    },
  });
};
