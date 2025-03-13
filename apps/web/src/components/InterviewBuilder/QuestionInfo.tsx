import { Question } from '@internship-app/types';

import {
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  Box,
  FormControlLabel,
} from '@mui/material';

type QuestionInfoProps = {
  question: Question;
};

const disciplineColors = {
  Development: '#0E9061',
  Design: '#C42635',
  Marketing: '#2660B6',
  Multimedia: '#53468B',
  General: '#5ae053',
  Personal: '#000',
  Final: '#999',
};

export const QuestionInfo = ({ question }: QuestionInfoProps) => {
  const categoryColor = disciplineColors[question.category] || '#000';

  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h6">{question.question}</Typography>
          <Box display="flex" gap="10px">
            <Typography variant="subtitle2" sx={{ color: categoryColor }}>
              {question.category}
            </Typography>
            <Typography variant="subtitle2">{question.type}</Typography>
          </Box>
        </CardContent>

        <FormControlLabel
          label={question.isEnabled ? 'Disable' : 'Enable'}
          control={<Switch checked={question.isEnabled} />}
        />
        <Button variant="outlined" sx={{ mx: 2 }}>
          Edit
        </Button>

        <Button variant="contained" color="primary">
          Stats
        </Button>
      </Box>
    </Card>
  );
};
