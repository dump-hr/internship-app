import { Discipline, Slot } from '@internship-app/types';
import { useRoute } from 'wouter';

import { useFetchAvailableTestSlots } from '../../api/useFetchAvailableTestSlots';
import { useScheduleTest } from '../../api/useScheduleTest';
import { SlotPicker, Layout as SlotPickerLayout } from '@components/index';
import { disciplineLabel } from '@constants/index';
import { Path } from '@constants/index';

type Params = { internId: string; discipline: Discipline };

export const ScheduleTestPage = () => {
  const [, params] = useRoute<Params>(Path.ScheduleTest);

  const {
    data: slots,
    isLoading,
    isError,
    error,
  } = useFetchAvailableTestSlots(params?.internId, params?.discipline);

  const scheduleTest = useScheduleTest();

  const handleSubmit = (selectedSlot: Slot) => {
    if (!selectedSlot || !params?.internId) return;

    scheduleTest.mutate({
      internId: params.internId,
      testSlotId: selectedSlot.id,
      discipline: params.discipline,
    });
  };

  if (isLoading) return <SlotPickerLayout title="Loading..." />;

  if (isError || !params?.discipline || !params.internId || !slots)
    return (
      <SlotPickerLayout
        title={`Dogodila se greška (${error}). Molimo kontaktirajte nas po potrebi na info@dump.hr`}
      />
    );

  return (
    <SlotPicker
      title={`Odaberi termin za ispit iz područja ${
        disciplineLabel[params.discipline]
      }`}
      slots={slots}
      handleSubmit={handleSubmit}
    />
  );
};
