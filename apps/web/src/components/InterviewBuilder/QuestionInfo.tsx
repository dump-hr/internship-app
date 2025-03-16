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
import { useState } from 'react';
import { EditQuestionModal } from './EditQuestionModal';
import { navigate } from 'wouter/use-location';
import { Path } from '../../constants/paths';

type QuestionInfoProps = {
  question: Question;
  handleEditQuestion: (updatedQuestion: Question) => void;
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
  const [isEnabled, setIsEnabled] = useState<boolean>(
    question.isEnabled ?? true,
  );

  const categoryColor = disciplineColors[question.category ?? 'General'];

  const handleSwitchChange = () => {
    const updatedQuestion = { ...question, isEnabled: !isEnabled };
    setIsEnabled(!isEnabled);
    handleEditQuestion(updatedQuestion);
  };

  const handleShowStatistic = () => {
    navigate(Path.QuestionStatistic.replace(':id', question.id));
  };

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
          label={isEnabled ? 'Disable' : 'Enable'}
          control={<Switch checked={isEnabled} onChange={handleSwitchChange} />}
        />
        <Button
          variant="outlined"
          sx={{ mx: 2 }}
          onClick={() => setEditOpenModal(true)}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleShowStatistic}
        >
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
