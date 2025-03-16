import { InterviewSlot } from '@internship-app/types';
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'wouter';

import { useFetchAllInterviewSlots } from '../../api/useFetchAllInterviewSlots.tsx';
import { useUpdateFlagInAnswers } from '../../api/useUpdateFlagInAnswers.ts';

interface InterviewStatsAnswersProps {
  questionToFind: string;
}

export const InterviewStatsAnswers = ({
  questionToFind,
}: InterviewStatsAnswersProps) => {
  const { data: slots, isLoading, isError } = useFetchAllInterviewSlots();
  const { mutateAsync } = useUpdateFlagInAnswers();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !slots) return <div>Error loading data</div>;

  const extractAnswersWithInterns = (data: InterviewSlot[]) => {
    return data.flatMap((slot) => {
      if (slot.intern) {
        const internName = `${slot.intern.firstName} ${slot.intern.lastName}`;
        const internId = `${slot.intern.id}`;
        if (Array.isArray(slot.answers)) {
          return slot.answers
            .filter(
              (answer) =>
                typeof answer.value === 'string' && answer.value.trim() !== '',
            )
            .map((answer) => ({
              id: slot.id,
              internName,
              internId,
              question: answer.question,
              answer: answer.value,
              tick: answer.tick,
              answerId: answer.id,
            }));
        }
      }

      return [];
    });
  };

  const handleChangeFlag = (
    slotId: string,
    tick: boolean,
    answerId: string,
  ) => {
    mutateAsync({ slotId, tick, answerId });
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
      flex: 2,
      editable: false,
    },
    {
      field: 'tick',
      headerName: 'Checked',
      flex: 1,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              console.log(params);
              handleChangeFlag(
                params.row.id,
                !params.row.tick,
                params.row.answerId,
              );
            }}
            style={{ marginRight: 8 }}
          >
            Flag
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            component={Link}
            to={`/admin/intern/${params.row.internId}`}
          >
            Uđi u pripravnika
          </Button>
        </>
      ),
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
