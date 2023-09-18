import { useRoute } from 'wouter';

import { Path } from '../../constants/paths';

const CandidateInfoPage = () => {
  const [, params] = useRoute(Path.Candidate);
  const internId: string | undefined = params?.internId;

  return (
      {internId}
  );
};

export default CandidateInfoPage;
