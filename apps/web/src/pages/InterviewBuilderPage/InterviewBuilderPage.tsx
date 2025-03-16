import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQueryClient } from 'react-query';
import { QuestionCategory, QuestionType } from '@prisma/client';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import { Button, Link } from '@mui/material';
import { QuestionDialog } from '../../components/InterviewQuestions/QuestionDialog';
import { useFetchInterviewQuestions } from '../../api/useFetchInterviewQuestions';

const InterviewBuilderPage = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [typeFilter, setTypeFilter] = useState<QuestionType>();
  const [categoryFilter, setCategoryFilter] = useState<QuestionCategory>();

  const { data, isLoading } = useFetchInterviewQuestions(
    page + 1,
    limit,
    typeFilter,
    categoryFilter,
  );

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Question', flex: 2 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'isActive', headerName: 'Active', type: 'boolean', width: 80 },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      align: 'center',
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSelectedQuestion(params.row);
              setIsEditDialogOpen(true);
            }}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            component={Link}
            href={`/admin/interview-builder/${params.row.id}/stats`}
          >
            Stats
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <LogoHeader text="Interview Builder" />
      <LayoutSpacing>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>
            Add New Question
          </Button>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <select
              value={typeFilter || ''}
              onChange={(e) =>
                setTypeFilter((e.target.value as QuestionType) || undefined)
              }
            >
              <option value="">All Types</option>
              {Object.values(QuestionType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter || ''}
              onChange={(e) =>
                setCategoryFilter(
                  (e.target.value as QuestionCategory) || undefined,
                )
              }
            >
              <option value="">All Categories</option>
              {Object.values(QuestionCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DataGrid
          rows={data?.data || []}
          columns={columns}
          loading={isLoading}
          pagination
          paginationMode="server"
          rowCount={data?.meta?.total || 0}
          paginationModel={{
            page: page,
            pageSize: limit,
          }}
          pageSizeOptions={[10, 20, 50]}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setLimit(model.pageSize);
          }}
          autoHeight
        />
      </LayoutSpacing>

      <QuestionDialog
        mode="add"
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        refetch={() => queryClient.invalidateQueries('questions')}
      />

      <QuestionDialog
        mode="edit"
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        refetch={() => queryClient.invalidateQueries('questions')}
        existingQuestion={selectedQuestion}
      />
    </>
  );
};

export default InterviewBuilderPage;
