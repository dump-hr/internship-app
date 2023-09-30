import { LoaderIcon } from 'react-hot-toast';
import { useRoute } from 'wouter';

import { useFetchTestSlot } from '../../api/useFetchTestSlot';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import TestSlotInfo from '../../components/TestSlotInfo';
import { Path } from '../../constants/paths';
import { TestSlotEditForm } from './TestSlotEditForm';

const TestOverviewPage = () => {
  const [, params] = useRoute(Path.TestOverview);
  const { data: slot, isLoading, error } = useFetchTestSlot(params?.testSlotId);

  if (isLoading) return <LoaderIcon />;
  if (error || !slot) return <>Error: {error}</>;

  return (
    <LayoutSpacing>
      <TestSlotInfo slot={slot} />
      <TestSlotEditForm slot={slot} />
    </LayoutSpacing>
  );
};
export default TestOverviewPage;
