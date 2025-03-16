import {
  InterviewQuestion,
  InterviewQuestionType,
} from '@internship-app/types';
import { ChangeEvent, useEffect, useState } from 'react';
import OptionCreator from '../OptionCreator/OptionCreator';

interface InterviewQuestionDetailsPros {
  interviewQuestion: InterviewQuestion;
  setInterviewQuestion: Function;
}

interface InterviewQuestionDetailsType {
  options?: string[] | null;
  min?: number | null;
  max?: number | null;
  step?: number | null;
}

const InterviewQuestionDetails: React.FC<InterviewQuestionDetailsPros> = ({
  interviewQuestion,
  setInterviewQuestion,
}) => {
  const [options, setOptions] = useState<string[] | undefined>();

  useEffect(() => {
    loadDetails();
  }, [interviewQuestion.type]);

  useEffect(() => {
    setInterviewQuestion({
      ...interviewQuestion,
      details: { ...interviewQuestion.details, options },
    });
  }, [options]);

  function loadDetails() {
    setInterviewQuestion({
      ...interviewQuestion,
      details: getDetailsFromType(),
    });
    setOptions(interviewQuestion.details?.options);
  }

  function getDetailsFromType(): InterviewQuestionDetailsType | null {
    let newDetails = null;

    switch (interviewQuestion.type) {
      case InterviewQuestionType.Select:
      case InterviewQuestionType.Radio:
        newDetails = {
          options: interviewQuestion.details?.options ?? [],
          min: null,
          max: null,
          step: null,
        };
        break;
      case InterviewQuestionType.Number:
        newDetails = {
          options: null,
          min: interviewQuestion.details?.min ?? 0,
          max: interviewQuestion.details?.max ?? 100,
          step: null,
        };
        break;
      case InterviewQuestionType.Slider:
        newDetails = {
          options: null,
          min: interviewQuestion.details?.min ?? 0,
          max: interviewQuestion.details?.max ?? 100,
          step: interviewQuestion.details?.step ?? 1,
        };
        break;
      default:
        break;
    }

    return newDetails;
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInterviewQuestion({
      ...interviewQuestion,
      details: {
        ...interviewQuestion.details,
        [e.target.name]: +e.target.value,
      },
    });
  }

  return (
    <>
      {interviewQuestion.details && (
        <div className="interview-question-details">
          {interviewQuestion.details.options && (
            <OptionCreator
              options={interviewQuestion.details.options}
              setOptions={setOptions}
            />
          )}
          {interviewQuestion.details.min && (
            <label>
              Min:
              <input
                name="min"
                type="number"
                value={interviewQuestion.details.min}
                onChange={handleInputChange}
              />
            </label>
          )}
          {interviewQuestion.details.max && (
            <label>
              Max:
              <input
                name="max"
                type="number"
                value={interviewQuestion.details.max}
                onChange={handleInputChange}
              />
            </label>
          )}
          {interviewQuestion.details.step && (
            <label>
              Step:
              <input
                name="step"
                type="number"
                value={interviewQuestion.details.step}
                onChange={handleInputChange}
              />
            </label>
          )}
        </div>
      )}
    </>
  );
};

export default InterviewQuestionDetails;
