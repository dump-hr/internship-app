import { useFetchTestSlot } from '@api/index';
import { TestSlotInfo } from '@components/index';
import { Path } from '@constants/index';
import { Box, Button } from '@mui/material';
import type { FC } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { navigate } from 'wouter/use-location';

type ExistingSlotInfoProps = {
  slotId: string;
};

export const ExistingSlotInfo: FC<ExistingSlotInfoProps> = ({ slotId }) => {
  const { data: slot, isLoading, error } = useFetchTestSlot(slotId);

  if (isLoading) return <LoaderIcon />;
  if (error || !slot) return <>Error: {error}</>;

  return (
    <Box display="flex" flexDirection="column">
      <Button
        variant="contained"
        onClick={() =>
          navigate(Path.TestOverview.replace(':testSlotId', slotId))
        }
      >
        Otvori
      </Button>
      <TestSlotInfo slot={slot} simple />
    </Box>
  );
};
