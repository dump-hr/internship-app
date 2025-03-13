import { Button } from '@mui/material';
import AdminPage from '../../components/AdminPage';
import { useFetchAllInterviewQuestions } from '../../api/useFetchAllInterviewQuestions';

export const InterviewBuilderPage = () => {
  const { data: interviewQuestions } = useFetchAllInterviewQuestions();

  return (
    <AdminPage headerText="Interview builder">
      <h1>Trenutna pitanja</h1>
      <Button>Dodaj pitanje</Button>
      <Button>Spremi promjene</Button>
      {interviewQuestions?.map((q) => <p>{q.question}</p>)}
    </AdminPage>
  );
};
