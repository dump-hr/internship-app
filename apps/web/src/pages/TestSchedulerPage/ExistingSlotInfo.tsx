import { Box, Button } from '@mui/material';
import { LoaderIcon } from 'react-hot-toast';
import { navigate } from 'wouter/use-location';

import { useFetchTestSlot } from '../../api/useFetchTestSlot';
import TestSlotInfo from '../../components/TestSlotInfo';
import { Path } from '../../constants/paths';

type ExistingSlotInfoProps = {
  slotId: string;
};

export const ExistingSlotInfo: React.FC<ExistingSlotInfoProps> = ({
  slotId,
}) => {
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
