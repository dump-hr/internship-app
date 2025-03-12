import AdminPage from '../../components/AdminPage';
import './InterviewBuilderPage.css';
import InterviewQuestionList from '../../components/InterviewQuestionList';
import InterviewQuestionAddHandler from '../../components/InterviewQuestionAddHandler';

const InterviewBuilderPage = () => {
  return (
    <AdminPage>
      <InterviewQuestionAddHandler />
      <InterviewQuestionList />
    </AdminPage>
  );
};

export default InterviewBuilderPage;
