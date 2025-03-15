import { InterviewQuestion } from '@internship-app/types';
import InterviewQuestionContainer from '../InterviewQuestionContainer/InterviewQuestionContainer';

interface InterviewQuestionListProps {
  interviewQuestions?: InterviewQuestion[];
  setInterviewQuestions: Function;
}

const InterviewQuestionList: React.FC<InterviewQuestionListProps> = ({
  interviewQuestions,
  setInterviewQuestions,
}) => {
  return (
    <>
      {interviewQuestions ? (
        interviewQuestions.map((q) => (
          <InterviewQuestionContainer
            question={q}
            setInterviewQuestions={setInterviewQuestions}
            key={q.id}
          />
        ))
      ) : (
        <p>Trenutno nema pitanja.</p>
      )}
    </>
  );
};

export default InterviewQuestionList;
