import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { useRoute } from 'wouter';

import { useDeleteTestSlot } from '../../api/useDeleteTestSlot';
import { useFetchTestSlot } from '../../api/useFetchTestSlot';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import TestSlotInfo from '../../components/TestSlotInfo';
import { Path } from '../../constants/paths';
import { TestSlotEditForm } from './TestSlotEditForm';

const TestOverviewPage = () => {
  const [, params] = useRoute(Path.TestOverview);
  const [isEditOpened, setIsEditOpened] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: slot, isLoading, error } = useFetchTestSlot(params?.testSlotId);
  const deleteTestSlot = useDeleteTestSlot(params!.testSlotId);

  if (isLoading) return <LoaderIcon />;
  if (error || !slot) return <>Error: {error}</>;

  return (
    <LayoutSpacing>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={(confirmed) => {
          if (confirmed) deleteTestSlot.mutate();
          setDialogOpen(false);
        }}
        title="Potvrdi izvršenje akcije!"
        description="Oprez - brisanje je ireverzibilno!"
      />

      <TestSlotInfo slot={slot} />

      <Box display="flex" gap="30px">
        <Button
          variant="contained"
          color="error"
          onClick={() => setDialogOpen(true)}
        >
          Obriši
        </Button>
        {!isEditOpened && (
          <Button variant="contained" onClick={() => setIsEditOpened(true)}>
            Uredi
          </Button>
        )}
      </Box>

      {isEditOpened && (
        <TestSlotEditForm
          slot={slot}
          closeEdit={() => setIsEditOpened(false)}
        />
      )}
    </LayoutSpacing>
  );
};
export default TestOverviewPage;
