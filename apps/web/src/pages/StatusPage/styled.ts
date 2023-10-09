import styled from '@emotion/styled';
import { Discipline } from '@internship-app/types';

import { fuseDisplay, fuseDisplayBold } from '../../styles/fonts';
import { breakpoints, colors, disciplineColors } from '../../styles/variables';

export const layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;

  @media screen and (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: flex-start;
    gap: 80px;
  }
`;

export const mainInfo = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: ${breakpoints.tablet}) {
    padding: 64px;
    gap: 16px;

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

export const infoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: ${breakpoints.tablet}) {
    padding: 16px;
    border: 1px solid ${colors.lightGray};
    border-radius: 8px;
  }
`;

export const interviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.lightGray};
`;

export const infoTitle = styled.h4`
  ${fuseDisplay}
  color: ${colors.darkGray};
  font-size: 18px;
  line-height: 28px;
`;

export const link = styled.a`
  ${fuseDisplay}
  color: ${colors.gray};
  font-size: 13px;
  line-height: 18px;
`;

export const infoText = styled.p`
  ${fuseDisplay}
  color: ${colors.gray};
  font-size: 13px;
  line-height: 18px;
`;

export const disciplinesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const disciplineItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.lightGray};
`;

export const disciplineLabel = styled.p`
  ${fuseDisplayBold}
  color: ${colors.green};
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
`;

export const spacedBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const disciplineCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: ${breakpoints.tablet}) {
    min-width: 456px;
  }
`;

export const disciplineCard = styled.div<{ discipline: Discipline }>`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 20px;
  color: ${colors.dumpWhite};
  border-radius: 8px;

  background: ${({ discipline }) => disciplineColors[discipline]};
`;

export const disciplineCardLabel = styled.h3`
  ${fuseDisplayBold}
  font-size: 36px;
  margin: 0px;
  line-height: 44px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.dumpWhite}44;
`;

export const statusSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const statusLabel = styled.p`
  ${fuseDisplayBold}
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
`;

export const statusValue = styled.p`
  ${fuseDisplay}
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
`;

export const statusBox = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.12);
`;
