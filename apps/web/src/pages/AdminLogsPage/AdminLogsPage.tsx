import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import {
  AdminLogAction,
  GetAdminLogsRequest,
  Question,
  QuestionType,
} from '@internship-app/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useFetchAdminLogs } from '../../api/useFetchAdminLogs';
import AdminPage from '../../components/AdminPage';
import InputHandler from '../../components/InputHandler';

const formQuestions: Question[] = [
  {
    id: 'action',
    title: 'Akcija',
    type: QuestionType.Select,
    options: ['', ...Object.values(AdminLogAction)],
    registerValue: '',
  },
  {
    id: 'description',
    title: 'Opis',
    type: QuestionType.Field,
    registerValue: '',
  },
];

const logColumns: GridColDef[] = [
  { field: 'action', headerName: 'Akcija', width: 150 },
  { field: 'description', headerName: 'Opis', width: 900 },
  { field: 'date', headerName: 'Datum', width: 200 },
];

const AdminLogsPage = () => {
  useMsalAuthentication(InteractionType.Redirect);

  const form = useForm();
  const formValues = form.watch();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const getParams: GetAdminLogsRequest = {
    ...formValues,
    skip: paginationModel.page * paginationModel.pageSize,
    take: paginationModel.pageSize,
  };

  const { data } = useFetchAdminLogs(getParams);
  const rows = data?.logs.map((log) => ({
    ...log,
    date: moment(log.date).format('DD.MM. HH:mm'),
  }));

  return (
    <AdminPage>
      <div>
        {formQuestions.map((fq) => (
          <InputHandler form={form} question={fq} key={fq.id} />
        ))}
      </div>
      <DataGrid
        columns={logColumns}
        rowCount={data?.count || 0}
        rows={rows || []}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </AdminPage>
  );
};

export default AdminLogsPage;
