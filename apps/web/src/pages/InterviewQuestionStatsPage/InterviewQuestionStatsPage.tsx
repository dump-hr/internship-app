import { Link, useRoute } from 'wouter';
import AdminPage from '../../components/AdminPage';
import { Path } from '../../constants/paths';
import { useFetchInterviewQuestionAnswers } from '../../api/useFetchInterviewQuestionAnswers';
import { useFetchInterviewQuestion } from '../../api/useFetchInterviewQuestion';
import { Button } from '@mui/material';
import { InterviewQuestionAnswer } from '@internship-app/types';
import { useEffect, useState } from 'react';
import { useUpdateInterviewQuestionAnswerFlag } from '../../api/useUpdateInterviewQuestionAnswerFlag';
import styles from './InterviewQuestionStatsPage.module.css';

const InterviewQuestionStatsPage = () => {
  const [, params] = useRoute(Path.InterviewQuestionStats);
  const questionId: string = params?.questionId ?? '';
  const { data: question, isLoading: isQuestionLoading } =
    useFetchInterviewQuestion(questionId);
  const { data: answers, isLoading: areAnswersLoading } =
    useFetchInterviewQuestionAnswers(questionId);
  const updateFlag = useUpdateInterviewQuestionAnswerFlag();
  const [interviewQuestionAnswers, setInterviewQuestionAnswers] = useState<
    InterviewQuestionAnswer[]
  >([]);
  const internPath = Path.Intern.split(':')[0];

  useEffect(() => {
    if (answers) setInterviewQuestionAnswers(answers);
  }, [answers]);

  function toggleFlag(answer: InterviewQuestionAnswer) {
    const newAnswer: InterviewQuestionAnswer = {
      ...answer,
      flag: !answer.flag,
    };
    setInterviewQuestionAnswers((prev: InterviewQuestionAnswer[]) =>
      prev.map((a: InterviewQuestionAnswer) =>
        a.id === newAnswer.id ? newAnswer : a,
      ),
    );
    updateFlag.mutate(newAnswer);
  }

  return (
    <AdminPage headerText="InterviewQuestion stats">
      {isQuestionLoading || areAnswersLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {question ? (
            <>
              <h2>Pitanje: {question.question}</h2>
              {interviewQuestionAnswers &&
              interviewQuestionAnswers?.length > 0 ? (
                interviewQuestionAnswers.map((a) => (
                  <div key={a.id} className={styles.questionAnswer}>
                    <p>
                      {a.intern.firstName} {a.intern.lastName}: {a.answer}
                    </p>
                    <Button
                      variant="contained"
                      color={a.flag ? 'error' : 'primary'}
                      onClick={() => toggleFlag(a)}
                    >
                      Flag
                    </Button>
                    <Button
                      component={Link}
                      to={internPath + a.intern.id}
                      variant="contained"
                      color="warning"
                    >
                      Uđi u pripravnika
                    </Button>
                  </div>
                ))
              ) : (
                <p>Nema odgovora trenutno.</p>
              )}
            </>
          ) : (
            <p>Pitanje nije pronađeno.</p>
          )}
        </>
      )}
    </AdminPage>
  );
};

export default InterviewQuestionStatsPage;
