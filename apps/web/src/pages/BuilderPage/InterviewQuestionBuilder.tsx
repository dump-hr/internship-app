import { Box, Button, Typography } from '@mui/material';
import { useFetchInterviewQuestions } from '../../api/useFetchInterviewQuestions';
import {
  AddQuestionModal,
  QuestionInfo,
} from '../../components/InterviewBuilder';
import LayoutSpacing from '../../components/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import { useState } from 'react';
import { InterviewQuestion } from '@internship-app/types';
import { useCreateInterviewQuestion } from '../../api/useCreateInterviewQuestion';
import toast, { Toaster } from 'react-hot-toast';

export const InterviewQuestionBuilder = () => {
  const { data: allQuestions, isFetching } = useFetchInterviewQuestions();

  const [modalOpen, setModalOpen] = useState(false);

  const createInterviewQuestion = useCreateInterviewQuestion();

  const handleAddQuestion = (newQuestion: InterviewQuestion) => {
    console.log('Dodano pitanje:', newQuestion);

    createInterviewQuestion.mutate(newQuestion, {
      onSuccess: () => {
        toast.success('Pitanje uspješno dodano!');
      },
    });
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!allQuestions || allQuestions.length === 0) {
    return <p>Nema pitanja</p>;
  }

  return (
    <div>
      <LogoHeader text="Builder" />
      <br />
      <LayoutSpacing>
        <Box display="flex" gap="20px">
          <Typography variant="h5">Trenutna pitanja</Typography>
          <Button variant="outlined" onClick={() => setModalOpen(true)}>
            Dodaj pitanje
          </Button>
          <Button variant="outlined">Spremi promjene</Button>
        </Box>

        {modalOpen && (
          <AddQuestionModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            handleAddQuestion={handleAddQuestion}
          />
        )}

        {allQuestions.map((question) => (
          <QuestionInfo question={question} />
        ))}
      </LayoutSpacing>
      <Toaster />
    </div>
  );
};
