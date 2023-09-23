import { useRoute } from 'wouter';
import { isError } from 'react-query';

import { useFetchIntern } from '../../api/useFetchIntern';
import CandidateInfo from '../../components/CandidateInfo';
import { Path } from '../../constants/paths';

const CandidateInfoPage = () => {
  const [, params] = useRoute(Path.Candidate);
  const internId = params?.internId;
  const { data: intern, isLoading } = useFetchIntern(internId);

  console.log(intern);
  if (isLoading) {
    return <div>Učitavanje...</div>;
  }
  if (isError(intern)) {
    return <div>Dogodila se greška</div>;
  }
  return <CandidateInfo intern={intern!} />;
};

export default CandidateInfoPage;
