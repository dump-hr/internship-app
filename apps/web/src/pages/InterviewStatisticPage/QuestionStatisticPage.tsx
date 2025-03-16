import { Box } from '@mui/joy';
import LayoutSpacing from '../../components/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import { Typography } from '@mui/material';
import { useRoute } from 'wouter';
import { Path } from '../../constants/paths';

export const QuestionStatisticPage = () => {
  const [, params] = useRoute(Path.QuestionStatistic);
  console.log(params);

  return (
    <>
      <LogoHeader text="QuestionStatistic" />
      <LayoutSpacing>
        <Box>
          <Typography variant="h2">{params?.id}</Typography>
        </Box>
      </LayoutSpacing>
    </>
  );
};
