import { Button } from '@mui/material';
import { useState } from 'react';

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

  return (
    <label>
      Opcije:
      {options.map((o) => (
        <p key={o}>{o}</p>
      ))}
      <input
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        type="text"
      />
      <Button onClick={addNewOption}>Add</Button>
    </label>
  );
};

export default OptionCreator;
