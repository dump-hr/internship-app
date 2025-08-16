import { InternDiscipline } from '@internship-app/types';

import type { FC } from 'react';

import * as styled from './styled';
import {
  disciplineLabel,
  disciplineStatusLabel,
  testStatusLabel,
} from '@constants/index';

type DisciplineCardProps = {
  internDiscipline: InternDiscipline;
};

export const DisciplineCard: FC<DisciplineCardProps> = ({
  internDiscipline: ind,
}) => {
  return (
    <styled.disciplineCard discipline={ind.discipline}>
      <styled.disciplineCardLabel>
        {disciplineLabel[ind.discipline]}
      </styled.disciplineCardLabel>
      <styled.statusSection>
        <styled.statusLabel>Status područja</styled.statusLabel>
        <styled.statusBox>
          <styled.statusValue>
            {disciplineStatusLabel[ind.status]}
          </styled.statusValue>
        </styled.statusBox>
      </styled.statusSection>
      {ind.testStatus && (
        <styled.statusSection>
          <styled.statusLabel>Status ispita</styled.statusLabel>
          <styled.statusBox>
            <styled.statusValue>
              {typeof ind.testScore === 'number' ? (
                <>
                  {ind.internQuestionAnswers.map((answer, index) => {
                    return (
                      <div key={index}>
                        {index + 1}. zadatak: {answer.score} /{' '}
                        {answer.question.points}
                      </div>
                    );
                  })}

                  <div>Ukupno: {ind.testScore}</div>
                </>
              ) : (
                testStatusLabel[ind.testStatus]
              )}
            </styled.statusValue>
          </styled.statusBox>
        </styled.statusSection>
      )}
    </styled.disciplineCard>
  );
};
