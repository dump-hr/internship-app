import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useRoute } from 'wouter';

import { useFetchTestAnswers } from '../../api/useFetchTestAnswers';
import AdminPage from '../../components/AdminPage';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { Path } from '../../constants/paths';

const TestReviewPage = () => {
  const [, params] = useRoute(Path.TestReview);

  const {
    data: answers,
    error,
    isLoading,
  } = useFetchTestAnswers(params?.group, params?.groupId, params?.testSlotId);

  const [selectedAnswer, setSelectedAnswer] = useState(0);

  if (isLoading) {
    return <AdminPage>Loading...</AdminPage>;
  }

  if (error || !answers) {
    return <AdminPage>Error: {error?.toString()}</AdminPage>;
  }

  return (
    <AdminPage>
      <Box mb={2} display="flex" gap={1}>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          label="Ocjena zadatka"
          inputProps={{ min: 0, max: answers[selectedAnswer].question.points }}
          style={{ width: '200px' }}
        />
        <Button variant="contained" color="secondary">
          Ocjeni
        </Button>
      </Box>

      <CodeEditor
        language={answers[selectedAnswer].language.toLowerCase()}
        code={answers[selectedAnswer].code}
        setCode={(code) => console.log(code)}
        questionTitle={answers[selectedAnswer].question.title}
        questionText={answers[selectedAnswer].question.text}
        nextQuestion={() => setSelectedAnswer((prev) => prev + 1)}
        prevQuestion={() => setSelectedAnswer((prev) => prev - 1)}
        isFirstQuestion={selectedAnswer === 0}
        isLastQuestion={selectedAnswer === answers.length - 1}
        headerHeight={156}
      />
    </AdminPage>
  );
};

export default TestReviewPage;
