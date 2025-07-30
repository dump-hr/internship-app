import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { navigate } from 'wouter/use-location';

import { useChooseTest } from '@api/index/TestHooks/useChooseTest';
import { AdminPage } from '@components/index';
import { Path } from '@constants/index';

export const TestChoosePage = () => {
  const [password, setPassword] = useState('');
  const chooseTest = useChooseTest();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    chooseTest.mutate(
      { password },
      {
        onSuccess: (slot) =>
          navigate(Path.Test.replace(':testSlotId', slot.id)),
      },
    );
  };

  return (
    <AdminPage>
      <form onSubmit={handleSubmit}>
        <TextField
          id="password"
          label="Zaporka"
          type="password"
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="secondary">
          Otvori
        </Button>
      </form>
    </AdminPage>
  );
};
