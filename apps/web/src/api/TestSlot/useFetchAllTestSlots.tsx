import { TestSlotPreviewDto } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '@api/index';

const fetchAllTestSlots = async () => {
  const slots = await api.get<never, TestSlotPreviewDto[]>('/test-slot');

  return slots.map((slot) => ({
    ...slot,
    start: new Date(slot.start),
    end: new Date(slot.end),
  }));
};

export const useFetchAllTestSlots = () => {
  return useQuery(['test-slot'], fetchAllTestSlots);
};
