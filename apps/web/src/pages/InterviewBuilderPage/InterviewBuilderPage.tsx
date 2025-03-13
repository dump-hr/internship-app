import { Button } from '@mui/material';
import AdminPage from '../../components/AdminPage';
import { useFetchAllInterviewQuestions } from '../../api/useFetchAllInterviewQuestions';
import InterviewQuestionList from '../../components/InterviewQuestionList/InterviewQuestionList';

export const InterviewBuilderPage = () => {
  const { data: interviewQuestions, isLoading } =
    useFetchAllInterviewQuestions();

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
