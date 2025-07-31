import { LayoutSpacing } from '@components/LayoutSpacing/LayoutSpacing';
import { LogoHeader } from '@components/LogoHeader/LogoHeader';

type Props = {
  headerText?: string;
  children?: React.ReactNode;
};

export const AdminPage: React.FC<Props> = ({ headerText, children }) => {
  return (
    <>
      <LogoHeader text={headerText || ''} />
      <LayoutSpacing>{children}</LayoutSpacing>
    </>
  );
};
