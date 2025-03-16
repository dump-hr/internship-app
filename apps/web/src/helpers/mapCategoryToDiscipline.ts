import { Discipline } from '@internship-app/types';
import { QuestionCategory } from '../constants/interviewConstants';

export function mapCategoryToDiscipline(
  category?: QuestionCategory,
): Discipline | undefined {
  if (!category) return undefined;

  switch (category) {
    case QuestionCategory.Development:
      return Discipline.Development;
    case QuestionCategory.Marketing:
      return Discipline.Marketing;
    case QuestionCategory.Design:
      return Discipline.Design;
    case QuestionCategory.Multimedia:
      return Discipline.Multimedia;
    default:
      return undefined;
  }
}
