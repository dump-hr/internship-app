import { useMutation, useQueryClient } from 'react-query';

import { api } from '@api/index';
import toast from 'react-hot-toast';

enum QuestionCategory {
  General = 'General',
  Personal = 'Personal',
  Development = 'Development',
  Marketing = 'Marketing',
  Design = 'Design',
  Multimedia = 'Multimedia',
  Final = 'Final',
}

enum QuestionType {
  Slider = 'Slider',
  Field = 'Field',
  Radio = 'Radio',
  Select = 'Select',
  Checkbox = 'Checkbox',
  TextArea = 'TextArea',
  Date = 'Date',
  DateTime = 'DateTime',
  Number = 'Number',
}

interface QuestionForm {
  question: string;
  category: QuestionCategory;
  type: QuestionType;
  minValue?: number | null;
  maxValue?: number | null;
  stepValue?: number | null;
  options?: string[] | null;
}

const createInterviewQuestion = (data: QuestionForm) =>
  api.post<QuestionForm, never>('/interview-questions', data);

export const useCreateInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(createInterviewQuestion, {
    onMutate: () => {},
    onSuccess: () => {
      void queryClient.invalidateQueries(['interview-question']);
      toast.success('Pitanje uspješno dodano');
    },
    onError: (error: string) => {
      console.log('Pogreška prilikom kreiranja pitanja: ', error);
    },
  });
};
