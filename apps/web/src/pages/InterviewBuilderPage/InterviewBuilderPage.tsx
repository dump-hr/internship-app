import { Button } from '@mui/material';
import AdminPage from '../../components/AdminPage';
import { useFetchAllInterviewQuestions } from '../../api/useFetchAllInterviewQuestions';
import InterviewQuestionList from '../../components/InterviewQuestionList/InterviewQuestionList';
import { InterviewQuestion } from '@internship-app/types';
import { useEffect, useState } from 'react';

export const InterviewBuilderPage = () => {
  const { data, isLoading } = useFetchAllInterviewQuestions();
  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewQuestion[]
  >([]);

  useEffect(() => {
    if (data) setInterviewQuestions(data);
  }, [data]);

  return (
    <AdminPage headerText="Interview builder">
      <h1>Trenutna pitanja</h1>
      <Button>Dodaj pitanje</Button>
      <Button>Spremi promjene</Button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <InterviewQuestionList interviewQuestions={interviewQuestions} />
      )}
    </AdminPage>
  );
};
