import { Button } from '@mui/material';
import { useState } from 'react';
import { usePostInterviewQuestion } from '../../api/usePostInterviewQuestion';
import InterviewQuestionDialog from '../InterviewQuestionDialog/InterviewQuestionDialog';
import { InterviewQuestion } from '@internship-app/types';

const InterviewQuestionAddHandler = () => {
  const postInterviewQuestion = usePostInterviewQuestion();
  const [dialogState, setDialogState] = useState<boolean>(false);

  const toggleDialog = () => {
    setDialogState(!dialogState);
  };

  const handleSubmitAdd = (question: InterviewQuestion) => {
    postInterviewQuestion.mutate(question);
    toggleDialog();
  };

  return (
    <>
      <Button onClick={toggleDialog}>+ Dodaj pitanje</Button>

      <InterviewQuestionDialog
        open={dialogState}
        onClose={() => toggleDialog()}
        onSubmit={handleSubmitAdd}
        mode="add"
      />
    </>
  );
};

export default InterviewQuestionAddHandler;
