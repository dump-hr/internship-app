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
import { usePostInterviewQuestion } from '../../api/usePostInterviewQuestion';

export type OptionType = {
  id: string;
  value: string;
};

type QuestionType = {
  title: string;
  type: string;
  category: string;
  min: number | null;
  max: number | null;
  step: number | null;
  options: OptionType[];
};

const InterviewQuestionAddForm = () => {
  const postInterviewQuestion = usePostInterviewQuestion();

  const [dialogState, setDialogState] = useState<boolean>(false);
  const [newOptionValue, setNewOptionValue] = useState<string>('');

  const toggleDialog = () => {
    setDialogState(!dialogState);
  };

  const [newQuestion, setNewQuestion] = useState<QuestionType>({
    title: '',
    type: '',
    category: '',
    min: null,
    max: null,
    step: null,
    options: [],
  });

  useEffect(() => {
    if (newQuestion.type === 'Slider') {
      setNewQuestion((prev) => ({
        ...prev,
        min: 1,
        max: 5,
        step: 1,
      }));
    } else {
      setNewQuestion((prev) => ({
        ...prev,
        min: null,
        max: null,
        step: null,
      }));
    }

    setNewQuestion((prev) => ({
      ...prev,
      options: [],
    }));
  }, [newQuestion.type]);

  const hasOptions =
    newQuestion.type === 'Select' ||
    newQuestion.type === 'Radio' ||
    newQuestion.type === 'Checkbox';
  const isSlider = newQuestion.type === 'Slider';

  const handleSubmit = () => {
    switch (true) {
      case newQuestion.title === '':
        toast.error('Title cannot be empty');
        break;
      case newQuestion.type === '':
        toast.error('Type cannot be empty');
        break;
      case newQuestion.category === '':
        toast.error('Category cannot be empty');
        break;
      case hasOptions && newQuestion.options.length < 2:
        toast.error('There need to be at least 2 options');
        break;
      default:
        postInterviewQuestion.mutate(newQuestion);

        resetForm();
        toggleDialog();
        break;
    }
  };

  const resetForm = () => {
    setNewQuestion({
      title: '',
      type: '',
      category: '',
      min: null,
      max: null,
      step: null,
      options: [],
    });
  };

  const handleSliderChange = (key: string, value: string) => {
    const parsedValue = parseInt(value);
    setNewQuestion((prev) => ({
      ...prev,
      [key]: parsedValue,
    }));
  };

  const addOption = () => {
    if (!newOptionValue.trim()) {
      toast.error('Option cannot be empty');
      return;
    }

    setNewQuestion((prev) => ({
      ...prev,
      options: [...prev.options, { id: nanoid(), value: newOptionValue }],
    }));

    setNewOptionValue('');
  };

  const removeOption = (id: string) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== id),
    }));
  };

  const handleNewOptionChange = (value: string) => {
    setNewOptionValue(value);
  };

  return (
    <>
      <Button onClick={() => toggleDialog()}>+ Dodaj pitanje</Button>

      <Dialog open={dialogState} onClose={() => toggleDialog()}>
        <DialogTitle>Dodaj pitanje</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              placeholder="Pitanje"
              value={newQuestion.title}
              onChange={(e) =>
                setNewQuestion((prevState) => ({
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
                value={newQuestion.type}
                onChange={(e) =>
                  setNewQuestion((prevState) => ({
                    ...prevState,
                    type: e.target.value,
                  }))
                }
              >
                <MenuItem value="" disabled>
                  Tip pitanja
                </MenuItem>
                <MenuItem value="Field">Field</MenuItem>
                <MenuItem value="TextArea">TextArea</MenuItem>
                <MenuItem value="Select">Select</MenuItem>
                <MenuItem value="Checkbox">Checkbox</MenuItem>
                <MenuItem value="Date">Date</MenuItem>
                <MenuItem value="DateTime">DateTime</MenuItem>
                <MenuItem value="Radio">Radio</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
                <MenuItem value="Slider">Slider</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                id="category-selection"
                displayEmpty
                value={newQuestion.category}
                onChange={(e) =>
                  setNewQuestion((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }))
                }
              >
                <MenuItem value="" disabled>
                  Kategorija
                </MenuItem>
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Multimedia">Multimedia</MenuItem>
                <MenuItem value="Final">Final</MenuItem>
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
                    value={newQuestion.min === null ? '' : newQuestion.min}
                    onChange={(e) => handleSliderChange('min', e.target.value)}
                    size="small"
                  />
                  <TextField
                    label="Max"
                    type="number"
                    value={newQuestion.max === null ? '' : newQuestion.max}
                    onChange={(e) => handleSliderChange('max', e.target.value)}
                    size="small"
                  />
                  <TextField
                    label="Step"
                    type="number"
                    value={newQuestion.step === null ? '' : newQuestion.step}
                    onChange={(e) => handleSliderChange('step', e.target.value)}
                    size="small"
                  />
                </Box>
              </Box>
            )}

            {hasOptions && (
              <Box sx={{ mb: 2 }}>
                <DialogContentText sx={{ mb: 1 }}>
                  Dodaj opcije
                </DialogContentText>

                {newQuestion.options.map((option) => (
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
              <Button onClick={() => toggleDialog()}>Odustani</Button>
              <Button onClick={() => handleSubmit()}>Potvrdi</Button>
            </Box>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewQuestionAddForm;
