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
  IconButton,
} from '@mui/material';
import { InterviewQuestion, QuestionType } from '@internship-app/types';
import { QuestionCategory } from '../../constants/interviewConstants';
import { toast } from 'react-hot-toast';
import { Add, Remove } from '@mui/icons-material';

type AddQuestionModalProps = {
  open: boolean;
  onClose: () => void;
  handleAddQuestion: (question: InterviewQuestion) => void;
};

export const AddQuestionModal = ({
  open,
  onClose,
  handleAddQuestion,
}: AddQuestionModalProps) => {
  const defaultQuestion: InterviewQuestion = {
    question: '',
    category: QuestionCategory.General,
    type: QuestionType.Field,
    isEnabled: true,
    stepValue: 1,
    options: [],
  };

  const [formData, setFormData] = useState<InterviewQuestion>(defaultQuestion);

  const handleInputChange = (
    e: React.ChangeEvent<{ name: string; value: string }>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e: SelectChangeEvent<QuestionType>) => {
    setFormData((prev) => ({ ...prev, type: e.target.value as QuestionType }));
    setFormData((prev) => ({ ...prev, options: [] }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<QuestionCategory>) => {
    setFormData((prev) => ({
      ...prev,
      category: e.target.value as QuestionCategory,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...(prev.options || []), ''],
    }));
  };

  const removeOption = (index: number) => {
    const newOptions = [...(formData.options || [])];
    newOptions.splice(index, 1);
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const validateError = () => {
    if (!formData.question?.trim()) {
      return 'Morate unijeti pitanje.';
    }

    if (
      (formData.options?.length === 0 &&
        formData.type === QuestionType.Select) ||
      formData.type === QuestionType.Checkbox ||
      formData.type === QuestionType.Radio
    ) {
      return 'Morate dodati opcije za ovaj tip';
    }

    if (formData.type === QuestionType.Slider) {
      if (
        formData.minValue === undefined ||
        formData.maxValue === undefined ||
        formData.stepValue === undefined
      ) {
        return 'Morate unijeti Min, Max i Step vrijednosti za slider.';
      }

      if (formData.maxValue <= formData.minValue) {
        return 'Max vrijednost mora biti veća od Min vrijednosti.';
      }
    }

    return null;
  };

  const handleSubmit = () => {
    const errorMessage = validateError();

    if (errorMessage) {
      toast.error(errorMessage);
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
              onChange={handleTypeChange}
            >
              {Object.values(QuestionType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {formData.type === QuestionType.Slider && (
          <Box display="flex" gap={2} mb={2}>
            <TextField
              type="number"
              label="Min Value"
              name="minValue"
              value={formData.minValue || ''}
              onChange={handleInputChange}
            />
            <TextField
              type="number"
              label="Max Value"
              name="maxValue"
              value={formData.maxValue || ''}
              onChange={handleInputChange}
            />
            <TextField
              type="number"
              label="Step Value"
              name="stepValue"
              value={formData.stepValue || ''}
              onChange={handleInputChange}
            />
          </Box>
        )}

        {(formData.type === QuestionType.Select ||
          formData.type === QuestionType.Checkbox ||
          formData.type === QuestionType.Radio) && (
          <Box mb={2}>
            <Typography variant="body1">Opcije:</Typography>
            {formData.options?.map((option, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={1}
                mt={1}
              >
                <TextField
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="Unesite opciju"
                />
                <IconButton onClick={() => removeOption(index)} color="error">
                  <Remove />
                </IconButton>
              </Box>
            ))}
            <Button onClick={addOption} startIcon={<Add />} sx={{ mt: 1 }}>
              Dodaj opciju
            </Button>
          </Box>
        )}

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
