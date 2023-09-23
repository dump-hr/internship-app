import { useRoute } from 'wouter';

import { useFetchIntern } from '../../api/useFetchIntern';
import InternInfo from '../../components/InternInfo';
import { Path } from '../../constants/paths';

const InternInfoPage = () => {
  const [, params] = useRoute(Path.Intern);
  const internId = params?.internId;
  const { data: intern, isLoading, isError } = useFetchIntern(internId);

  if (isLoading) {
    return <div>Učitavanje...</div>;
  }
  if (isError) {
    return <div>Dogodila se greška</div>;
  }
  return <InternInfo intern={intern!} />;
};

export default InternInfoPage;
