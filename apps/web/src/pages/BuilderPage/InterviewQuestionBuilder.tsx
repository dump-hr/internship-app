import { Box, Button, Typography } from '@mui/material';
import { useFetchInterviewQuestions } from '../../api/useFetchInterviewQuestions';
import {
  AddQuestionModal,
  QuestionInfo,
} from '../../components/InterviewBuilder';
import LayoutSpacing from '../../components/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import { useEffect, useState } from 'react';
import { InterviewQuestion } from '@internship-app/types';
import { useCreateInterviewQuestion } from '../../api/useCreateInterviewQuestion';
import toast, { Toaster } from 'react-hot-toast';
import { useUpdateInterviewQuestion } from '../../api/useUpdateInterviewQuestion';

export const InterviewQuestionBuilder = () => {
  const { data: allQuestions, isFetching } = useFetchInterviewQuestions();

  const [questions, setQuestions] = useState<InterviewQuestion[] | []>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const createInterviewQuestion = useCreateInterviewQuestion();
  const updateInterviewQuestion = useUpdateInterviewQuestion();

  useEffect(() => {
    if (allQuestions) {
      const sortedQuestions = allQuestions.reverse();
      setQuestions(sortedQuestions);
    }
  }, [allQuestions]);

  const handleAddQuestion = (newQuestion: InterviewQuestion) => {
    createInterviewQuestion.mutate(newQuestion, {
      onSuccess: (savedQuestion: InterviewQuestion) => {
        toast.success('Pitanje uspješno dodano!');
        setQuestions((prevQuestions) => [savedQuestion, ...prevQuestions]);
      },
    });
  };

  const handleEditQuestion = (updatedQuestion: InterviewQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q,
      ),
    );
    updateInterviewQuestion.mutate(updatedQuestion);
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!questions || questions.length === 0) {
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
        </Box>

        {modalOpen && (
          <AddQuestionModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            handleAddQuestion={handleAddQuestion}
          />
        )}

        {questions.map((question) => (
          <QuestionInfo
            key={question.id}
            question={question}
            handleEditQuestion={handleEditQuestion}
          />
        ))}
      </LayoutSpacing>
      <Toaster />
    </div>
  );
};
