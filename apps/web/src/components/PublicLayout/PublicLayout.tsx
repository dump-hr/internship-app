import { Global } from '@emotion/react';

import DUMPLogo from '../../assets/dump-logo.png';
import * as styled from './styled';
import type { FC } from 'react';

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const PublicLayout: FC<Props> = ({ children, ...handlers }) => {
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
