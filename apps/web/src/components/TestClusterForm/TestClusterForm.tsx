import {
  CreateTestClusterDto,
  TestClusterWithTestCases,
} from '@internship-app/types';
import { useForm } from 'react-hook-form';
import { useCreateTestCluster } from '../../api/useCreateTestCluster';
import { Box, Button, Checkbox, Input, Modal } from '@mui/material';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { useState } from 'react';
import { TestCaseForm } from '../TestCaseForm/TestCaseForm';

export interface TestClusterFormProps {
  testQuestionId: string;
  previousValues?: TestClusterWithTestCases;
}

//TODO: potentially rewrite a part of this to remove arrow functions and make handlers

export const TestCaseClusterForm = ({
  testQuestionId,
  previousValues,
}: TestClusterFormProps) => {
  const { register, handleSubmit, setValue, formState, watch } =
    useForm<CreateTestClusterDto>({
      defaultValues: {
        maxExecutionTime: previousValues?.maxExecutionTime || '',
        maxMemory: previousValues?.maxMemory || '',
        points: previousValues?.points || '',
        isSample: previousValues?.isSample || false,
        testCases: previousValues?.testCases || [],
      } as CreateTestClusterDto,
    });

  const { errors } = formState;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createTestCluster = useCreateTestCluster();

  const onSubmit = (data: CreateTestClusterDto) => {
    data.testQuestionId = testQuestionId;
    createTestCluster.mutate(data);
  };

  return (
    <Box>
      <Checkbox
        {...register('isSample')}
        defaultChecked={previousValues?.isSample || false}
      />
      <Input
        {...register('maxExecutionTime')}
        defaultValue={previousValues?.maxExecutionTime || ''}
        type="number"
        placeholder="Max Execution Time (ms)"
      />
      {errors.maxExecutionTime && (
        <span>{errors.maxExecutionTime.message}</span>
      )}
      <Input
        {...register('maxExecutionTime')}
        defaultValue={previousValues?.maxExecutionTime || ''}
        type="number"
        placeholder="Max program memory (mb)"
      />
      {errors.maxMemory && <span>{errors.maxMemory.message}</span>}
      <Input
        {...register('points')}
        defaultValue={previousValues?.points || ''}
        type="number"
        placeholder="Points"
      />
      {errors.points && <span>{errors.points.message}</span>}
      {watch('testCases').map((testCase, index) => (
        <Box key={index}>
          <MultilineInput
            defaultValue={testCase.input.join('\n')}
            onValueChange={(value) => {
              const newTestCases = watch('testCases');
              newTestCases[index].input = value.split('\n');
              setValue('testCases', newTestCases);
            }}
          />
          <MultilineInput
            defaultValue={testCase.expectedOutput.join('\n')}
            onValueChange={(value) => {
              const newTestCases = watch('testCases');
              newTestCases[index].expectedOutput = value.split('\n');
              setValue('testCases', newTestCases);
            }}
          />
          <Button
            onClick={() => {
              const newTestCases = watch('testCases');
              newTestCases.splice(index, 1);
              setValue('testCases', newTestCases);
            }}
          >
            Delete test case
          </Button>
        </Box>
      ))}
      <Button onClick={handleOpenModal}>Add Test Case</Button>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <TestCaseForm
          onValueChange={(value) => {
            const newTestCases = watch('testCases');
            newTestCases.push(value);
            setValue('testCases', newTestCases);
          }}
        />
      </Modal>
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </Box>
  );
};
