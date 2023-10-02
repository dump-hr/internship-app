import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { breakpoints, colors } from '../../styles/variables';

export const globalStyle = css`
  body {
    background: ${colors.dumpWhite};
  }

  * {
    margin: 0;
  }
`;

export const main = styled.div`
  margin: 0px auto;
  padding: 24px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.tablet}) {
    padding: 80px;
    max-width: 1300px;
  }
`;

export const logo = styled.img`
  align-self: flex-end;
  height: 24px;
  width: 77px;
  margin-bottom: 40px;

  @media screen and (min-width: ${breakpoints.tablet}) {
    align-self: flex-start;
    margin-bottom: 32px;
  }
`;
