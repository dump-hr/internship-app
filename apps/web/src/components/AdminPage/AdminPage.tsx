import LayoutSpacing from '../LayoutSpacing/LayoutSpacing';
import LogoHeader from '../LogoHeader';

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
