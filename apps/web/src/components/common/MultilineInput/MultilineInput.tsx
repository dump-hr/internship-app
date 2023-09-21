import { TextField } from '@mui/material';

import styles from './index.module.css';

export const MultilineInput = () => {
  return <TextField className={styles.fieldWrapper} multiline />;
};
