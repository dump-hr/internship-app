import { TextField } from '@mui/material';

import styles from './index.module.css';

interface Props {
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

export const MultilineInput = ({ onValueChange, defaultValue }: Props) => {
  return (
    <TextField
      className={styles.fieldWrapper}
      defaultValue={defaultValue}
      multiline
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};
