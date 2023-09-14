import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useRoute } from 'wouter';

import { useGetIntern } from '../../api/useGetIntern';
import { Path } from '../../constants/paths';
import { DatePicker, MuiDate } from './DatePicker';
import { Layout } from './Layout';
import { TimeSlotPicker } from './TimeSlotPicker';

const availableDates = [
  new Date('2023-9-4'),
  new Date('2023-9-5'),
  new Date('2023-9-7'),
  new Date('2023-9-8'),
  new Date('2023-9-10'),
  new Date('2023-9-11'),
  new Date('2023-10-11'),
  new Date('2023-10-12'),
];

const availableSlots = [
  new Date('2023-09-10T09:00:00'),
  new Date('2023-09-10T09:30:00'),
  new Date('2023-09-10T10:00:00'),
  new Date('2023-09-10T10:30:00'),
  new Date('2023-09-10T11:00:00'),
  new Date('2023-09-10T11:30:00'),
  new Date('2023-09-10T12:00:00'),
  new Date('2023-09-10T12:30:00'),
  new Date('2023-09-10T14:00:00'),
  new Date('2023-09-10T14:30:00'),
  new Date('2023-09-10T15:00:00'),
  new Date('2023-09-10T15:30:00'),
];

const ScheduleInterviewPage = () => {
  const [, params] = useRoute(Path.ScheduleInterview);
  const isMobile = useMediaQuery('(max-width:700px)');

  const { data: intern, isLoading, isError } = useGetIntern(params?.internId);

  const [selectedDate, setSelectedDate] = useState<MuiDate | null>(null);

  if (isLoading) return <Layout title="Loading..." />;

  if (isError)
    return (
      <Layout
        title={
          <>
            Intern not found. Please contact us at{' '}
            <a href="mailto:info@dump.hr">info@dump.hr</a>
          </>
        }
      />
    );

  return (
    <Layout title={`Pozdrav ${intern?.firstName}, odaberi termin za intervju`}>
      <Box
        sx={{
          display: 'flex',
          alignItems: isMobile ? 'center' : 'flex-end',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <DatePicker
          availableDates={availableDates}
          onChange={setSelectedDate}
        />
        {!!selectedDate && (
          <TimeSlotPicker
            availableTimeSlots={availableSlots.filter(
              (slot) =>
                slot.getDate() === selectedDate.$D &&
                slot.getMonth() === selectedDate.$M &&
                slot.getFullYear() === selectedDate.$y,
            )}
            isMobile={isMobile}
            onChange={(slot) => console.log(slot)}
          />
        )}
      </Box>
    </Layout>
  );
};

export default ScheduleInterviewPage;
