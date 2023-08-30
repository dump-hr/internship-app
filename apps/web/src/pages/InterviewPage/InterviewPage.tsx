import { useForm } from 'react-hook-form';

import MultistepForm from './MultistepForm';
import QuestionHandler from './QuestionHandler';

// tip: question (za intervju)
// questioncategory

enum QuestionCategory {
  Personal = 'Personal',
  General = 'General',
  Dev = 'Dev',
  Design = 'Design',
  Marketing = 'Marketing',
  Multimedia = 'Multimedia',
  Final = 'Final',
}

type Question = { id: string; category: QuestionCategory; title: string } & (
  | { type: 'field' }
  | { type: 'select'; options: string[] }
);

const interviewQuestions: Array<Question> = [
  {
    title: 'Kako si?',
    type: 'field',
    category: QuestionCategory.General,
    id: 'alal',
  },
];

const steps = [
  { label: 'aa', category: QuestionCategory.General },
  { label: 'dev', category: QuestionCategory.Dev },
  { label: 'zadnja', category: QuestionCategory.Final },
];

const InterviewPage = () => {
  const { control } = useForm({ defaultValues: { alal: '2' } });

  return (
    <MultistepForm
      questions={interviewQuestions}
      control={control}
      steps={steps}
      Handler={QuestionHandler}
    />
  );
};

export default InterviewPage;
