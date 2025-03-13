import { useFetchInterviewQuestions } from '../../api/useFetchInterviewQuestions';
import { QuestionInfo } from '../../components/InterviewBuilder';
import LayoutSpacing from '../../components/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';

export const InterviewQuestionBuilder = () => {
  const { data: allQuestions, isFetching } = useFetchInterviewQuestions();

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!allQuestions || allQuestions.length === 0) {
    return <p>Nema pitanja</p>;
  }
  console.log(allQuestions);
  return (
    <div>
      <LogoHeader text="Builder" />
      <br />
      <LayoutSpacing>
        {allQuestions.map((question) => (
          <QuestionInfo question={question} />
        ))}
      </LayoutSpacing>
    </div>
  );
};
