import { InterviewSlot } from '@internship-app/types';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useFetchAllInterviewSlots } from '../../api/useFetchAllInterviewSlots.tsx';

interface InterviewStatsAnswersProps {
  questionToFind: string;
}

export const InterviewStatsAnswers = ({
  questionToFind,
}: InterviewStatsAnswersProps) => {
  const { data: slots, isLoading, isError } = useFetchAllInterviewSlots();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !slots) return <div>Error loading data</div>;

  const extractAnswersWithInterns = (data: InterviewSlot[]) => {
    return data.flatMap((slot) => {
      if (slot.intern) {
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
    return data.filter((item) =>
      item.question.toLowerCase().includes(question.toLowerCase()),
    );
  };

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
    <>
      <h1>{questionToFind}</h1>
      <Box sx={{ width: '90%' }}>
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
    </>
  );
};
