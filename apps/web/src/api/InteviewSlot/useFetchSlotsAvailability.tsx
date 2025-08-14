import { api } from '@api/index';
import { SlotAvailability } from '@internship-app/types';
import { useQuery } from 'react-query';

const fetchSlotsAvailability = async () =>
  await api.get<never, SlotAvailability[]>('/interview-slot/availability');

export const useFetchSlotsAvailability = () => {
  return useQuery(['interview-slot/availability'], fetchSlotsAvailability);
};
