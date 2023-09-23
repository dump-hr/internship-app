import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import type { InterviewSlot } from '@prisma/client';

type Props = {
  availableTimeSlots: InterviewSlot[];
  onChange: (date: InterviewSlot) => void;
  isMobile: boolean;
};

export const TimeSlotPicker: React.FC<Props> = ({
  availableTimeSlots,
  onChange,
  isMobile,
}) => {
  return (
    <List
      sx={{
        flexGrow: 1,
        width: isMobile ? '100%' : 'auto',
        maxHeight: isMobile ? 'none' : '350px',
        marginTop: isMobile ? 0 : '100px',
        overflowY: 'auto',
      }}
    >
      {availableTimeSlots.map((slot) => (
        <ListItem key={slot.id}>
          <ListItemButton
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.6)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
            onClick={() => onChange(slot)}
          >
            <ListItemText
              primary={slot.start.toLocaleTimeString('hr-HR', {
                timeStyle: 'short',
              })}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
