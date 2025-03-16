import { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Question, QuestionType } from '@internship-app/types';
import toast from 'react-hot-toast';

type EditQuestionModalProps = {
  question: Question;
  open: boolean;
  onClose: () => void;
  handleEditQuestion: (updatedQuestion: Question) => void;
};

export const EditQuestionModal = ({
  question,
  open,
  onClose,
  handleEditQuestion,
}: EditQuestionModalProps) => {
  const [editedQuestion, setEditedQuestion] = useState<string>(
    question.question ?? '',
  );
  const [newOption, setNewOption] = useState<string>('');
  const [options, setOptions] = useState<string[] | []>(question.options ?? []);
  const [isEnabled, setIsEnabled] = useState<boolean>(
    question.isEnabled || true,
  );

  const handleSave = () => {
    const updatedQuestion = {
      ...question,
      question: editedQuestion,
      options,
      isEnabled,
    };

    handleEditQuestion(updatedQuestion);
    onClose();
  };

  const handleAddOption = () => {
    const trimmedOption = newOption.trim();

    if (!trimmedOption) {
      return;
    }

    const optionExists = options.some(
      (opt) => opt.toLowerCase() === trimmedOption.toLowerCase(),
    );

    if (optionExists) {
      toast.error(`Opcija već postoji`);
      return;
    }

    setOptions([...options, trimmedOption]);
    setNewOption('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
          width: 600,
        }}
      >
        <Typography variant="h6">Uredi Pitanje</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Pitanje"
          value={editedQuestion}
          onChange={(e) => setEditedQuestion(e.target.value)}
        />

        {(question.type === QuestionType.Radio ||
          question.type === QuestionType.Checkbox ||
          question.type === QuestionType.Select) && (
          <>
            <Typography variant="subtitle1">Opcije:</Typography>
            {options.map((opt, index) => (
              <Typography key={index}>- {opt}</Typography>
            ))}
            <TextField
              fullWidth
              margin="normal"
              label="New Option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
            <Button
              onClick={handleAddOption}
              variant="outlined"
              sx={{ mt: 1, mr: 4 }}
            >
              Dodaj Opciju
            </Button>
          </>
        )}

        <FormControlLabel
          label={isEnabled ? 'Disable' : 'Enable'}
          control={
            <Switch
              checked={isEnabled}
              onClick={() => setIsEnabled(!isEnabled)}
            />
          }
        />

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={onClose} variant="outlined">
            Odustani
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Spremi
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
