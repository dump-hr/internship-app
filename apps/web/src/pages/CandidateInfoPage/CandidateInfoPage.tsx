import { useRoute } from 'wouter';

import { useFetchIntern } from '../../api/useFetchIntern';
import CandidateInfo from '../../components/CandidateInfo';
import { Path } from '../../constants/paths';

const CandidateInfoPage = () => {
  const [, params] = useRoute(Path.Candidate);
  const internId: string | undefined = params?.internId;
  const { data: intern, isFetching } = useFetchIntern(internId as string);

  if (isFetching) {
    return <div>Učitavanje...</div>;
  }

  return (
    <div>
      <CandidateInfo item={intern!} />
    </div>
  );
};

export default CandidateInfoPage;
