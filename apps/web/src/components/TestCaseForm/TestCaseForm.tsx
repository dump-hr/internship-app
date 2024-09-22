import { CreateTestCaseDto } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';

export interface TestCaseFormProps {
  onValueChange: (value: CreateTestCaseDto) => void;
  onSubmitted?: () => void;
}

export const TestCaseForm = ({
  onValueChange,
  onSubmitted,
}: TestCaseFormProps) => {
  const { setValue, watch, reset } = useForm<CreateTestCaseDto>({
    defaultValues: {
      input: [],
      expectedOutput: [],
    },
  });

  const handleSubmit = () => {
    onValueChange(watch());
    reset();
    onSubmitted && onSubmitted();
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}
      bgcolor={'#f5f5f5'}
    >
      <Typography>Input</Typography>
      <MultilineInput
        onValueChange={(value) => setValue('input', value.split('\n'))}
      />
      <Typography>Expected Output</Typography>
      <MultilineInput
        onValueChange={(value) => setValue('expectedOutput', value.split('\n'))}
      />
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};
