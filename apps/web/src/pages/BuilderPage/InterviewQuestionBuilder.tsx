import { Box, Button, Typography } from '@mui/material';
import { useFetchInterviewQuestions } from '../../api/useFetchInterviewQuestions';
import {
  AddQuestionModal,
  QuestionInfo,
} from '../../components/InterviewBuilder';
import LayoutSpacing from '../../components/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import { useEffect, useState } from 'react';
import { Question } from '@internship-app/types';
import { useCreateInterviewQuestion } from '../../api/useCreateInterviewQuestion';
import toast, { LoaderIcon, Toaster } from 'react-hot-toast';
import { useUpdateInterviewQuestion } from '../../api/useUpdateInterviewQuestion';

export const InterviewQuestionBuilder = () => {
  const { data: allQuestions, isFetching } = useFetchInterviewQuestions();

  const [questions, setQuestions] = useState<Question[] | []>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const createInterviewQuestion = useCreateInterviewQuestion();
  const updateInterviewQuestion = useUpdateInterviewQuestion();

  useEffect(() => {
    if (allQuestions) {
      setQuestions([...allQuestions].reverse());
    }
  }, [allQuestions]);

  const handleAddQuestion = (newQuestion: Question) => {
    createInterviewQuestion.mutate(newQuestion, {
      onSuccess: (savedQuestion: Question) => {
        toast.success('Pitanje uspješno dodano!');
        setQuestions((prevQuestions) => [savedQuestion, ...prevQuestions]);
      },
    });
  };

  const handleEditQuestion = (updatedQuestion: Question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q,
      ),
    );
    updateInterviewQuestion.mutate(updatedQuestion);
  };

  if (isFetching) {
    return <LoaderIcon />;
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
