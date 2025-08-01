import { Global } from '@emotion/react';

import DUMPLogo from '../../assets/dump-logo.png';
import * as styled from './styled';

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const PublicLayout: React.FC<Props> = ({ children, ...handlers }) => {
  return (
    <>
      <Global styles={styled.globalStyle} />
      <styled.main {...handlers}>
        <styled.logo src={DUMPLogo} />
        {children}
      </styled.main>
    </>
  );
};
