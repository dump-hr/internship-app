import { InterviewQuestion } from '@internship-app/types';

import {
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  Box,
  FormControlLabel,
} from '@mui/material';
import { useState } from 'react';
import { EditQuestionModal } from './EditQuestionModal';

type QuestionInfoProps = {
  question: InterviewQuestion;
  handleEditQuestion: (updatedQuestion: InterviewQuestion) => void;
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

export const QuestionInfo = ({
  question,
  handleEditQuestion,
}: QuestionInfoProps) => {
  const [editOpenModal, setEditOpenModal] = useState<boolean>(false);

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
        <Button
          variant="outlined"
          sx={{ mx: 2 }}
          onClick={() => setEditOpenModal(true)}
        >
          Edit
        </Button>

        <Button variant="contained" color="primary">
          Stats
        </Button>

        <EditQuestionModal
          question={question}
          open={editOpenModal}
          onClose={() => setEditOpenModal(false)}
          handleEditQuestion={handleEditQuestion}
        />
      </Box>
    </Card>
  );
};
