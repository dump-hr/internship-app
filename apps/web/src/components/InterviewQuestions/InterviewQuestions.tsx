import { QuestionType } from '@internship-app/types/';
import { Box, Button, MenuItem, Select } from '@mui/material';
import {
  GridCellParams,
  GridColDef,
  GridRenderEditCellParams,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { useState } from 'react';

import { useFetchAllInterviewQuestions } from '../../api/usefetchAllInterviewQuestions.tsx';
import { QuestionCategory } from '../../constants/interviewConstants.ts';
import { InterviewQuestionForm } from '../InterviewQuestionForm/InterviewQuestionForm.tsx';

interface SelectEditProps extends GridRenderEditCellParams {
  options: string[];
}

export const InterviewQuestions = () => {
  const { data: allQuestions } = useFetchAllInterviewQuestions();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleAddQuestionClick = () => {
    return <InterviewQuestionForm />;
  };

  const handleEditClick = (id: string) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: string) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = (newRow: any) => {
    console.log('Updated row:', newRow);
    return newRow;
  };

  const SelectEdit = ({ id, value, field, options, api }: SelectEditProps) => {
    return (
      <Select
        value={value}
        onChange={(event) => {
          api.setEditCellValue({ id, field, value: event.target.value });
        }}
        fullWidth
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  };

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
      editable: true,
      renderEditCell: (params) => (
        <SelectEdit {...params} options={Object.values(QuestionCategory)} />
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      editable: true,
      renderEditCell: (params) => (
        <SelectEdit {...params} options={Object.values(QuestionType)} />
      ),
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
    <InterviewQuestionForm />
    // <Box sx={{ height: '100%', width: '100%' }}>
    //   <Button
    //     variant="outlined"
    //     sx={{ margin: '30px 0' }}
    //     onClick={handleAddQuestionClick}
    //   >
    //     Add new question
    //   </Button>
    //   <DataGrid
    //     columns={columns}
    //     rows={allQuestions}
    //     editMode="row"
    //     rowModesModel={rowModesModel}
    //     onRowModesModelChange={setRowModesModel}
    //     processRowUpdate={processRowUpdate}
    //     autoHeight
    //     pageSizeOptions={[10, 20, 50, 100]}
    //   />
    // </Box>
  );
};
