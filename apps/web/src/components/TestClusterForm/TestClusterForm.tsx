import {
  CreateTestClusterDto,
  TestClusterWithTestCases,
} from '@internship-app/types';
import { useForm } from 'react-hook-form';
import { useCreateTestCluster } from '../../api/useCreateTestCluster';
import { Box, Button, Checkbox, Input, Modal, Typography } from '@mui/material';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { useState } from 'react';
import { TestCaseForm } from '../TestCaseForm/TestCaseForm';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import { useUpdateTestCluster } from '../../api/useUpdateTestCluster';

export interface TestClusterQuestionOption {
  id: string;
  title: string;
}

export interface TestClusterFormProps {
  testQuestions: TestClusterQuestionOption[];
  previousValues?: TestClusterWithTestCases;
  onSubmitted?: () => void;
}

//TODO: potentially rewrite a part of this to remove arrow functions and make handlers

export const TestCaseClusterForm = ({
  testQuestions,
  onSubmitted,
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
  const updateTestCluster = useUpdateTestCluster();

  const onSubmit = async (data: CreateTestClusterDto) => {
    if (previousValues)
      return await updateTestCluster.mutateAsync({
        data,
        id: previousValues.id,
      });

    await createTestCluster.mutateAsync(data);

    onSubmitted && onSubmitted();
  };

  return (
    <Box>
      <CustomSelectInput
        isMultiSelect={false}
        menuOptions={testQuestions.map((testQuestion) => {
          return {
            key: testQuestion.id,
            value: testQuestion.title,
          };
        })}
        label="Test question (title)"
        valueHandler={(selectedTestQuestion) =>
          setValue('testQuestionId', selectedTestQuestion[0])
        }
      />
      <Typography>Sample test (no points awarded)</Typography>
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
      <Typography>Test cases list</Typography>
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
