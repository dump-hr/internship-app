import {
  InterviewQuestion,
  InterviewQuestionCategory,
} from '@internship-app/types';
import { Button } from '@mui/material';
import InterviewQuestionEditor from '../InterviewQuestionEditor/InterviewQuestionEditor';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Path } from '../../constants/paths';

interface InterviewQuestionContainerProps {
  question: InterviewQuestion;
  setInterviewQuestions: Function;
}

const InterviewQuestionContainer: React.FC<InterviewQuestionContainerProps> = ({
  question,
  setInterviewQuestions,
}) => {
  const [interviewQuestion, setInterviewQuestion] = useState(question);
  const [isQuestionEditorOpen, setIsQuestionEditorOpen] = useState(false);
  const statsPath = Path.InterviewQuestionStats.split(':')[0] + question.id;

  useEffect(() => {
    updateQuestions();
  }, [interviewQuestion]);

  function updateQuestions() {
    setInterviewQuestions((prev: InterviewQuestion[]) =>
      prev.map((q: InterviewQuestion) =>
        q.id === interviewQuestion.id ? interviewQuestion : q,
      ),
    );
  }

  function toggleEnableQuestion() {
    setInterviewQuestion((prev) => ({ ...prev, isEnabled: !prev.isEnabled }));
  }

  function toggleQuestionEditor() {
    setIsQuestionEditorOpen((prev) => !prev);
  }

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
        <Button onClick={toggleEnableQuestion}>
          {interviewQuestion.isEnabled ? 'Disable' : 'Enable'}
        </Button>
        <Button onClick={toggleQuestionEditor}>Edit</Button>
        <Button component={Link} to={statsPath}>
          Stats
        </Button>
      </div>
      {isQuestionEditorOpen && (
        <InterviewQuestionEditor
          interviewQuestion={interviewQuestion}
          setInterviewQuestion={setInterviewQuestion}
        />
      )}
    </>
  );
};

export default InterviewQuestionContainer;
