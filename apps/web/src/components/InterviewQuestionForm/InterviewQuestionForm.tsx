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

import { QuestionCategory } from '../../constants/interviewConstants.ts';

export const InterviewQuestionForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit({ question, category, type });
    setQuestion('');
    setCategory('');
    setType('');
  };
  return (
    <Card
      sx={{
        width: '90%',
        height: 'auto',
        mt: 4,
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

          {type === 'Select' && (
            <>
              <TextField
                label="Options"
                fullWidth
                variant="outlined"
                value={option}
                onChange={(e) => setQuestion(e.target.value)}
                required
                sx={{ height: '50px', width: '200px' }}
              />
              <Button>Add option</Button>
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
