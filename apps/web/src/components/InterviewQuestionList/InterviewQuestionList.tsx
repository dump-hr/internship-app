import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  MultistepQuestion,
  QuestionCategory,
  QuestionType,
  SetInterviewQuestionRequest,
} from '@internship-app/types';
import { useFetchAllInterviewQuestions } from '../../api/useFetchAllInterviewQuestions';
import { Button } from '@mui/material';
import { useSetQuestionAvailability } from '../../api/useSetQuestionAvailability';
import { useState } from 'react';
import InterviewQuestionDialog from '../InterviewQuestionDialog/InterviewQuestionDialog';
import { useSetInterviewQuestion } from '../../api/useSetInterviewQuestion';
import { Link } from 'wouter';
import { Path } from '../../constants/paths';

const InterviewQuestionList = () => {
  const { data: interviewQuestions = [] } = useFetchAllInterviewQuestions();
  const setQuestionAvailability = useSetQuestionAvailability();
  const setInterviewQuestion = useSetInterviewQuestion();

  const [dialogState, setDialogState] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<MultistepQuestion<QuestionCategory> | null>(null);


  const toggleDialog = () => {
    setDialogState(!dialogState);
  };

  const toggleAvailability = (params: GridRenderCellParams) => {
    setQuestionAvailability.mutate({
      questionId: params.row.id,
      isEnabled: !params.row.isEnabled,
    });
  };

  const handleEdit = (params: GridRenderCellParams) => {
    const questionToUpdate = interviewQuestions.find(
      (question: MultistepQuestion<QuestionCategory>) =>
        question.id === params.row.id,
    );

    if (questionToUpdate) {
      setSelectedQuestion(questionToUpdate);
      toggleDialog();
    }
  };

  const handleSubmitEdit = (question: MultistepQuestion<QuestionCategory>) => {
    const request: SetInterviewQuestionRequest = {
      id: question.id,
      title: question.title || '',
      type: question.type,
      category: question.category,
      min: null,
      max: null,
      step: null,
      options: [],
    };

    if (question.type === QuestionType.Slider) {
      request.min = question.min;
      request.max = question.max;
      request.step = question.step;
    }

    if (
      question.type === QuestionType.Checkbox ||
      question.type === QuestionType.Select ||
      question.type === QuestionType.Radio
    ) {
      request.options = question.options || [];
    }

    setInterviewQuestion.mutate(request);
    toggleDialog();
  };

  const rows = interviewQuestions.map(
    (question: MultistepQuestion<QuestionCategory>) => ({
      id: question.id,
      title: question.title,
      type: question.type,
      category: question.category,
      isEnabled: question.isEnabled,
    }),
  );

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Question',
      width: 700,
      renderCell: (params) => (
        <div
          style={{
            overflowX: 'hidden',
            whiteSpace: 'normal',
            maxHeight: '4em',
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'category', headerName: 'Category', width: 120 },
    {
      field: 'actions',
      headerName: '',
      width: 300,
      sortable: false,
      align: 'right',
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
            }}
          >
            <Button onClick={() => toggleAvailability(params)}>
              {params.row.isEnabled ? 'DISABLE' : 'ENABLE'}
            </Button>
            <Button onClick={() => handleEdit(params)}>EDIT</Button>
            <Button
              component={Link}
              to={Path.QuestionStats.replace(':questionId', params.row.id)}
            >
              STATS
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        marginTop: '30px',
        marginBottom: '100px',
      }}
    >
      <DataGrid
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        rows={rows}
        columns={columns}
        disableColumnFilter
        getRowHeight={() => 80}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {selectedQuestion && (
        <InterviewQuestionDialog
          open={dialogState}
          onClose={() => toggleDialog()}
          onSubmit={handleSubmitEdit}
          initialQuestion={selectedQuestion}
          mode="edit"
        />
      )}
    </div>
  );
};

export default InterviewQuestionList;
