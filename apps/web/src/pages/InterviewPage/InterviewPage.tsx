import { InterviewStatus, QuestionType } from '@internship-app/types';
import { Json } from '@internship-app/types/src/json';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { LoaderIcon } from 'react-hot-toast';
import { useRoute } from 'wouter';
import { navigate } from 'wouter/use-location';

import { useGetIntern } from '../../api/useGetIntern';
import { useSetInterview } from '../../api/useSetInterview';
import AdminPage from '../../components/AdminPage';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import IntervieweeInfo from '../../components/IntervieweeInfo';
import MultistepForm from '../../components/MultistepForm';
import {
  filterInterviewSteps as getFilteredInterviewSteps,
  QuestionCategory,
} from '../../constants/interviewConstants';
import { Path } from '../../constants/paths';
import { defaultInterviewValues, interviewQuestions } from './data';
import InterviewQuestionHandler from './InterviewQuestionHandler';

const mapAnswersToQuestions = (
  answers: FieldValues,
): { [key: number]: Json } => {
  return interviewQuestions.map((q) => ({ ...q, ...answers[q.id] }));
};

const InterviewPage = () => {
  const [, params] = useRoute(Path.Interview);
  const internId = params?.internId;

  const { data: intern, isFetching } = useGetIntern(internId);
  const setInterview = useSetInterview(() => {
    navigate(Path.Intern.replace(':internId', params?.internId || ''));
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<FieldValues>({
    defaultValues: defaultInterviewValues,
  });

  const handleFormSubmit = (internId: string) =>
    form.handleSubmit((data) => {
      const answers = mapAnswersToQuestions(data);
      const score = Object.values(answers)
        .filter(
          (a) =>
            a.type === QuestionType.Slider &&
            a.category === QuestionCategory.Final,
        )
        .reduce((acc, curr) => acc + +curr.value, 0);

      setInterview.mutate({ internId, answers, score });
    })();

  const setUrl = (image: string) => {
    console.log(image);
  };

  if (isFetching) {
    return <LoaderIcon />;
  }

  if (!internId || !intern) {
    return <div>Intern ovog ID-a ne postoji!</div>;
  }

  if (intern.interviewStatus !== InterviewStatus.Pending) {
    return <div>Intervju status interna nije pending!</div>;
  }

  return (
    <AdminPage>
      <IntervieweeInfo setUrl={setUrl} intern={intern} />
      <MultistepForm
        questions={interviewQuestions}
        form={form}
        steps={getFilteredInterviewSteps(
          intern.internDisciplines.map((ind) => ind.discipline),
        )}
        onSubmit={() => setDialogOpen(true)}
        InputHandler={InterviewQuestionHandler}
      />
      <ConfirmDialog
        open={!!dialogOpen}
        handleClose={(confirmed) => {
          if (confirmed) handleFormSubmit(internId);
          setDialogOpen(false);
        }}
        title="Potvrdi unos intervjua!"
        description={`Uneseni intervju ne može se poništiti.`}
      />
    </AdminPage>
  );
};

export default InterviewPage;
