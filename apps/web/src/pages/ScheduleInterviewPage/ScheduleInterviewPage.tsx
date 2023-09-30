import { Slot } from '@internship-app/types';
import { useRoute } from 'wouter';

import { useFetchAvailableInterviewSlots } from '../../api/useFetchAvailableInterviewSlots';
import { useScheduleInterview } from '../../api/useScheduleInterview';
import SlotPicker, { SlotPickerLayout } from '../../components/SlotPicker';
import { Path } from '../../constants/paths';

const ScheduleInterviewPage = () => {
  const [, params] = useRoute(Path.ScheduleInterview);

  const {
    data: slots,
    isLoading,
    isError,
    error,
  } = useFetchAvailableInterviewSlots(params?.internId);

  const scheduleInterview = useScheduleInterview();

  const handleSubmit = (selectedSlot: Slot) => {
    if (!selectedSlot || !params?.internId) return;

    scheduleInterview.mutate({
      internId: params.internId,
      interviewSlotId: selectedSlot.id,
    });
  };

  if (isLoading) return <SlotPickerLayout title="Loading..." />;

  if (isError || !slots)
    return (
      <SlotPickerLayout
        title={`Dogodila se greška (${error}). Molimo kontaktirajte nas na info@dump.hr`}
      />
    );

  if (slots?.length === 0) {
    return (
      <SlotPickerLayout title="Nema dostupnih termina. Molimo kontaktirajte nas na info@dump.hr" />
    );
  }

  return (
    <SlotPicker
      title="Odaberi termin za intervju"
      slots={slots}
      handleSubmit={handleSubmit}
    />
  );
};

export default ScheduleInterviewPage;
