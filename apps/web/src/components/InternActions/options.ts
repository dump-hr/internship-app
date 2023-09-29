import {
  ActionOptions,
  Discipline,
  Intern,
  InternActionType,
  QuestionType,
} from '@internship-app/types';

export const getInternOptions = (
  intern: Intern,
): ActionOptions<InternActionType> => {
  const internDisciplines = intern.internDisciplines.map(
    (ind) => ind.discipline,
  );
  const nonInternDisciplines = Object.values(Discipline).filter(
    (d) => !internDisciplines.includes(d),
  );

  const options: ActionOptions<InternActionType> = {
    [InternActionType.AddDiscipline]: {
      description:
        'Dodaje područje. Oprez! Procijeni moraš li izmijeniti intervju pravo.',
      questions: [
        {
          id: 'discipline',
          title: 'Područje',
          type: QuestionType.Select,
          options: nonInternDisciplines,
          registerValue: nonInternDisciplines[0],
        },
      ],
    },
    [InternActionType.RemoveDiscipline]: {
      description:
        'Briše područje. Oprez! Ova akcija briše i povezani test. Procijeni moraš li izmijeniti intervju pravo.',
      questions: [
        {
          id: 'discipline',
          title: 'Područje',
          type: QuestionType.Select,
          options: internDisciplines,
          registerValue: internDisciplines[0],
        },
      ],
    },
  };

  return options;
};
