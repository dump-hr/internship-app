import { Answer } from '@internship-app/types';
import { InterviewSlot } from '@internship-app/types';
import { useEffect, useState } from 'react';

export const useAnswerIdForQuestion = (
  question: string,
  slots: InterviewSlot[],
): string | null => {
  const [answerId, setAnswerId] = useState<string | null>(null);

  useEffect(() => {
    const extractAnswers = (data: InterviewSlot[]): Answer[] => {
      return data.flatMap((slot) => {
        if (Array.isArray(slot.answers)) {
          return slot.answers.filter(
            (answer) => answer !== undefined,
          ) as Answer[];
        } else if (typeof slot.answers === 'object' && slot.answers !== null) {
          return Object.values(slot.answers).filter(
            (answer) => answer !== undefined,
          ) as Answer[];
        }
        return [];
      });
    };

    const allAnswers: Answer[] = extractAnswers(slots);

    const foundAnswer = allAnswers.find(
      (item) => item.question.toLowerCase() === question.toLowerCase(),
    );

    if (foundAnswer) {
      setAnswerId(foundAnswer.id);
    } else {
      setAnswerId(null);
    }
  }, [question, slots]);

  return answerId;
};
