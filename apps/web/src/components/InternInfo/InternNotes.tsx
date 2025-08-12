import { useCreateNote } from '@api/index';
import { Intern } from '@internship-app/types';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import styles from './index.module.css';

type InternNotesProps = {
  intern: Intern;
};

export const InternNotes: React.FC<InternNotesProps> = ({ intern }) => {
  const [newNote, setNewNote] = useState('');
  const createNote = useCreateNote();

  const handleCreateNote = () => {
    createNote.mutate(
      {
        internId: intern.id,
        note: newNote,
      },
      {
        onSuccess: () => setNewNote(''),
      },
    );
  };

  return (
    <div className={styles.notesWrapper}>
      {intern.notes && (
        <div className={styles.notes}>
          <b>Notes: </b>{' '}
          {intern.notes.split('\n').map((i) => (
            <p>{i}</p>
          ))}
        </div>
      )}
      <div className={styles.noteInput}>
        <TextField
          value={newNote}
          size="small"
          onChange={(e) => setNewNote(e.target.value)}
          label="Add note"
        />
        <Button
          variant="contained"
          onClick={handleCreateNote}
          disabled={!newNote}
        >
          Dodaj
        </Button>
      </div>
    </div>
  );
};
