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

  function deleteOption(option: string) {
    const newOptions = options.filter((o) => o !== option);
    setOptions(newOptions);
  }

  return (
    <>
      <p>Opcije:</p>
      <div className="options">
        {options.map((o) => (
          <div className="option" key={o}>
            <p>{o}</p>
            <Button onClick={() => deleteOption(o)}>Delete</Button>
          </div>
        ))}
      </div>
      <label>
        <input
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          type="text"
        />
        <Button onClick={addNewOption}>Add</Button>
      </label>
    </>
  );
};

export default OptionCreator;
