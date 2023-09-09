import { Box } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useRoute } from 'wouter';

import MultistepForm from '../../components/MultistepForm';
import { Path } from '../../constants/paths';
import { defaultInterviewValues, interviewQuestions, steps } from './data';
import InterviewQuestionHandler from './InterviewQuestionHandler';

import IntervieweeInfo from '../../components/IntervieweeInfo';

const mapAnswersToQuestions = (answers: FieldValues) => {
  return interviewQuestions.map((q) => ({ ...q, ...answers[q.id] }));
};

const InterviewPage = () => {
  const [, params] = useRoute(Path.Interview);
  const internId = params?.internId;

  const form = useForm<FieldValues>({
    defaultValues: defaultInterviewValues,
  });

  const handleFormSubmit = form.handleSubmit((d) =>
    console.log(internId, mapAnswersToQuestions(d)),
  );

  const setUrl = (image: string) => {
    console.log(image);
  };

  return (
    <Box maxWidth="1280px" margin="auto">
      <IntervieweeInfo
        setUrl={setUrl}
        info={{
          fullName: 'Ime i prezime',
          email: 'intern@dump.hr',
          phone: '091 123 4567',
          dateOfBirth: '01/01/2020',
          workingStatus: 'Student',
          institutionName: 'Fakultet elektrotehnike i računarstva',
          yearOfStudy: 3,
          field: 'Dev',
          referral: 'Ostalo',
          applicationMotivation: 'Lorem ipsum dolor sit amet, consectetur.',
        }}
      />

      <MultistepForm
        questions={interviewQuestions}
        form={form}
        steps={steps}
        onSubmit={handleFormSubmit}
        InputHandler={InterviewQuestionHandler}
      />
    </Box>
  );
};

export default InterviewPage;
