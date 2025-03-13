import { InterviewQuestion } from '@internship-app/types';

interface InterviewQuestionListProps {
  interviewQuestions?: InterviewQuestion[];
}

const InterviewQuestionList: React.FC<InterviewQuestionListProps> = ({
  interviewQuestions,
}) => {
  console.log(interviewQuestions);

  return (
    <>
      {interviewQuestions ? (
        interviewQuestions.map((q) => <p key={q.id}>{q.question}</p>)
      ) : (
        <p>Trenutno nema pitanja.</p>
      )}
    </>
  );
};

export default InterviewQuestionList;
