import { Modal } from '@mui/material';
import { useGetDetailedResult } from '../../api/useGetDetailedResult';
import EvaluationTable from '../EvaluationTable';
import { CompleteEvaluationResult } from '@internship-app/types';

export interface EvaluationModalProps {
  isOpen: boolean;
  answerId?: string;
  data?: CompleteEvaluationResult[];
}

export const EvaluationModal = ({
  isOpen,
  answerId,
  data,
}: EvaluationModalProps) => {
  const { data: result, isLoading } = useGetDetailedResult(answerId || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Test cluster not found</div>;
  }

  return (
    <Modal open={isOpen}>
      <EvaluationTable result={data || result} />
    </Modal>
  );
};
