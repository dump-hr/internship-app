import { BoardAction, BoardActionRequest } from '@internship-app/types';
import toast from 'react-hot-toast';

import { useApplyBoardAction } from '../../api/useApplyBoardAction';
import Actions from '../Actions/Actions';
import { options } from './consts';

type BoardActionProps = {
  internIds: string[];
};

const BoardActions: React.FC<BoardActionProps> = ({ internIds }) => {
  const applyBoardAction = useApplyBoardAction();

  const actionHandler = (action: BoardAction) => {
    if (!internIds.length) return toast.error('Selektiraj pripravnike!');

    const request: BoardActionRequest = { action, internIds: internIds };
    applyBoardAction.mutate(request);
  };

  return <Actions handleSubmit={actionHandler} options={options} />;
};

export default BoardActions;
