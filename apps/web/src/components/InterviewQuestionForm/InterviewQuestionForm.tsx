import { QuestionType } from '@internship-app/types/';
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useCreateInterviewQuestion } from '../../api/useCreateInterviewQuestion.tsx';
import { QuestionCategory } from '../../constants/interviewConstants.ts';

export const InterviewQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [stepValue, setStepValue] = useState('');

  const { mutate, error } = useCreateInterviewQuestion();

  const handleAddOption = () => {
    if (newOption.trim() === '') {
      toast.error("Option can't be empty");
      return;
    }
    setOptions([...options, newOption]);
    setNewOption('');
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;

    const questionData = {
      question,
      category: category as QuestionCategory,
      type: type as QuestionType,
      options,
      minValue:
        type === 'Slider' ? (minValue ? Number(minValue) : null) : undefined,
      maxValue:
        type === 'Slider' ? (maxValue ? Number(maxValue) : null) : undefined,
      stepValue:
        type === 'Slider' ? (stepValue ? Number(stepValue) : null) : undefined,
    };

    try {
      if (type === 'Slider' && minValue >= maxValue) {
        toast.error('Maximum value is less or equal to the maximum value.');
        return;
      }

      mutate(questionData);

      setQuestion('');
      setCategory('');
      setType('');
      setOptions([]);
      setNewOption('');
      setMinValue('');
      setMaxValue('');
      setStepValue('');

      toast.success('Question added successfully');
    } catch (err) {
      console.error('Error submitting question:', err);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <Card
      sx={{
        width: '90%',
        height: 'auto',
        m: 4,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add a New Question
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label="Question"
            fullWidth
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            sx={{ height: '50px', width: '1000px' }}
          />
          <Select
            label="Category"
            fullWidth
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            sx={{ height: '50px', maxWidth: '200px' }}
          >
            {Object.values(QuestionCategory).map(
              (category: QuestionCategory) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ),
            )}
          </Select>

          <Select
            label="Type"
            fullWidth
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            sx={{ height: '50px', maxWidth: '200px' }}
          >
            {Object.values(QuestionType).map((type: QuestionType) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>

          {(type === 'Select' || type === 'Radio' || type === 'Checkbox') && (
            <>
              <TextField
                label="Options"
                fullWidth
                variant="outlined"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                sx={{ height: '50px', width: '200px' }}
              />
              <Button onClick={handleAddOption}>Add option</Button>

              {options.length > 0 && (
                <div style={{ width: '100%' }}>
                  <Typography variant="subtitle1">Options:</Typography>
                  {options.map((opt, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '5px',
                      }}
                    >
                      <Typography>{opt}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleRemoveOption(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {type === 'Slider' && (
            <>
              <TextField
                sx={{ height: '50px', width: '200px' }}
                label="Min value"
                type="number"
                fullWidth
                variant="outlined"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                required
              />

              <TextField
                sx={{ height: '50px', width: '200px' }}
                label="Max value"
                type="number"
                fullWidth
                variant="outlined"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                required
              />

              <TextField
                sx={{ height: '50px', width: '200px' }}
                label="Step value"
                type="number"
                fullWidth
                variant="outlined"
                value={stepValue}
                onChange={(e) => setStepValue(e.target.value)}
                required
              />
            </>
          )}

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
