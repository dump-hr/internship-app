import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';
import { Question, QuestionType } from '@internship-app/types';
import { QuestionCategory } from '../../constants/interviewConstants';
import { toast } from 'react-hot-toast';

type AddQuestionModalProps = {
  open: boolean;
  onClose: () => void;
  handleAddQuestion: (question: any) => void;
};

export const AddQuestionModal = ({
  open,
  onClose,
  handleAddQuestion,
}: AddQuestionModalProps) => {
  const defaultQuestion = {
    question: '',
    category: QuestionCategory.General,
    type: QuestionType.Field,
    isEnabled: true,
  } as Question;

  const [formData, setFormData] = useState<Question>(defaultQuestion);

  const handleInputChange = (
    e: React.ChangeEvent<{ name: string; value: string }>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<QuestionType>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as QuestionType }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<QuestionCategory>) => {
    setFormData((prev) => ({
      ...prev,
      category: e.target.value as QuestionCategory,
    }));
  };

  const handleSubmit = () => {
    if (!formData.question?.trim()) {
      toast.error('Morate unijeti pitanje.');
      return;
    }

    handleAddQuestion(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Dodaj pitanje
        </Typography>

        <Box display="flex" alignItems="center" sx={{ mb: 2 }} gap={1}>
          <Typography variant="body1">Pitanje:</Typography>
          <TextField
            fullWidth
            label="Pitanje"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Typography variant="body1">Kategorija:</Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
            >
              {Object.values(QuestionCategory).map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body1" sx={{ ml: 2 }}>
            Tip:
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              name="type"
              value={formData.type}
              onChange={handleSelectChange}
            >
              {Object.values(QuestionType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={formData.isEnabled}
              onChange={(e) =>
                setFormData({ ...formData, isEnabled: e.target.checked })
              }
            />
          }
          label="Aktivno"
        />

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose}>
            Odustani
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Dodaj
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
