import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';

import { useFetchTestAnswers } from '../../api/useFetchTestAnswers';
import { useSetTestScore } from '../../api/useSetTestScore';
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
  const { mutateAsync } = useSetTestScore();

  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [score, setScore] = useState(0);

  const maxPoints = answers?.[selectedAnswer].question.points ?? 0;

  useEffect(() => {
    if (!answers) return;
    setScore(answers[selectedAnswer].score || 0);
  }, [selectedAnswer, answers]);

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
          style={{ width: '200px' }}
          value={score}
          onChange={(e) => setScore(+e.target.value || 0)}
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={score > maxPoints || score < 0}
          onClick={async () => {
            await mutateAsync({ answerId: answers[selectedAnswer].id, score });
          }}
        >
          Ocijeni
        </Button>
      </Box>

      <CodeEditor
        language={answers[selectedAnswer].language}
        code={answers[selectedAnswer].code}
        setCode={(code) => console.log(code)}
        questionTitle={`${answers[selectedAnswer].question.title} [${maxPoints}b]`}
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
