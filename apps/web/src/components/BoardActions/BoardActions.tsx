import { BoardAction, BoardActionType } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { ConfirmDialog } from '../ConfirmDialog';
import InputHandler from '../InputHandler';
import { actionQuestion, options } from './consts';

type BoardActionProps = {
  handleSubmit: (action: BoardAction) => void;
};

const BoardActions: React.FC<BoardActionProps> = ({ handleSubmit }) => {
  const form = useForm();
  const currentAction: BoardActionType = useWatch({
    control: form.control,
    name: 'actionType',
  });

  const handleFormSubmit = form.handleSubmit((data) =>
    handleSubmit(data as BoardAction),
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <ConfirmDialog
        open={!!dialogOpen}
        handleClose={(confirmed) => {
          if (confirmed) handleFormSubmit();
          setDialogOpen(false);
        }}
        title="Potvrdi izvršenje akcije!"
        description="Oprezno - izazvanu štetu možda neće biti moguće popraviti."
      />

      <Box>
        <Button
          variant="contained"
          color="warning"
          disabled={!currentAction}
          onClick={() => setDialogOpen(true)}
        >
          Podnesi
        </Button>

        <Box display="flex" gap="20px">
          <Box width="200px">
            <InputHandler question={actionQuestion} form={form} />
          </Box>
          {options[currentAction]?.questions.map((q) => (
            <Box width="200px" key={q.id}>
              <InputHandler question={q} form={form} />
            </Box>
          ))}
        </Box>

        <Typography variant="body2">
          {options[currentAction]?.description}
        </Typography>
      </Box>
    </>
  );
};

export default BoardActions;
