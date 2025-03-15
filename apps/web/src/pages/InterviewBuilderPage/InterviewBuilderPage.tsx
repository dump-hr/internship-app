import { useFetchInterviewQuestions } from '../../api/useFetchInterviewQuestions';
import AdminPage from '../../components/AdminPage';

export const InterviewBuilderPage = () => {
  const { data, isLoading, error } = useFetchInterviewQuestions();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading questions.</p>;

  return (
    <AdminPage headerText="Interview Builder">
      <h1>Interview Builder</h1>
      {data?.map((q) => <div key={q.id}>{q.title}</div>)}
    </AdminPage>
  );
};
