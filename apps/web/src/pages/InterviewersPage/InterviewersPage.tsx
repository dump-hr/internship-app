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
import { useEffect, useState } from 'react';

import { useFetchAllInterviewers } from '../../api/useFetchAllInterviewers';
import { usePostInterviewer } from '../../api/usePostInterviewer';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import c from './InterviewersPage.module.css';

const InterviewersPage = () => {
  type DialogState = {
    isOpen: boolean;
    toggle: () => void;
  };

  type DialogsState = {
    addInterviewer: DialogState;
    deleteInterviewer: DialogState;
  };

  const [dialogs, setDialogs] = useState<DialogsState>({
    addInterviewer: {
      isOpen: false,
      toggle: () => {
        setDialogs((prevState) => ({
          ...prevState,
          addInterviewer: {
            ...prevState.addInterviewer,
            isOpen: !prevState.addInterviewer.isOpen,
          },
        }));
      },
    },
    deleteInterviewer: {
      isOpen: false,
      toggle: () => {
        setDialogs((prevState) => ({
          ...prevState,
          deleteInterviewer: {
            ...prevState.deleteInterviewer,
            isOpen: !prevState.deleteInterviewer.isOpen,
          },
        }));
      },
    },
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

  const [interviewerToDelete, setInterviewerToDelete] = useState('');

  const { data: interviewers } = useFetchAllInterviewers();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Ime i prezime', width: 130 },
    {
      field: 'developmentDiscipline',
      headerName: 'DEV',
      width: 70,
      type: 'boolean',
    },
    {
      field: 'designDiscipline',
      headerName: 'DIZ',
      width: 70,
      type: 'boolean',
    },
    {
      field: 'multimediaDiscipline',
      headerName: 'MULT',
      width: 70,
      type: 'boolean',
    },
    {
      field: 'marketingDiscipline',
      headerName: 'MARK',
      width: 70,
      type: 'boolean',
    },
    {
      field: 'deleteButton',
      headerName: 'Postavke',
      width: 100,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="info"
            style={{ marginRight: '20px' }}
            disabled
          >
            Uredi
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              setInterviewerToDelete(params.row.name);
              dialogs.deleteInterviewer.toggle();
            }}
          >
            Obriši
          </Button>
        </>
      ),

      align: 'right',
      headerAlign: 'right',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
  ];

  const rows = interviewers?.map((interviewer) => {
    return {
      id: interviewer.id,
      name: interviewer.name,
      developmentDiscipline: interviewer.disciplines.includes(
        Discipline.Development,
      ),
      designDiscipline: interviewer.disciplines.includes(Discipline.Design),
      multimediaDiscipline: interviewer.disciplines.includes(
        Discipline.Multimedia,
      ),
      marketingDiscipline: interviewer.disciplines.includes(
        Discipline.Marketing,
      ),
    };
  });

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

  useEffect(() => {
    if (!dialogs.addInterviewer.isOpen) {
      eraseNewInterviewer();
    }

    if (!dialogs.deleteInterviewer.isOpen) {
      setInterviewerToDelete('');
    }
  }, [dialogs]);

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
    dialogs.addInterviewer.toggle();
  }

  return (
    <>
      <LogoHeader text="Intervjueri" />
      <LayoutSpacing>
        <button onClick={() => console.log(interviewers)}>
          Log interviewers
        </button>
        <button onClick={() => console.log(newInterviewer)}>
          Log new interviewer
        </button>
        <br />
        <Button onClick={dialogs.addInterviewer.toggle}>
          + Dodaj intervjuera
        </Button>
        <DataGrid
          columns={columns}
          rows={rows || []}
          disableRowSelectionOnClick
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
        open={dialogs.addInterviewer.isOpen}
        onClose={dialogs.addInterviewer.toggle}
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
              <Button onClick={dialogs.addInterviewer.toggle}>Odustani</Button>
              <Button onClick={submitNewInterviewer} variant="outlined">
                Potvrdi
              </Button>
            </div>
          </FormControl>
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialogs.deleteInterviewer.isOpen}
        onClose={dialogs.deleteInterviewer.toggle}
      >
        <DialogTitle>Obriši intervjuera ({interviewerToDelete})</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Jesi li siguran da želiš obrisati intervjuera?
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewersPage;
