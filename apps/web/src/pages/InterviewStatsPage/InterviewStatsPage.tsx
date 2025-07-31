import { Question } from '@internship-app/types/';
import { useRoute } from 'wouter';

import { useFetchAllInterviewQuestions } from '@api/index';

import classes from './index.module.css';
import { LogoHeader, InterviewStatsAnswers } from '@components/index.ts';
import { Path } from '@constants/paths.ts';

export const InterviewStatsPage = () => {
  const [, params] = useRoute(Path.InterviewStats);
  const { data: allQuestion } = useFetchAllInterviewQuestions();

  if (!params) return <div>No question selected</div>;
  if (!allQuestion) return <div>Problem while fetching all questions</div>;

  const questionToFind = allQuestion.find(
    (question: Question) => question.id === params.question,
  );

  if (!questionToFind || !questionToFind.question)
    return <div>No question selected</div>;

  return (
    <>
      <LogoHeader text={'Question Stats'} />
      <main className={classes.questionStats}>
        <h1>Question Stats</h1>
        <InterviewStatsAnswers questionToFind={questionToFind.question} />
      </main>
    </>
  );
};
