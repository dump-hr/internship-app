import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { useState } from 'react';

import { useFetchAllInterviewQuestions } from '../../api/usefetchAllInterviewQuestions.tsx';
import { InterviewQuestionForm } from '../InterviewQuestionForm/InterviewQuestionForm.tsx';
import { useUpdateInterviewQuestion } from '../../api/useUpdateInterviewQuestion.ts';
import toast from 'react-hot-toast';

// interface SelectEditProps extends GridRenderEditCellParams {
//   options: string[];
// }

export const InterviewQuestions = () => {
  const { data: allQuestions } = useFetchAllInterviewQuestions();
  const { mutateAsync } = useUpdateInterviewQuestion();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [showForm, setShowForm] = useState(false);
  const handleAddQuestionClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleEditClick = (id: string) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = async (id: string) => {
    if (!allQuestions) return;
    const updatedRow = allQuestions.find((question) => question.id === id);

    if (!updatedRow) return;

    if (!updatedRow.question?.trim()) {
      toast.error(`Question cant be empty`);
      return;
    }

    try {
      await mutateAsync({
        id: updatedRow.id,
        question: updatedRow.question,
      });

      setRowModesModel((prev) => ({
        ...prev,
        [id]: { mode: GridRowModes.View },
      }));
    } catch (error) {
      console.error('Error updating question:', error);
      toast.error('Error updating question.');
    }
  };

  const processRowUpdate = async (newRow: any) => {
    try {
      await mutateAsync({ id: newRow.id, question: newRow.question });

      return newRow;
    } catch (error) {
      toast.error('Failed to update question.');
      console.error(' Mutation failed:', error);
      return newRow;
    }
  };

  // const SelectEdit = ({ id, value, field, options, api }: SelectEditProps) => {
  //   return (
  //     <Select
  //       value={value}
  //       onChange={(event) => {
  //         api.setEditCellValue({ id, field, value: event.target.value });
  //       }}
  //       fullWidth
  //     >
  //       {options.map((option) => (
  //         <MenuItem key={option} value={option}>
  //           {option}
  //         </MenuItem>
  //       ))}
  //     </Select>
  //   );
  // };

  const columns: GridColDef[] = [
    {
      field: 'question',
      headerName: 'Interview Question',
      flex: 5,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      editable: false,
      // renderEditCell: (params) => (
      //   <SelectEdit {...params} options={Object.values(QuestionCategory)} />
      // ),
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridCellParams) => {
        const isEditing = rowModesModel[params.id]?.mode === GridRowModes.Edit;
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isEditing ? (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleSaveClick(params.id as string)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleEditClick(params.id as string)}
              >
                Edit
              </Button>
            )}
            <Button
              variant="contained"
              size="small"
              onClick={() => console.log(params.id)}
            >
              Disable
            </Button>
          </Box>
        );
      },
    },
    {
      field: 'stats',
      headerName: 'Stats',
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => console.log(params.id)}
        >
          Stats
        </Button>
      ),
    },
  ];

  if (!allQuestions) return <div>Loading...</div>;

  return (
    <>
      <Box sx={{ height: '100%', width: '100%', padding: '50px' }}>
        <Button
          variant="outlined"
          sx={{ margin: '30px 0' }}
          onClick={handleAddQuestionClick}
          className="add-new-question-button"
        >
          {showForm ? 'Close form' : 'Add question'}
        </Button>
        {showForm && <InterviewQuestionForm />}
        <DataGrid
          columns={columns}
          rows={allQuestions}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={setRowModesModel}
          processRowUpdate={processRowUpdate}
          autoHeight
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
