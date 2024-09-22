import { CreateTestCaseDto } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';

export interface TestCaseFormProps {
  onValueChange: (value: CreateTestCaseDto) => void;
}

export const TestCaseForm = ({ onValueChange }: TestCaseFormProps) => {
  const { setValue, watch, reset } = useForm<CreateTestCaseDto>({
    defaultValues: {
      input: [],
      expectedOutput: [],
    },
  });

  const handleSubmit = () => {
    onValueChange(watch());
    reset();
  };

  return (
    <Box>
      <Typography>Input</Typography>
      <MultilineInput
        onValueChange={(value) => setValue('input', value.split('\n'))}
      />
      <Typography>Expected Output</Typography>
      <MultilineInput
        onValueChange={(value) => setValue('expectedOutput', value.split('\n'))}
      />
      <Button type="button" onClick={handleSubmit} />
    </Box>
  );
};
