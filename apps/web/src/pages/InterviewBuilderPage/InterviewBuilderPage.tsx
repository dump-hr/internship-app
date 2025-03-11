import AdminPage from '../../components/AdminPage';
import './InterviewBuilderPage.css';
import InterviewQuestionList from '../../components/InterviewQuestionList';
import InterviewQuestionAddForm from '../../components/InterviewQuestionAddForm';

const InterviewBuilderPage = () => {
  return (
    <AdminPage>
      <InterviewQuestionAddForm />
      <InterviewQuestionList />
    </AdminPage>
  );
};

export default InterviewBuilderPage;
