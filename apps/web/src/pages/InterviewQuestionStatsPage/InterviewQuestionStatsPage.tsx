import { useRoute } from 'wouter';
import AdminPage from '../../components/AdminPage';
import { Path } from '../../constants/paths';
import { useFetchInterviewQuestionAnswers } from '../../api/useFetchInterviewQuestionAnswers';
import { useFetchInterviewQuestion } from '../../api/useFetchInterviewQuestion';

const InterviewQuestionStatsPage = () => {
  const [, params] = useRoute(Path.InterviewQuestionStats);
  const questionId: string = params?.questionId ?? '';
  const { data: question, isLoading: isQuestionLoading } =
    useFetchInterviewQuestion(questionId);
  const { data: answers, isLoading: areAnswersLoading } =
    useFetchInterviewQuestionAnswers(questionId);

  return (
    <AdminPage headerText="Question stats">
      {isQuestionLoading || areAnswersLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {question ? (
            <>
              <h2>Pitanje: {question.question}</h2>
              {answers && answers?.length > 0 ? (
                answers.map((a) => (
                  <div key={a.id} className="question-answer">
                    <p>
                      {a.internDiscipline.intern.firstName}{' '}
                      {a.internDiscipline.intern.lastName}: {a.answer}
                    </p>
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
