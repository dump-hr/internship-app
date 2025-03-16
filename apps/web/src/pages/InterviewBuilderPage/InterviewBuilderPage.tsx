import { LoaderIcon } from 'react-hot-toast';
import { useFetchInterviewQuestions } from '../../api/useFetchInterviewQuestions';
import AdminPage from '../../components/AdminPage';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from '@mui/material';

export const InterviewBuilderPage = () => {
  const { data, isLoading, error } = useFetchInterviewQuestions();

  if (isLoading)
    return (
      <AdminPage headerText="Interview Builder">
        <LoaderIcon />
      </AdminPage>
    );
  if (error)
    return (
      <AdminPage headerText="Interview Builder">
        <p>Error loading questions.</p>
      </AdminPage>
    );

  return (
    <AdminPage headerText="Interview Builder">
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Trenutna pitanja
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => {
            // Implement "Add question"
            console.log('Add question clicked');
          }}
        >
          Add Question
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((q) => (
                <TableRow key={q.id}>
                  <TableCell>{q.title}</TableCell>
                  <TableCell>{q.type}</TableCell>
                  <TableCell>{q.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        console.log('Edit question', q.id);
                        // Implement open Edit form
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        console.log('Stats question', q.id);
                        // Implement navigate to stats page
                      }}
                    >
                      Stats
                    </Button>
                    <Button
                      variant="outlined"
                      color={q.isActive ? 'secondary' : 'primary'}
                      onClick={() => {
                        console.log(
                          q.isActive ? 'Disable question' : 'Enable question',
                          q.id,
                        );
                        // Implement toggle status
                      }}
                    >
                      {q.isActive ? 'Disable' : 'Enable'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AdminPage>
  );
};
