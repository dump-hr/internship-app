import { useApplyInternAction } from '@api/index';
import {
  Intern,
  InternAction,
  InternActionRequest,
} from '@internship-app/types';
import { Typography } from '@mui/material';

import Actions from '../Actions/Actions';
import { getInternOptions } from './options';

type InternActionsProps = {
  intern: Intern;
};

export const InternActions: React.FC<InternActionsProps> = ({ intern }) => {
  const options = getInternOptions(intern);
  const applyInternAction = useApplyInternAction();

  const actionHandler = (action: InternAction) => {
    const request: InternActionRequest = { action, internId: intern.id };
    applyInternAction.mutate(request);
  };

  return (
    <>
      <Typography variant="h4">Akcije</Typography>
      <Actions options={options} handleSubmit={actionHandler} />
    </>
  );
};
