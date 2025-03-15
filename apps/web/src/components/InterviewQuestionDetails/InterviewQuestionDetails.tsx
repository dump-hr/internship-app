import {
  InterviewQuestion,
  InterviewQuestionType,
} from '@internship-app/types';
import { useEffect, useState } from 'react';
import OptionCreator from '../OptionCreator/OptionCreator';

interface InterviewQuestionDetailsPros {
  interviewQuestion: InterviewQuestion;
}

interface InterviewQuestionDetailsType {
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

const InterviewQuestionDetails: React.FC<InterviewQuestionDetailsPros> = ({
  interviewQuestion,
}) => {
  const [details, setDetails] = useState<InterviewQuestionDetailsType | null>();
  const [options, setOptions] = useState<string[] | undefined>();

  useEffect(() => {
    loadDetails();
  }, []);

  useEffect(() => {
    if (details) setDetails({ ...details, options: options });
  }, [options]);

  function loadDetails() {
    const newDetails = getDetailsFromType();
    console.log(newDetails);
    setDetails(interviewQuestion.details);
    setOptions(interviewQuestion.details?.options);
  }

  function getDetailsFromType(): InterviewQuestionDetailsType | null {
    let newDetails = null;

    switch (interviewQuestion.type) {
      case InterviewQuestionType.Field:
      case InterviewQuestionType.TextArea:
      case InterviewQuestionType.Date:
      case InterviewQuestionType.DateTime:
        break;
      case InterviewQuestionType.Checkbox:
      case InterviewQuestionType.Select:
      case InterviewQuestionType.Radio:
        newDetails = { options: [] };
        break;
      case InterviewQuestionType.Number:
        newDetails = { min: 0, max: 100 };
        break;
      case InterviewQuestionType.Slider:
        newDetails = { min: 0, max: 100, step: 1 };
        break;
      default:
        break;
    }

    return newDetails;
  }

  return (
    <>
      {details && (
        <div className="interview-question-details">
          {details.options && (
            <OptionCreator options={details.options} setOptions={setOptions} />
          )}
          {details.min && (
            <label>
              Min:
              <input type="number" defaultValue={details.min} />
            </label>
          )}
          {details.max && (
            <label>
              Max:
              <input type="number" defaultValue={details.max} />
            </label>
          )}
          {details.step && (
            <label>
              Step:
              <input type="number" defaultValue={details.step} />
            </label>
          )}
        </div>
      )}
    </>
  );
};

export default InterviewQuestionDetails;
