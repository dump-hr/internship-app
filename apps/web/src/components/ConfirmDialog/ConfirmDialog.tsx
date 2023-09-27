import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  handleClose: (confirm: boolean) => void;
  title: string;
  description?: string;
};

export const ConfirmDialog: React.FC<Props> = ({
  open,
  handleClose,
  title,
  description,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
