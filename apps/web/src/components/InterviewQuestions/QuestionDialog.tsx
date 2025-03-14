import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  DialogActions,
} from '@mui/material';
import toast from 'react-hot-toast';
import { QuestionType, QuestionCategory } from '@prisma/client';
import { usePostInterviewQuestion } from '../../api/usePostInterviewQuestion';
import { usePutInterviewQuestion } from '../../api/usePutInterviewQuestion';

interface QuestionDialogProps {
  mode: 'add' | 'edit';
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  existingQuestion?: any;
}

export const QuestionDialog = ({
  mode,
  open,
  onClose,
  refetch,
  existingQuestion,
}: QuestionDialogProps) => {
  const [questionData, setQuestionData] = useState({
    title: '',
    type: '' as QuestionType,
    category: '' as QuestionCategory,
    min: undefined as number | undefined,
    max: undefined as number | undefined,
    step: undefined as number | undefined,
    options: [] as string[],
    isActive: true,
  });

  useEffect(() => {
    if (mode === 'edit' && existingQuestion) {
      setQuestionData({
        title: existingQuestion.title,
        type: existingQuestion.type,
        category: existingQuestion.category,
        min: existingQuestion.min || undefined,
        max: existingQuestion.max || undefined,
        step: existingQuestion.step || undefined,
        options: existingQuestion.options || [],
        isActive: existingQuestion.isActive,
      });
    } else {
      setQuestionData({
        title: '',
        type: '' as QuestionType,
        category: '' as QuestionCategory,
        min: undefined,
        max: undefined,
        step: undefined,
        options: [],
        isActive: true,
      });
    }
  }, [open, mode, existingQuestion]);

  const postQuestion = usePostInterviewQuestion();
  const putQuestion = usePutInterviewQuestion();

  const handleSubmit = async () => {
    if (!questionData.title || !questionData.type || !questionData.category) {
      toast.error('All required fields must be filled');
      return;
    }

    try {
      const payload = {
        ...questionData,
        min: questionData.type === 'Slider' ? questionData.min : undefined,
        max: questionData.type === 'Slider' ? questionData.max : undefined,
        step: questionData.type === 'Slider' ? questionData.step : undefined,
        options: questionData.type === 'Select' ? questionData.options : [],
      };

      if (mode === 'add') {
        await postQuestion.mutateAsync(payload);
        toast.success('Question created successfully');
      } else {
        await putQuestion.mutateAsync({
          id: existingQuestion.id,
          data: payload,
        });
        toast.success('Question updated successfully');
      }

      refetch();
      onClose();
    } catch (error) {
      toast.error(`Failed to ${mode} question`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{mode === 'add' ? 'Add New' : 'Edit'} Question</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ gap: 2, mt: 1 }}>
          <TextField
            label="Question Title"
            value={questionData.title}
            onChange={(e) =>
              setQuestionData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={questionData.type}
              label="Type"
              onChange={(e) =>
                setQuestionData((prev) => ({
                  ...prev,
                  type: e.target.value as QuestionType,
                }))
              }
              required
            >
              {Object.values(QuestionType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={questionData.category}
              label="Category"
              onChange={(e) =>
                setQuestionData((prev) => ({
                  ...prev,
                  category: e.target.value as QuestionCategory,
                }))
              }
              required
            >
              {Object.values(QuestionCategory).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {questionData.type === 'Slider' && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <TextField
                label="Min Value"
                type="number"
                value={questionData.min || ''}
                onChange={(e) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    min: Number(e.target.value),
                  }))
                }
                required
              />
              <TextField
                label="Max Value"
                type="number"
                value={questionData.max || ''}
                onChange={(e) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    max: Number(e.target.value),
                  }))
                }
                required
              />
              <TextField
                label="Step"
                type="number"
                value={questionData.step || ''}
                onChange={(e) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    step: Number(e.target.value),
                  }))
                }
                required
              />
            </div>
          )}

          {questionData.type === 'Select' && (
            <TextField
              label="Options (comma separated)"
              value={questionData.options.join(', ')}
              onChange={(e) =>
                setQuestionData((prev) => ({
                  ...prev,
                  options: e.target.value.split(',').map((opt) => opt.trim()),
                }))
              }
              required
            />
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={questionData.isActive}
                onChange={(e) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
              />
            }
            label="Active Question"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {mode === 'add' ? 'Create' : 'Save'} Question
        </Button>
      </DialogActions>
    </Dialog>
  );
};
