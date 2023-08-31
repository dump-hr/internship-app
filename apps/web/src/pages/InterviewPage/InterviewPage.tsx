import { Box } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';

import MultistepForm from '../../components/MultistepForm';
import { defaultInterviewValues, interviewQuestions, steps } from './data';
import InterviewQuestionHandler from './InterviewQuestionHandler';

const InterviewPage = () => {
  const form = useForm<FieldValues>({
    defaultValues: defaultInterviewValues,
  });

  return (
    <Box maxWidth="1080px" margin="auto">
      <MultistepForm
        questions={interviewQuestions}
        form={form}
        steps={steps}
        Handler={InterviewQuestionHandler}
      />
    </Box>
  );
};

export default InterviewPage;
