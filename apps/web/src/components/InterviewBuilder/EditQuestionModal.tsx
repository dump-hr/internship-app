import { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { QuestionCategory } from '../../constants/interviewConstants';
import { InterviewQuestion, QuestionType } from '@internship-app/types';

type EditQuestionModalProps = {
  question: InterviewQuestion;
  open: boolean;
  onClose: () => void;
  handleEditQuestion: (updatedQuestion: InterviewQuestion) => void;
};

export const EditQuestionModal = ({
  question,
  open,
  onClose,
  handleEditQuestion,
}: EditQuestionModalProps) => {
  const [editedQuestion, setEditedQuestion] = useState<string>(
    question.question,
  );
  const [category, setCategory] = useState<QuestionCategory>(question.category);
  const [newOption, setNewOption] = useState<string>('');
  const [options, setOptions] = useState<string[] | []>(question.options || []);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const handleSave = () => {
    const updatedQuestion = {
      ...question,
      question: editedQuestion,
      category,
      options,
      isEnabled,
    };
    handleEditQuestion(updatedQuestion);
    onClose();
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
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
          width: 400,
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

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as QuestionCategory)}
          >
            {Object.values(QuestionCategory).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
            <Button onClick={handleAddOption} variant="outlined" sx={{ mt: 1 }}>
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
