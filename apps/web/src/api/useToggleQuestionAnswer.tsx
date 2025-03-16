import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { api } from '.';

const toggleQuestionAnswer = async (id: string) => {
  const res = await api.patch(`/interview-question/answers/${id}/flag`);
  return res.data;
};

export const useToggleQuestionAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleQuestionAnswer, {
    onSuccess: () => {
      queryClient.invalidateQueries('question-answers');
      toast.success('Flag status ažuriran!');
    },
    onError: (error: any) => {
      toast.error(`Greška prilikom ažuriranja flag statusa: ${error}`);
    },
  });
};
