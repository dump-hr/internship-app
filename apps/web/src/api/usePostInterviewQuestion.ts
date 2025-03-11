import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { api } from '.';
import { OptionType } from '../components/InterviewQuestionAddForm/InterviewQuestionAddForm';

type QuestionToCreate = {
  title: string;
  type: string;
  category: string;
  min: number | null;
  max: number | null;
  step: number | null;
  options: OptionType[];
};

const addInterviewQuestion = async (newQuestion: QuestionToCreate) => {
  await api.post('/interview-question', newQuestion);
};

export const usePostInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(addInterviewQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('interview-question');
      toast.success('Pitanje uspješno dodano!');
    },
    onError: (error) => {
      toast.error(`Greška prilikom dodavanja pitanja! (${error})`);
    },
  });
};
