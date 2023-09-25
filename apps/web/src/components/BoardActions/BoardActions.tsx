import { BoardAction } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';

import InputHandler from '../InputHandler';
import { actionQuestion, options } from './consts';

const BoardActions: React.FC = () => {
  const form = useForm();
  const currentAction: BoardAction = useWatch({
    control: form.control,
    name: 'actionType',
  });

  return (
    <Box>
      <Box display="flex" gap="20px" alignItems="center">
        <Box width="200px">
          <InputHandler question={actionQuestion} form={form} />
        </Box>
        {options[currentAction]?.questions.map((q) => (
          <Box width="200px" key={q.id}>
            <InputHandler question={q} form={form} />
          </Box>
        ))}
        <Button variant="contained" color="warning" disabled={!currentAction}>
          Podnesi
        </Button>
      </Box>
      <Typography>{options[currentAction]?.description}</Typography>
    </Box>
  );
};

export default BoardActions;
