import { FieldValues, useForm } from 'react-hook-form';
import { LoaderIcon } from 'react-hot-toast';
import { useRoute } from 'wouter';

import { useGetIntern } from '../../api/useGetIntern';
import AdminPage from '../../components/AdminPage';
import IntervieweeInfo from '../../components/IntervieweeInfo';
import MultistepForm from '../../components/MultistepForm';
import { Path } from '../../constants/paths';
import { defaultInterviewValues, interviewQuestions, steps } from './data';
import InterviewQuestionHandler from './InterviewQuestionHandler';

const mapAnswersToQuestions = (answers: FieldValues) => {
  return interviewQuestions.map((q) => ({ ...q, ...answers[q.id] }));
};

const InterviewPage = () => {
  const [, params] = useRoute(Path.Interview);
  const internId = params?.internId;

  const { data: intern, isFetching } = useGetIntern(internId);

  const form = useForm<FieldValues>({
    defaultValues: defaultInterviewValues,
  });

  const handleFormSubmit = form.handleSubmit((d) =>
    console.log(internId, mapAnswersToQuestions(d)),
  );

  const setUrl = (image: string) => {
    console.log(image);
  };

  if (isFetching) {
    return <LoaderIcon />;
  }

  if (!intern) {
    return <div>Intern ovog ID-a ne postoji!</div>;
  }

  return (
    <AdminPage>
      <IntervieweeInfo setUrl={setUrl} intern={intern} />
      <MultistepForm
        questions={interviewQuestions}
        form={form}
        steps={steps}
        onSubmit={handleFormSubmit}
        InputHandler={InterviewQuestionHandler}
      />
    </AdminPage>
  );
};

export default InterviewPage;
