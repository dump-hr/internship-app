import { Answer, InterviewSlot } from '@internship-app/types';

import { useFetchAllInterviewSlots } from '../../api/useFetchAllInterviewSlots.tsx';

export const InterviewStatsAnswers = () => {
  const slots = useFetchAllInterviewSlots().data as InterviewSlot[] | undefined;

  if (!slots) return <div>Loading...</div>;

  console.log(typeof slots);

  const extractAnswers = (data: InterviewSlot[]): Answer[] => {
    return data.flatMap((slot) => {
      if (Array.isArray(slot.answers)) {
        return slot.answers;
      } else if (typeof slot.answers === 'object' && slot.answers !== null) {
        return Object.values(slot.answers);
      }
      return [];
    });
  };

  const allAnswers: Answer[] = extractAnswers(slots);

  const getAnswerForQuestion = (
    data: Answer[],
    question: string,
  ): string | null => {
    const found = data.find(
      (item) => item.question.toLowerCase() === question.toLowerCase(),
    );
    return found ? found.value : null;
  };

  const questionToFind =
    'Jesi li se prethodno prijavljivao na DUMP Internship?';
  const answer = getAnswerForQuestion(allAnswers, questionToFind);

  console.log(answer);

  return (
    <div>
      <h3>Answer for: {questionToFind}</h3>
      <p>{answer ? answer : 'No answer found'}</p>
    </div>
  );
};
