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
import toast from 'react-hot-toast';

import { useDeleteInterviewer } from '../../api/useDeleteInterviewer';
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
        if (dialogs.addInterviewer.isOpen) handleDialogClose();
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
        if (dialogs.deleteInterviewer.isOpen) handleDialogClose();
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

  const [interviewerToDelete, setInterviewerToDelete] = useState({
    id: '',
    name: '',
  });

  const { data: interviewers } = useFetchAllInterviewers();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Ime i prezime', width: 200 },
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
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="warning"
          onClick={() => {
            setInterviewerToDelete({
              id: params.row.id,
              name: params.row.name,
            });
            dialogs.deleteInterviewer.toggle();
          }}
        >
          Obriši
        </Button>
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

  const deleteInterviewer = useDeleteInterviewer();
  const postInterviewer = usePostInterviewer();

  const Helper = {
    newInterviewer: {
      setName: (name: string) => {
        setNewInterviewer((prevState) => ({
          ...prevState,
          name,
        }));
      },
      toggleDiscipline: (discipline: Discipline) => {
        setNewInterviewer((prevState) => ({
          ...prevState,
          disciplines: {
            ...prevState.disciplines,
            [discipline]: !prevState.disciplines[discipline],
          },
        }));
      },
      erase: () => {
        setNewInterviewer({
          name: '',
          disciplines: {
            [Discipline.Development]: false,
            [Discipline.Design]: false,
            [Discipline.Multimedia]: false,
            [Discipline.Marketing]: false,
          },
        });
      },
      submit: () => {
        const { isValid, message } = Helper.newInterviewer.validate();

        if (!isValid) {
          toast.error(message);
          return;
        }

        const disciplines = Object.keys(newInterviewer.disciplines).filter(
          (discipline) => newInterviewer.disciplines[discipline as Discipline],
        ) as Discipline[];

        const newInterviewerData = {
          name: newInterviewer.name,
          disciplines,
        };

        postInterviewer.mutate(newInterviewerData);

        dialogs.addInterviewer.toggle();
        window.location.reload();
      },
      validate: () => {
        const messages = [] as string[];
        let isValid = true;

        if (newInterviewer.name === '') {
          messages.push('Ime i prezime ne smije biti prazno.');
          isValid = false;
        }

        const selectedDisciplines = Object.keys(
          newInterviewer.disciplines,
        ).filter(
          (discipline) => newInterviewer.disciplines[discipline as Discipline],
        );

        if (selectedDisciplines.length === 0) {
          messages.push('Izaberi barem jedno područje.');
          isValid = false;
        }

        return {
          isValid,
          message: messages.join(' '),
        };
      },
    },
  };

  function handleDialogClose() {
    if (!dialogs.addInterviewer.isOpen) {
      Helper.newInterviewer.erase();
    }

    if (!dialogs.deleteInterviewer.isOpen) {
      setInterviewerToDelete({
        id: '',
        name: '',
      });
    }
  }

  return (
    <>
      <LogoHeader text="Intervjueri" />
      <br />
      <LayoutSpacing>
        <Button onClick={dialogs.addInterviewer.toggle}>
          + Dodaj intervjuera
        </Button>

        {rows?.length !== 0 && (
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
        )}

        {rows?.length === 0 && (
          <p className={c.noData}>Nema upisanih intervjuera.</p>
        )}
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
              onChange={(e) => Helper.newInterviewer.setName(e.target.value)}
            />
            <br />
            <DialogContentText>Izaberi područja:</DialogContentText>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Programiranje"
                onChange={() =>
                  Helper.newInterviewer.toggleDiscipline(Discipline.Development)
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Dizajn"
                onChange={() =>
                  Helper.newInterviewer.toggleDiscipline(Discipline.Design)
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Multimedija"
                onChange={() =>
                  Helper.newInterviewer.toggleDiscipline(Discipline.Multimedia)
                }
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Marketing"
                onChange={() =>
                  Helper.newInterviewer.toggleDiscipline(Discipline.Marketing)
                }
              />
            </FormGroup>
            <div className={c.dialogButtonWrapper}>
              <Button onClick={dialogs.addInterviewer.toggle}>Odustani</Button>
              <Button onClick={Helper.newInterviewer.submit} variant="outlined">
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
        <DialogTitle>
          Obriši intervjuera ({interviewerToDelete.name})
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Jesi li siguran da želiš obrisati intervjuera?
          </DialogContentText>
          <div className={c.dialogButtonWrapper}>
            <Button onClick={dialogs.deleteInterviewer.toggle}>Odustani</Button>
            <Button
              onClick={() => {
                deleteInterviewer.mutate(interviewerToDelete.id);
                dialogs.deleteInterviewer.toggle();
                window.location.reload();
              }}
              variant="outlined"
            >
              Potvrdi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewersPage;
