import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import {
  InterviewQuestion,
  QuestionCategory,
  QuestionType,
} from '@internship-app/types';

type InterviewQuestionDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (question: InterviewQuestion) => void;
  initialQuestion?: InterviewQuestion;
  mode: 'add' | 'edit';
};

const InterviewQuestionDialog = ({
  open,
  onClose,
  onSubmit,
  initialQuestion,
  mode,
}: InterviewQuestionDialogProps) => {
  const [newOptionValue, setNewOptionValue] = useState<string>('');

  const defaultQuestion: InterviewQuestion = {
    id: nanoid(),
    title: '',
    type: QuestionType.Field,
    category: QuestionCategory.General,
    min: null,
    max: null,
    step: null,
    options: [],
    isEnabled: false,
  };

  const [question, setQuestion] = useState<InterviewQuestion>(
    initialQuestion || defaultQuestion,
  );

  useEffect(() => {
    if (open) {
      initialQuestion && mode === 'edit'
        ? setQuestion(initialQuestion)
        : setQuestion(defaultQuestion);
    }
  }, [initialQuestion, open, mode]);

  useEffect(() => {
    if (question.type === 'Slider') {
      setQuestion((prev) => ({
        ...prev,
        min: prev.min || 1,
        max: prev.max || 5,
        step: prev.step || 1,
      }));
    } else {
      setQuestion((prev) => ({
        ...prev,
        min: null,
        max: null,
        step: null,
      }));
    }

    if (
      question.type !== 'Select' &&
      question.type !== 'Radio' &&
      question.type !== 'Checkbox'
    ) {
      setQuestion((prev) => ({
        ...prev,
        options: [],
      }));
    }
  }, [question.type]);

  const hasOptions =
    question.type === 'Select' ||
    question.type === 'Radio' ||
    question.type === 'Checkbox';
  const isSlider = question.type === 'Slider';

  const handleFormSubmit = () => {
    switch (true) {
      case question.title === '':
        toast.error('Title cannot be empty');
        break;
      case hasOptions && question.options.length < 2:
        toast.error('There need to be at least 2 options');
        break;
      default:
        onSubmit(question);
        break;
    }
  };

  const handleSliderChange = (key: string, value: string) => {
    const parsedValue = parseInt(value);
    setQuestion((prev) => ({
      ...prev,
      [key]: parsedValue,
    }));
  };

  const addOption = () => {
    if (!newOptionValue.trim()) {
      toast.error('Option cannot be empty');
      return;
    }

    setQuestion((prev) => ({
      ...prev,
      options: [...prev.options, { id: nanoid(), value: newOptionValue }],
    }));

    setNewOptionValue('');
  };

  const removeOption = (id: string) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== id),
    }));
  };

  const handleNewOptionChange = (value: string) => {
    setNewOptionValue(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        {mode === 'add' ? 'Dodaj pitanje' : 'Uredi pitanje'}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            placeholder="Pitanje"
            value={question.title}
            onChange={(e) =>
              setQuestion((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              id="type-selecttion"
              displayEmpty
              value={question.type}
              onChange={(e) =>
                setQuestion((prevState) => ({
                  ...prevState,
                  type: e.target.value as QuestionType,
                }))
              }
            >
              <MenuItem value="" disabled>
                Tip pitanja
              </MenuItem>
              <MenuItem value={QuestionType.Field}>Field</MenuItem>
              <MenuItem value={QuestionType.TextArea}>TextArea</MenuItem>
              <MenuItem value={QuestionType.Select}>Select</MenuItem>
              <MenuItem value={QuestionType.Checkbox}>Checkbox</MenuItem>
              <MenuItem value={QuestionType.Date}>Date</MenuItem>
              <MenuItem value={QuestionType.DateTime}>DateTime</MenuItem>
              <MenuItem value={QuestionType.Radio}>Radio</MenuItem>
              <MenuItem value={QuestionType.Number}>Number</MenuItem>
              <MenuItem value={QuestionType.Slider}>Slider</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              id="category-selection"
              displayEmpty
              value={question.category}
              onChange={(e) =>
                setQuestion((prevState) => ({
                  ...prevState,
                  category: e.target.value as QuestionCategory,
                }))
              }
            >
              <MenuItem value="" disabled>
                Kategorija
              </MenuItem>
              <MenuItem value={QuestionCategory.General}>General</MenuItem>
              <MenuItem value={QuestionCategory.Development}>
                Development
              </MenuItem>
              <MenuItem value={QuestionCategory.Design}>Design</MenuItem>
              <MenuItem value={QuestionCategory.Marketing}>Marketing</MenuItem>
              <MenuItem value={QuestionCategory.Multimedia}>
                Multimedia
              </MenuItem>
              <MenuItem value={QuestionCategory.Final}>Final</MenuItem>
            </Select>
          </FormControl>

          {isSlider && (
            <Box sx={{ mb: 2 }}>
              <DialogContentText sx={{ mb: 1 }}>
                Izaberi slider opcije
              </DialogContentText>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Min"
                  type="number"
                  value={question.min === null ? '' : question.min}
                  onChange={(e) => handleSliderChange('min', e.target.value)}
                  size="small"
                />
                <TextField
                  label="Max"
                  type="number"
                  value={question.max === null ? '' : question.max}
                  onChange={(e) => handleSliderChange('max', e.target.value)}
                  size="small"
                />
                <TextField
                  label="Step"
                  type="number"
                  value={question.step === null ? '' : question.step}
                  onChange={(e) => handleSliderChange('step', e.target.value)}
                  size="small"
                />
              </Box>
            </Box>
          )}

          {hasOptions && (
            <Box sx={{ mb: 2 }}>
              <DialogContentText sx={{ mb: 1 }}>Dodaj opcije</DialogContentText>

              {question.options.map((option) => (
                <Box
                  key={option.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                    p: 1,
                  }}
                >
                  <Box>{option.value}</Box>
                  <IconButton
                    color="error"
                    onClick={() => removeOption(option.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <TextField
                  fullWidth
                  placeholder="Vrijednost opcije"
                  value={newOptionValue}
                  onChange={(e) => handleNewOptionChange(e.target.value)}
                />
                <Button variant="outlined" size="small" onClick={addOption}>
                  + Dodaj
                </Button>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 2,
            }}
          >
            <Button onClick={onClose}>Odustani</Button>
            <Button onClick={handleFormSubmit}>Potvrdi</Button>
          </Box>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewQuestionDialog;
