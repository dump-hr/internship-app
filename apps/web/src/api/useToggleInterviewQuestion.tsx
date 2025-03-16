import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { api } from '.';

const toggleInterviewQuestion = async (id: string) => {
  const res = await api.patch(`/interview-question/${id}/toggle`);
  return res.data;
};

export const useToggleInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(toggleInterviewQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('interview-question');
      toast.success('Status pitanja ažuriran!');
    },
    onError: (error: any) => {
      toast.error(`Greška prilikom ažuriranja statusa: ${error}`);
    },
  });
};
