import { Button } from '@mui/material';
import { useState } from 'react';
import styles from './OptionCreator.module.css';
import { Textarea } from '@mui/joy';

interface OptionCreatorProps {
  options: string[];
  setOptions: Function;
}

const OptionCreator: React.FC<OptionCreatorProps> = ({
  options,
  setOptions,
}) => {
  const [newOption, setNewOption] = useState<string>('');

  function addNewOption() {
    setOptions([...options, newOption]);
  }

  function deleteOption(option: string) {
    const newOptions = options.filter((o) => o !== option);
    setOptions(newOptions);
  }

  return (
    <>
      <p>Opcije:</p>
      <div className={styles.options}>
        {options.map((o) => (
          <div className={styles.option} key={o}>
            <p>{o}</p>
            <Button
              onClick={() => deleteOption(o)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <label className={styles.optionsLabel}>
        <Textarea
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Enter new option"
        />
        <Button
          className={styles.addButton}
          onClick={addNewOption}
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </label>
    </>
  );
};

export default OptionCreator;
