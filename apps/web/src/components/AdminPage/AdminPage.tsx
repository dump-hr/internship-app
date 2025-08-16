import { LayoutSpacing } from '@components/LayoutSpacing/LayoutSpacing';
import { LogoHeader } from '@components/LogoHeader/LogoHeader';
import type { FC } from 'react';

type Props = {
  headerText?: string;
  children?: React.ReactNode;
};

export const AdminPage: FC<Props> = ({ headerText, children }) => {
  return (
    <>
      <LogoHeader text={headerText || ''} />
      <LayoutSpacing>{children}</LayoutSpacing>
    </>
  );
};
