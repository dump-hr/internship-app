import { InterviewSlot } from '@internship-app/types';

import { useFetchAllInterviewSlots } from '../../api/useFetchAllInterviewSlots.tsx';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export const InterviewStatsAnswers = () => {
  const slots = useFetchAllInterviewSlots().data as InterviewSlot[] | undefined;

  if (!slots) return <div>Loading...</div>;

  const extractAnswersWithInterns = (data: InterviewSlot[]) => {
    return data.flatMap((slot) => {
      const internName = `${slot.intern.firstName} ${slot.intern.lastName}`;

      if (Array.isArray(slot.answers)) {
        return slot.answers.map((answer) => ({
          id: slot.id,
          internName,
          question: answer.question,
          answer: answer.value,
        }));
      } else if (typeof slot.answers === 'object' && slot.answers !== null) {
        return Object.values(slot.answers).map((answer) => ({
          id: slot.id,
          internName,
          question: answer,
          answer: answer,
        }));
      }
      return [];
    });
  };

  const allAnswersWithInterns = extractAnswersWithInterns(slots);

  const getAnswersForQuestion = (
    data: {
      id: string;
      internName: string;
      question: string;
      answer: string;
    }[],
    question: string,
  ) => {
    return data.filter(
      (item) => item.question.toLowerCase() === question.toLowerCase(),
    );
  };

  const questionToFind =
    'Jesi li se prethodno prijavljivao na DUMP Internship?';
  const answersWithInterns = getAnswersForQuestion(
    allAnswersWithInterns,
    questionToFind,
  );

  const columns: GridColDef[] = [
    {
      field: 'internName',
      headerName: 'Intern',
      flex: 1,
      editable: false,
    },
    {
      field: 'answer',
      headerName: 'Answer',
      flex: 1,
      editable: false,
    },
  ];

  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={answersWithInterns}
        autoHeight
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
      />
    </Box>
  );
};
