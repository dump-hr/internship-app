import { Box, Button, Typography } from '@mui/material';
import { useFetchInterviewQuestions } from '../../api/useFetchInterviewQuestions';
import {
  AddQuestionModal,
  QuestionInfo,
} from '../../components/InterviewBuilder';
import LayoutSpacing from '../../components/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import { useState } from 'react';
import { Question } from '@internship-app/types';

export const InterviewQuestionBuilder = () => {
  const { data: allQuestions, isFetching } = useFetchInterviewQuestions();

  const [modalOpen, setModalOpen] = useState(false);

  const handleAddQuestion = (newQuestion: Question) => {
    console.log('Dodano pitanje:', newQuestion);
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
    </div>
  );
};
