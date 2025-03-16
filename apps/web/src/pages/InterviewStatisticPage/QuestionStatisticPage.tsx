import LayoutSpacing from '../../components/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import { useRoute } from 'wouter';
import { Path } from '../../constants/paths';
import { useFetchAllAnswers } from '../../api/useFetchAllAnswers';
import { AnswerInfo } from '../../components/QuestionStatisticPage';
import { Typography } from '@mui/material';
import { LoaderIcon } from 'react-hot-toast';

export const QuestionStatisticPage = () => {
  const [, params] = useRoute(Path.QuestionStatistic);
  const { data: answers, isFetching } = useFetchAllAnswers(params?.id || '');

  if (isFetching) {
    return <LoaderIcon />;
  }

  return (
    <>
      <LogoHeader text="QuestionStatistic" />
      <LayoutSpacing>
        {answers?.length ? (
          <>
            <Typography variant="h3" sx={{ mb: 3 }}>
              Pitanje: {answers[0]?.question}
            </Typography>
            {answers?.map((answer) => (
              <AnswerInfo key={answer.internId} answer={answer} />
            ))}
          </>
        ) : (
          <>
            <Typography variant="h2">Nema odgovora odabrano pitanje</Typography>
          </>
        )}
      </LayoutSpacing>
    </>
  );
};
