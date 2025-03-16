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
import { Question, QuestionType } from '@internship-app/types';
import { QuestionCategory } from '../../constants/interviewConstants';
import { toast } from 'react-hot-toast';
import { Add, Remove } from '@mui/icons-material';

type AddQuestionModalProps = {
  open: boolean;
  onClose: () => void;
  handleAddQuestion: (question: Question) => void;
};

export const AddQuestionModal = ({
  open,
  onClose,
  handleAddQuestion,
}: AddQuestionModalProps) => {
  const defaultQuestion: Partial<Question> = {
    category: QuestionCategory.General,
    type: QuestionType.Field,
    isEnabled: true,
    options: [],
  };

  const [formData, setFormData] = useState<Question>(
    defaultQuestion as Question,
  );

  const handleInputChange = (
    e: React.ChangeEvent<{ name: string; value: string }>,
  ) => {
    const { name, value } = e.target;

    if (name === 'minValue' || name === 'maxValue' || name === 'stepValue') {
      const numValue = parseInt(value as string);
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTypeChange = (e: SelectChangeEvent<QuestionType>) => {
    const newType = e.target.value as QuestionType;
    setFormData((prev) => {
      switch (newType) {
        case QuestionType.Select:
        case QuestionType.Checkbox:
        case QuestionType.Radio:
          return {
            ...prev,
            type: newType,
            options: prev.options || [],
          };
        case QuestionType.Slider:
          return {
            ...prev,
            type: newType,
            minValue: prev.minValue ?? 0,
            maxValue: prev.maxValue ?? 0,
            stepValue: prev.stepValue ?? 0,
          };

        default:
          return { ...prev, type: newType };
      }
    });
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
      formData.options?.length === 0 &&
      (formData.type === QuestionType.Select ||
        formData.type === QuestionType.Checkbox ||
        formData.type === QuestionType.Radio)
    ) {
      return 'Morate dodati opcije za ovaj tip';
    }

    if (formData.options?.some((option) => option.trim() === '' || !option)) {
      return 'Prvo popunite postojeću praznu opciju';
    }

    const optionSet = new Set();
    for (const option of formData.options || []) {
      if (optionSet.has(option)) {
        return `Duplikat opcije: "${option}"`;
      }
      optionSet.add(option);
    }

    if (formData.type === QuestionType.Slider) {
      if (!formData.minValue || !formData.maxValue || !formData.stepValue) {
        return 'Morate unijeti Min, Max i Step vrijednosti za slider.';
      }

      if (
        formData.minValue <= 0 ||
        formData.maxValue <= 0 ||
        formData.stepValue <= 0
      ) {
        return 'Vrijednosti  ne smiju biti manje od nula.';
      }

      if (formData.maxValue <= formData.minValue) {
        return 'Max vrijednost mora biti veća od Min vrijednosti.';
      }

      if (formData.maxValue <= formData.stepValue) {
        return 'Max vrijednost mora biti veća od Step vrijednostio';
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
            value={formData.question || ''}
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
