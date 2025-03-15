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
  MultistepQuestion,
  QuestionCategory,
  QuestionType,
} from '@internship-app/types';

type InterviewQuestionDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (question: MultistepQuestion<QuestionCategory>) => void;
  initialQuestion?: MultistepQuestion<QuestionCategory>;
  mode: 'add' | 'edit';
};

const isOptionType = (type: QuestionType) => {
  return (
    type === QuestionType.Select ||
    type === QuestionType.Radio ||
    type === QuestionType.Checkbox
  );
};

const InterviewQuestionDialog = ({
  open,
  onClose,
  onSubmit,
  initialQuestion,
  mode,
}: InterviewQuestionDialogProps) => {
  const [newOptionValue, setNewOptionValue] = useState<string>('');

  const defaultQuestion: MultistepQuestion<QuestionCategory> = {
    id: nanoid(),
    title: '',
    type: QuestionType.Field,
    category: QuestionCategory.General,
    isEnabled: false,
  };

  const [question, setQuestion] = useState<MultistepQuestion<QuestionCategory>>(
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
    switch (question.type) {
      case QuestionType.Slider:
        setQuestion((prev) => {
          return {
            ...prev,
            type: QuestionType.Slider,
            min: 'min' in prev ? prev.min : 1,
            max: 'max' in prev ? prev.max : 5,
            step: 'step' in prev ? prev.step : 1,
          } as MultistepQuestion<QuestionCategory>;
        });
        break;

      case QuestionType.Select:
      case QuestionType.Radio:
      case QuestionType.Checkbox:
        setQuestion((prev) => {
          return {
            ...prev,
            type: question.type,
            options: 'options' in prev ? prev.options : [],
          } as MultistepQuestion<QuestionCategory>;
        });
        break;
      default:
        setQuestion((prev) => {
          return {
            ...prev,
            type: question.type,
          } as MultistepQuestion<QuestionCategory>;
        });
        break;
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
        toast.error('Pitanje nesmi biti prazno');
        break;
      case hasOptions && (!question.options || question.options.length < 2):
        toast.error('Stavi bar 2 opcije');
        break;
      case isSlider &&
        (question.min === null ||
          question.max === null ||
          question.step === null):
        toast.error('Slider opcije nesme bit prazne');
        break;
      case isSlider && (question.min >= question.max || question.step <= 0):
        toast.error('Slider opcije nisu ispravne');
        break;
      default:
        onSubmit(question);
        break;
    }
  };

  const handleSliderChange = (key: string, value: string) => {
    setQuestion((prev) => ({
      ...prev,
      [key]: parseInt(value),
    }));
  };

  const addOption = () => {
    const trimmedOption = newOptionValue.trim();
    if (!trimmedOption) {
      toast.error('Opcija nesmi bit prazna');
      return;
    }

    setQuestion((prev) => {
      if (!isOptionType(prev.type)) return prev;

      const prevOptions = ('options' in prev ? prev.options : []) ?? [];

      if (prevOptions.includes(trimmedOption)) {
        toast.error('Ta opcija već postoji');
        return prev;
      }

      return {
        ...prev,
        options: [...prevOptions, trimmedOption],
      } as MultistepQuestion<QuestionCategory>;
    });

    setNewOptionValue('');
  };

  const removeOption = (optionToRemove: string) => {
    setQuestion((prev) => {
      if (!isOptionType(prev.type)) return prev;

      const prevOptions = ('options' in prev ? prev.options : []) ?? [];

      return {
        ...prev,
        options: prevOptions.filter((option) => option !== optionToRemove),
      } as MultistepQuestion<QuestionCategory>;
    });
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
              id="type-selection"
              displayEmpty
              value={question.type}
              onChange={(e) =>
                setQuestion(
                  (prevState) =>
                    ({
                      ...prevState,
                      type: e.target.value as QuestionType,
                    }) as MultistepQuestion<QuestionCategory>,
                )
              }
            >
              <MenuItem value="" disabled>
                Tip pitanja
              </MenuItem>
              {Object.values(QuestionType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
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
              {Object.values(QuestionCategory).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
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

              {question.options?.map((option, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                    p: 1,
                  }}
                >
                  <Box>{option}</Box>
                  <IconButton
                    color="error"
                    onClick={() => removeOption(option)}
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
                  onChange={(e) => setNewOptionValue(e.target.value)}
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
