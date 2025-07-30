import { useRoute } from 'wouter';

import { useFetchIntern } from '@api/index/useFetchIntern';
import {
  AdminPage,
  InternInfo,
  InternActions,
  DecisionHandler,
} from '@components/index';
import { Path } from '@constants/index';

export const InternInfoPage = () => {
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
