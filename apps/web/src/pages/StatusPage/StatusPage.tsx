import { Typography } from '@mui/material';
import { useRoute } from 'wouter';

import { useFetchStatus } from '../../api/useFetchStatus';
import PublicLayout from '../../components/PublicLayout';
import { Path } from '../../constants/paths';
import * as styled from './styled';

const StatusPage = () => {
  const [, params] = useRoute(Path.Status);
  const internId = params?.internId || '';
  const { data: intern, isFetching } = useFetchStatus(internId);

  if (isFetching) {
    return <Typography>Učitavanje...</Typography>;
  }

  if (!intern) {
    return <Typography>Ne postoji prijava s tim ID-em!</Typography>;
  }

  return (
    <PublicLayout>
      <styled.mainInfo>
        <styled.header>
          <styled.greetTitle>Bok Matija!</styled.greetTitle>
          <styled.description>
            Ovdje možeš pratiti svoj trenutni status i rezultate ispita. O upadu
            na DUMP Internship ćeš biti obavješten preko e-maila.
          </styled.description>
        </styled.header>
      </styled.mainInfo>
    </PublicLayout>
  );
};

export default StatusPage;
