import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

import { useFetchAllInterviewers } from '../../api/useFetchAllInterviewers';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import c from './InterviewersPage.module.css';

const InterviewersPage = () => {
  const [dialogs, setDialogs] = useState({
    addInterviewer: false,
    deleteInterviewer: false,
  });

  const { data: interviewers } = useFetchAllInterviewers();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Ime i prezime', width: 130 },
    { field: 'disciplines', headerName: 'Područja', width: 130 },
  ];

  const rows = interviewers?.map((interviewer) => {
    return {
      id: interviewer.id,
      name: interviewer.name,
      disciplines: interviewer.disciplines.join(', '),
    };
  });

  function toggleAddInterviewerDialog() {
    setDialogs({ ...dialogs, addInterviewer: !dialogs.addInterviewer });
  }

  return (
    <>
      <LogoHeader text="Intervjueri" />
      <LayoutSpacing>
        <button onClick={() => console.log(interviewers)}>
          Log interviewers
        </button>
        <br />
        <Button onClick={toggleAddInterviewerDialog}>
          + Dodaj intervjuera
        </Button>
        <DataGrid
          columns={columns}
          rows={rows || []}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      </LayoutSpacing>

      <Dialog
        open={dialogs.addInterviewer}
        onClose={toggleAddInterviewerDialog}
      >
        <DialogTitle>Dodaj intervjuera</DialogTitle>
        <DialogContent>
          <FormControl>
            <TextField placeholder="Ime i prezime" />
            <br />
            <DialogContentText>Izaberi područja:</DialogContentText>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Programiranje" />
              <FormControlLabel control={<Checkbox />} label="Dizajn" />
              <FormControlLabel control={<Checkbox />} label="Multimedija" />
              <FormControlLabel control={<Checkbox />} label="Marketing" />
            </FormGroup>
            <div className={c.dialogButtonWrapper}>
              <Button onClick={toggleAddInterviewerDialog}>Odustani</Button>
              <Button variant="outlined">Potvrdi</Button>
            </div>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewersPage;
