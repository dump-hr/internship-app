import { useApplyBoardAction } from '@api/index';
import { BoardAction, BoardActionRequest } from '@internship-app/types';
import type { FC } from 'react';
import toast from 'react-hot-toast';

import Actions from '../Actions/Actions';
import { options } from './options';

type BoardActionProps = {
  internIds: string[];
};

export const BoardActions: FC<BoardActionProps> = ({ internIds }) => {
  const applyBoardAction = useApplyBoardAction();

  const actionHandler = (action: BoardAction) => {
    if (!internIds.length) return toast.error('Selektiraj pripravnike!');

    const request: BoardActionRequest = { action, internIds: internIds };
    applyBoardAction.mutate(request);
  };

  return <Actions handleSubmit={actionHandler} options={options} />;
};
