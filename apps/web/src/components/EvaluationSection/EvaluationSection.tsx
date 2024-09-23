import { ResultsTable } from '../ResultsTable/ResultsTable';
import { Box, Button, Typography } from '@mui/material';
import { useFetchAllResults } from '../../api/useFetchAllResults';
import { useEvaluateAnswer } from '../../api/useEvaluateAnswer';
import {
  CodingLanguage,
  CreateEvaluationSubmissionRequest,
} from '@internship-app/types';

export interface EvaluationSectionProps {
  questionId: string;
  internEmail: string;
  code: string;
  language: CodingLanguage;
  isOverview?: boolean;
}

export const EvaluationSection = ({
  code,
  language,
  isOverview = false,
  internEmail,
  questionId,
}: EvaluationSectionProps) => {
  const {
    data: results,
    isLoading: resultsLoading,
    refetch: refetchResults,
  } = useFetchAllResults({ internId: '1', questionId });

  const { mutateAsync, isSuccess } = useEvaluateAnswer();

  const handleSubmit = async () => {
    const body: CreateEvaluationSubmissionRequest = {
      language,
      code,
      internEmail,
    };

    await mutateAsync({
      questionId,
      body,
    });

    isSuccess && (await refetchResults());
  };

  if (resultsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h6">Evaluation Section</Typography>
      <ResultsTable results={results || []} />
      {!isOverview && <Button onClick={handleSubmit}>Evaluate Answer</Button>}
    </Box>
  );
};
