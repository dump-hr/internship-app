import { InterviewQuestion } from '@internship-app/types';
import InterviewQuestionContainer from '../InterviewQuestionContainer/InterviewQuestionContainer';

interface InterviewQuestionListProps {
  interviewQuestions?: InterviewQuestion[];
}

const InterviewQuestionList: React.FC<InterviewQuestionListProps> = ({
  interviewQuestions,
}) => {
  return (
    <>
      {interviewQuestions ? (
        interviewQuestions.map((q) => (
          <InterviewQuestionContainer interviewQuestion={q} key={q.id} />
        ))
      ) : (
        <p>Trenutno nema pitanja.</p>
      )}
    </>
  );
};

export default InterviewQuestionList;
