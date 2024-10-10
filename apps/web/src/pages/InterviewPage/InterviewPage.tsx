import { Intern, InterviewStatus, QuestionType } from '@internship-app/types';
import { Json } from '@internship-app/types/src/json';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { LoaderIcon } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { Link, useRoute } from 'wouter';
import { navigate } from 'wouter/use-location';

import { useFetchIntern } from '../../api/useFetchIntern';
import { useSetImage } from '../../api/useSetImage';
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

  const { data: intern, isFetching } = useFetchIntern(internId);
  const setInterview = useSetInterview(() => {
    navigate(Path.Intern.replace(':internId', params?.internId || ''));
  });
  const setImage = useSetImage();
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);

  const localFormValue = JSON.parse(
    localStorage.getItem(`interview ${internId}`)!,
  );
  const form = useForm<FieldValues>({
    defaultValues: { ...defaultInterviewValues, ...localFormValue },
  });

  useEffect(() => {
    const formSaver = setInterval(() => {
      localStorage.setItem(
        `interview ${internId}`,
        JSON.stringify(form.getValues()),
      );
    }, 5000);

    return () => clearInterval(formSaver);
  });

  useEffect(() => {
    const internAnswers = Object.values(
      intern?.interviewSlot?.answers || {},
    ) as unknown as Json[];
    if (!internAnswers.length) return;

    const answersValues = Object.values(internAnswers).reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id as string]: { value: curr.value, tick: curr.tick },
      }),
      {},
    );
    form.reset({ ...defaultInterviewValues, ...answersValues });
  }, [form, intern]);

  const handleFormSubmit = (internId: string) =>
    form.handleSubmit((data) => {
      const answers = mapAnswersToQuestions(data);
      const score = Object.values(answers)
        .filter(
          (a) =>
            (a.type === QuestionType.Slider &&
              a.category === QuestionCategory.Final) ||
            (a.type === QuestionType.Slider &&
              a.category === QuestionCategory.Marketing),
        )
        .reduce((acc, curr) => acc + +curr.value, 0);

      setInterview.mutate({ internId, answers, score });
    })();

  const handleSetImage = async (base64: string) => {
    if (!internId) return;

    if (!base64) {
      queryClient.setQueryData(
        ['intern', internId],
        (prev: Intern | undefined) => ({ ...prev, image: '' }) as Intern,
      );
      return;
    }

    const blob = await fetch(base64).then((res) => res.blob());
    const image = await setImage.mutateAsync({ internId, blob });

    queryClient.setQueryData(
      ['intern', internId],
      (prev: Intern | undefined) => ({ ...prev, image }) as Intern,
    );
  };

  if (isFetching) {
    return <LoaderIcon />;
  }

  if (!internId || !intern) {
    return <div>Intern ovog ID-a ne postoji!</div>;
  }

  if (intern.interviewStatus !== InterviewStatus.Pending) {
    return (
      <div>
        <p>
          Intervju status interna {intern.firstName} {intern.lastName} nije
          pending nego {intern.interviewStatus}!
        </p>
        <Link to={Path.Intern.replace(':internId', intern.id)}>
          Otvori profil
        </Link>
      </div>
    );
  }

  return (
    <AdminPage>
      <IntervieweeInfo
        image={intern.image || ''}
        setImage={handleSetImage}
        intern={intern}
      />
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
