import { Discipline } from '@internship-app/types';
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
  TextField,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

import { useFetchAllInterviewers } from '../../api/useFetchAllInterviewers';
import { usePostInterviewer } from '../../api/usePostInterviewer';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import c from './InterviewersPage.module.css';

const InterviewersPage = () => {
  const [dialogs, setDialogs] = useState({
    addInterviewer: false,
    deleteInterviewer: false,
  });

  const [newInterviewer, setNewInterviewer] = useState({
    name: '',
    disciplines: {
      [Discipline.Development]: false,
      [Discipline.Design]: false,
      [Discipline.Multimedia]: false,
      [Discipline.Marketing]: false,
    },
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
    setDialogs((prevState) => ({
      ...prevState,
      addInterviewer: !prevState.addInterviewer,
    }));
    eraseNewInterviewer();
  }

  function setNewInterviewerName(name: string) {
    setNewInterviewer((prevState) => ({
      ...prevState,
      name,
    }));
  }

  function toggleNewInterviewerDiscipline(discipline: Discipline) {
    setNewInterviewer((prevState) => ({
      ...prevState,
      disciplines: {
        ...prevState.disciplines,
        [discipline]: !prevState.disciplines[discipline],
      },
    }));
  }

  function eraseNewInterviewer() {
    setNewInterviewer({
      name: '',
      disciplines: {
        [Discipline.Development]: false,
        [Discipline.Design]: false,
        [Discipline.Multimedia]: false,
        [Discipline.Marketing]: false,
      },
    });
  }

  const putInterviewer = usePostInterviewer();

  function submitNewInterviewer() {
    const disciplines = Object.keys(newInterviewer.disciplines).filter(
      (discipline) => newInterviewer.disciplines[discipline as Discipline],
    ) as Discipline[];

    const newInterviewerData = {
      name: newInterviewer.name,
      disciplines,
    };

    putInterviewer.mutate(newInterviewerData);
    toggleAddInterviewerDialog();
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
            <TextField
              placeholder="Ime i prezime"
              onChange={(e) => setNewInterviewerName(e.target.value)}
            />
            <br />
            <DialogContentText>Izaberi područja:</DialogContentText>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Programiranje"
                onChange={() =>
                  toggleNewInterviewerDiscipline(Discipline.Development)
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Dizajn"
                onChange={() =>
                  toggleNewInterviewerDiscipline(Discipline.Design)
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Multimedija"
                onChange={() =>
                  toggleNewInterviewerDiscipline(Discipline.Multimedia)
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Marketing"
                onChange={() =>
                  toggleNewInterviewerDiscipline(Discipline.Marketing)
                }
              />
            </FormGroup>
            <div className={c.dialogButtonWrapper}>
              <Button onClick={toggleAddInterviewerDialog}>Odustani</Button>
              <Button onClick={submitNewInterviewer} variant="outlined">
                Potvrdi
              </Button>
            </div>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewersPage;
