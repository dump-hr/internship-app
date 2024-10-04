import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { useRoute } from 'wouter';

import { useFetchIntern } from '../../api/useFetchIntern';
import AdminPage from '../../components/AdminPage';
import DecisionHandler from '../../components/DecisionHandler/DecisionHandler';
import InternActions from '../../components/InternActions/InternActions';
import InternInfo from '../../components/InternInfo';
import { Path } from '../../constants/paths';

const InternInfoPage = () => {
  useMsalAuthentication(InteractionType.Redirect);

  const [, params] = useRoute(Path.Intern);
  const internId = params?.internId;
  const { data: intern, isLoading, isError } = useFetchIntern(internId);

  if (isLoading) {
    return <div>Učitavanje...</div>;
  }

  if (isError || !intern) {
    return <div>Dogodila se greška</div>;
  }

  return (
    <AdminPage>
      <InternInfo intern={intern!} />
      <InternActions intern={intern} />
      <DecisionHandler intern={intern} />
    </AdminPage>
  );
};

export default InternInfoPage;
