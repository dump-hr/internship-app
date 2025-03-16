import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TableContainer,
} from '@mui/material';
import { Link, useRoute } from 'wouter';
import { useFetchQuestionAnswers } from '../../api/useFetchQuestionAnswers';
import { Path } from '../../constants/paths';
import { useToggleQuestionAnswer } from '../../api/useToggleQuestionAnswer';
import AdminPage from '../../components/AdminPage';

export const InterviewQuestionStatsPage: React.FC = () => {
  const [, params] = useRoute(Path.InterviewQuestionStats);
  const questionId = params?.questionId;

  const {
    data: answers,
    error,
    isLoading,
  } = useFetchQuestionAnswers(questionId!);
  const { mutate: toggleAnswerFlag } = useToggleQuestionAnswer();

  const handleFlag = (answerId: string) => {
    toggleAnswerFlag(answerId);
  };

  if (isLoading) return <Typography>Loading stats...</Typography>;
  if (error) return <Typography>Error loading stats.</Typography>;

  return (
    <AdminPage headerText="Question Statistics">
      <Box sx={{ p: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Intern</TableCell>
                <TableCell>Answer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {answers && answers.length > 0 ? (
                answers.map((answer) => (
                  <TableRow key={answer.id}>
                    <TableCell>
                      {answer.interviewSlot && answer.interviewSlot.intern
                        ? `${answer.interviewSlot.intern.firstName} ${answer.interviewSlot.intern.lastName}`
                        : 'N/A'}
                    </TableCell>
                    <TableCell
                      sx={{ color: answer.flagged ? 'red' : 'inherit' }}
                    >
                      {JSON.stringify(answer.value)}
                    </TableCell>
                    <TableCell>
                      {new Date(answer.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        sx={{ mr: 1 }}
                        onClick={() => handleFlag(answer.id)}
                      >
                        {answer.flagged ? 'Unflag' : 'Flag'}
                      </Button>
                      <Button
                        variant="outlined"
                        component={Link}
                        href={`/admin/intern/${answer.interviewSlot?.intern?.id}`}
                      >
                        View Intern
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    No answers available for this question.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AdminPage>
  );
};
