import { useFetchIntern } from '@api/index';
import {
  AdminPage,
  DecisionHandler,
  InternActions,
  InternInfo,
} from '@components/index';
import { Path } from '@constants/index';
import { useRoute } from 'wouter';

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
