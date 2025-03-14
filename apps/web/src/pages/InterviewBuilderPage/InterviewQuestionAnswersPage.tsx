import { useRoute } from 'wouter';
import { useQueryClient } from 'react-query';
import { Link } from 'wouter';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import { useQuestionAnswers } from '../../api/useQuestionAnswers';
import { useToggleAnswerFlag } from '../../api/useToggleAnswerFlag';

export const InterviewQuestionAnswersPage = () => {
  const [match, params] = useRoute('/admin/interview-builder/:id/stats');
  const queryClient = useQueryClient();
  const { data: answers } = useQuestionAnswers(params?.id);
  const { mutateAsync: toggleFlag } = useToggleAnswerFlag();

  const handleToggleFlag = async (answerId: string) => {
    await toggleFlag(answerId);
    queryClient.invalidateQueries(['questionAnswers', params?.id]);
  };

  if (!match || !params?.id) return null;

  return (
    <>
      <LogoHeader text="Answer Statistics" />
      <LayoutSpacing>
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
              {answers?.map((answer: any) => (
                <TableRow key={answer.id}>
                  <TableCell>
                    {answer.interviewSlot?.intern?.firstName}{' '}
                    {answer.interviewSlot?.intern?.lastName}
                  </TableCell>
                  <TableCell>{Object.values(answer.value)}</TableCell>
                  <TableCell>
                    {new Date(answer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={answer.flagged ? 'Flagged' : 'Flag'}
                      color={answer.flagged ? 'error' : 'default'}
                      onClick={() => handleToggleFlag(answer.id)}
                      variant={answer.flagged ? 'filled' : 'outlined'}
                    />
                    <Button
                      component={Link}
                      href={`/admin/intern/${answer.interviewSlot?.internId}`}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      View Intern
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </LayoutSpacing>
    </>
  );
};
