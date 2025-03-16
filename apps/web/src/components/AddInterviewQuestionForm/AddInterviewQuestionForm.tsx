import { QuestionType, QuestionCategory } from '@internship-app/types';
import { usePostInterviewQuestion } from '../../api/usePostInterviewQuestion';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormData = {
  title: string;
  type: QuestionType;
  category: QuestionCategory;
  min?: number;
  max?: number;
  step?: number;
  options?: string;
};

type AddInterviewQuestionFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const AddInterviewQuestionForm: React.FC<
  AddInterviewQuestionFormProps
> = ({ onSuccess, onCancel }) => {
  const { mutate: addQuestion, isLoading } = usePostInterviewQuestion();

  const { handleSubmit, control, watch, reset } = useForm<FormData>({
    defaultValues: {
      title: '',
      type: QuestionType.Field,
      category: QuestionCategory.General,
      min: 1,
      max: 5,
      step: 1,
      options: '',
    },
  });

  const selectedType = watch('type');

  const onSubmit = (data: FormData) => {
    const trimmedTitle = data.title.trim();
    if (!trimmedTitle) {
      toast.error('Naslov ne smije biti prazan!');
      return;
    }

    if (data.type === QuestionType.Slider) {
      if (
        data.min === undefined ||
        data.max === undefined ||
        data.step === undefined
      ) {
        toast.error(
          'Za Slider tip pitanja, min, max, i step moraju biti osigurani.',
        );
        return;
      }
      if (Number(data.min) >= Number(data.max)) {
        toast.error('Za Slider tip pitanja, min mora biti manji od max.');
        return;
      }
    }

    if (
      data.type === QuestionType.Select ||
      data.type === QuestionType.Checkbox ||
      data.type === QuestionType.Radio
    ) {
      if (!data.options || data.options.trim() === '') {
        toast.error('Za Select/Checkbox/Radio tip, morate navesti opcije.');
        return;
      }
    }

    const optionsArray =
      data.options && data.options.trim() !== ''
        ? data.options.split(',').map((opt) => opt.trim())
        : [];

    const payload = {
      title: trimmedTitle,
      type: data.type,
      category: data.category,
      min: data.type === QuestionType.Slider ? Number(data.min) : undefined,
      max: data.type === QuestionType.Slider ? Number(data.max) : undefined,
      step: data.type === QuestionType.Slider ? Number(data.step) : undefined,
      options:
        data.type === QuestionType.Select ||
        data.type === QuestionType.Checkbox ||
        data.type === QuestionType.Radio
          ? optionsArray
          : [],
    };

    addQuestion(payload, {
      onSuccess: () => {
        reset();
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}
    >
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Tekst pitanja je obavezan' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Title"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <TextField {...field} select label="Question Type">
            {Object.values(QuestionType).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{ required: 'Kategorija je obavezna' }}
        render={({ field }) => (
          <TextField {...field} select label="Category">
            {Object.values(QuestionCategory).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {selectedType === QuestionType.Slider && (
        <>
          <Controller
            name="min"
            control={control}
            rules={{ required: 'Min je obavezan' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                label="Min"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
              />
            )}
          />
          <Controller
            name="max"
            control={control}
            rules={{ required: 'Max je obavezan' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                label="Max"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
              />
            )}
          />
          <Controller
            name="step"
            control={control}
            rules={{ required: 'Step je obavezan' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                label="Step"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
              />
            )}
          />
        </>
      )}

      {(selectedType === QuestionType.Select ||
        selectedType === QuestionType.Checkbox ||
        selectedType === QuestionType.Radio) && (
        <Controller
          name="options"
          control={control}
          rules={{ required: 'Opcije su obavezne' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Options (comma separated)"
              error={!!fieldState.error}
              helperText={
                fieldState.error
                  ? fieldState.error.message
                  : 'Enter options separated by commas'
              }
            />
          )}
        />
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
