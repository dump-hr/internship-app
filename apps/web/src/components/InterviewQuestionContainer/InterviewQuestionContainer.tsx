import {
  InterviewQuestion,
  InterviewQuestionCategory,
} from '@internship-app/types';
import { Button, Chip } from '@mui/material';
import InterviewQuestionEditor from '../InterviewQuestionEditor/InterviewQuestionEditor';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Path } from '../../constants/paths';
import styles from './InterviewQuestionContainer.module.css';

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
      <div className={styles.interviewQuestionContainer}>
        <p>{interviewQuestion.question}</p>
        <Chip
          label={
            interviewQuestion.category ===
            InterviewQuestionCategory.DisciplineSpecific
              ? interviewQuestion.discipline
              : interviewQuestion.category
          }
          key={interviewQuestion.id}
        />
        <Button
          onClick={toggleEnableQuestion}
          variant="contained"
          color={interviewQuestion.isEnabled ? 'error' : 'success'}
        >
          {interviewQuestion.isEnabled ? 'Disable' : 'Enable'}
        </Button>
        <Button onClick={toggleQuestionEditor} variant="contained">
          Edit
        </Button>
        <Button
          component={Link}
          to={statsPath}
          variant="contained"
          color="secondary"
        >
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
