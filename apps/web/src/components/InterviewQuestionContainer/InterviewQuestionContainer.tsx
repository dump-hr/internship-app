import {
  InterviewQuestion,
  InterviewQuestionCategory,
} from '@internship-app/types';
import { Button } from '@mui/material';
import InterviewQuestionEditor from '../InterviewQuestionEditor/InterviewQuestionEditor';

interface InterviewQuestionContainerProps {
  interviewQuestion: InterviewQuestion;
}

const InterviewQuestionContainer: React.FC<InterviewQuestionContainerProps> = ({
  interviewQuestion,
}) => {
  return (
    <>
      <div className="interview-question-container">
        <p>{interviewQuestion.question}</p>
        <p>
          {interviewQuestion.category ===
          InterviewQuestionCategory.DisciplineSpecific
            ? interviewQuestion.discipline
            : interviewQuestion.category}
        </p>
        <Button>{interviewQuestion.isEnabled ? 'Disable' : 'Enable'}</Button>
        <Button>Edit</Button>
        <Button>Stats</Button>
      </div>
      <InterviewQuestionEditor interviewQuestion={interviewQuestion} />
    </>
  );
};

export default InterviewQuestionContainer;
