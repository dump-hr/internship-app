import { TextField } from '@mui/material';

import styles from './index.module.css';

interface Props {
  onValueChange: (value: string) => void;
}

export const MultilineInput = ({ onValueChange }: Props) => {
  return (
    <TextField
      className={styles.fieldWrapper}
      multiline
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};
