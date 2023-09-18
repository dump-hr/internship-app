import { useRoute } from 'wouter';

import { useFetchIntern } from '../../api/useFetchIntern';
import { Path } from '../../constants/paths';

const CandidateInfoPage = () => {
  const [, params] = useRoute(Path.Candidate);
  const internId: string | undefined = params?.internId;
  const { data: intern, isFetching } = useFetchIntern(internId as string);
  console.log(intern);
  if (isFetching) {
    return <div>Učitavanje...</div>;
  }

  return ({internId}
  );
};

export default CandidateInfoPage;
