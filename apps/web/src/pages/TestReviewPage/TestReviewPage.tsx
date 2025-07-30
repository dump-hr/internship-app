import { InternQuestionAnswer } from '@internship-app/types';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useRoute } from 'wouter';

import { useFetchTestAnswers } from '../../api/useFetchTestAnswers';
import { useSetTestScore } from '../../api/useSetTestScore';
import { AdminPage, CodeEditor } from '@components/index';
import { Path } from '@constants/index';
import c from './TestReviewPage.module.css';

export const TestReviewPage = () => {
  const [, params] = useRoute(Path.TestReview);

  const {
    data: answers,
    error,
    isLoading,
  } = useFetchTestAnswers(params?.group, params?.groupId, params?.testSlotId);
  const { mutateAsync } = useSetTestScore();
  const queryClient = useQueryClient();

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
      <div className={c.breakOutOfLayout}>
        <Box mb={2} ml={2} display="flex" gap={1} alignItems="center">
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
              await mutateAsync({
                answerId: answers[selectedAnswer].id,
                score,
              });
              queryClient.invalidateQueries([
                'test-answers',
                params?.testSlotId,
                params?.group,
                params?.groupId,
              ]);
            }}
          >
            {answers[selectedAnswer].score !== null
              ? 'Ponovo ocijeni'
              : 'Ocijeni'}
          </Button>
          <Box ml={2}>
            {selectedAnswer + 1}/{answers.length}
          </Box>
        </Box>

        <CodeEditor
          language={answers[selectedAnswer].language}
          code={answers[selectedAnswer].code}
          setCode={(code) =>
            queryClient.setQueryData(
              [
                'test-answers',
                params?.testSlotId,
                params?.group,
                params?.groupId,
              ],
              (prev: InternQuestionAnswer[] | undefined) =>
                prev?.map((answer, i) =>
                  i === selectedAnswer ? { ...answer, code } : answer,
                ) ?? [],
            )
          }
          questionTitle={`${answers[selectedAnswer].question.title} [${maxPoints}b]`}
          questionText={answers[selectedAnswer].question.text}
          nextQuestion={() => setSelectedAnswer((prev) => prev + 1)}
          prevQuestion={() => setSelectedAnswer((prev) => prev - 1)}
          isFirstQuestion={selectedAnswer === 0}
          isLastQuestion={selectedAnswer === answers.length - 1}
          headerHeight={156}
        />
      </div>
    </AdminPage>
  );
};
