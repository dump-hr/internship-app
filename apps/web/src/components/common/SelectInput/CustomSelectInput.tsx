import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';

import styles from './index.module.css';

interface Props {
  label: string;
  menuOptions: string[] | undefined;
  isMultiSelect: boolean;
  valueHandler?: (value: string) => void;
}

export const CustomSelectInput: React.FC<Props> = ({
  label,
  menuOptions,
  isMultiSelect,
  valueHandler,
}: Props) => {
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    valueHandler && valueHandler(selectedValues);
  }, [selectedValues]);

  return (
    <FormControl className={styles.form}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={isMultiSelect}
        value={selectedValues}
        onChange={(e) => setSelectedValues(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {menuOptions?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
