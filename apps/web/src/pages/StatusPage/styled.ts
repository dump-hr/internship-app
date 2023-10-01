import styled from '@emotion/styled';

import { fuseDisplay, fuseDisplayBold } from '../../styles/fonts';
import { breakpoints, colors } from '../../styles/variables';

export const mainInfo = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24;

  @media screen and (min-width: ${breakpoints.tablet}) {
    padding: 64;
    gap: 16;

    border-radius: 24px;
    box-shadow:
      0px 8px 40px 0px rgba(214, 224, 233, 0.31),
      0px 4px 16px 0px rgba(214, 224, 233, 0.12),
      0px 2px 6px 0px rgba(214, 224, 233, 0.06);
  }
`;

export const header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const greetTitle = styled.h2`
  ${fuseDisplayBold}
  color: ${colors.darkBlue};
  font-size: 32px;
  line-height: 36px;
`;

export const description = styled.p`
  ${fuseDisplay}
  color: ${colors.gray};
  font-size: 16px;
  line-height: 22px;
`;

export const infoTitle = styled.h4`
  ${fuseDisplay}
  font-size: 18px;
  line-height: 28px;
`;

export const infoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
