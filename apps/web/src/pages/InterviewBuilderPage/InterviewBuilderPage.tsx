import { Button } from '@mui/material';
import AdminPage from '../../components/AdminPage';
import { useFetchAllInterviewQuestions } from '../../api/useFetchAllInterviewQuestions';
import InterviewQuestionList from '../../components/InterviewQuestionList/InterviewQuestionList';
import {
  InterviewQuestion,
  InterviewQuestionCategory,
  InterviewQuestionType,
} from '@internship-app/types';
import { useEffect, useRef, useState } from 'react';
import { usePostInterviewQuestions } from '../../api/usePostInterviewQuestions';

export const InterviewBuilderPage = () => {
  const { data, isLoading } = useFetchAllInterviewQuestions();
  const postInterviewQuestions = usePostInterviewQuestions();
  const [interviewQuestions, setInterviewQuestions] = useState<
    InterviewQuestion[]
  >([]);
  const newId = useRef<number>(0);

  useEffect(() => {
    if (data) setInterviewQuestions(data);
  }, [data]);

  function createNewQuestion() {
    const newQuestion: InterviewQuestion = {
      id: newId.current.toString(),
      question: 'Novo pitanje',
      type: InterviewQuestionType.Field,
      category: InterviewQuestionCategory.General,
      isEnabled: true,
    };

    setInterviewQuestions((prev) => [newQuestion, ...prev]);
    newId.current++;
  }

  return (
    <AdminPage headerText="Interview builder">
      <h1>Trenutna pitanja</h1>
      <Button onClick={createNewQuestion}>Dodaj pitanje</Button>
      <Button onClick={() => postInterviewQuestions.mutate(interviewQuestions)}>
        Spremi promjene
      </Button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <InterviewQuestionList
          interviewQuestions={interviewQuestions}
          setInterviewQuestions={setInterviewQuestions}
        />
      )}
    </AdminPage>
  );
};
