import { InterviewQuestionType } from '@internship-app/types';
import { useState } from 'react';

interface InterviewQuestionDetailsPros {
  type: InterviewQuestionType;
}

interface InterviewQuestionDetailsType {
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

const InterviewQuestionDetails: React.FC<InterviewQuestionDetailsPros> = ({
  type,
}) => {
  const [details, setDetails] = useState<InterviewQuestionDetailsType | null>(
    getDetailsFromType(),
  );

  function getDetailsFromType(): InterviewQuestionDetailsType | null {
    let newDetails = null;

    switch (type) {
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
        <form className="interview-question-details">
          {details.options && <label>Opcije:</label>}
          {details.min !== null && (
            <label>
              Min:
              <input type="number" />
            </label>
          )}
          {details.max !== null && (
            <label>
              Max:
              <input type="number" />
            </label>
          )}
          {details.step !== null && (
            <label>
              Step:
              <input type="number" />
            </label>
          )}
        </form>
      )}
    </>
  );
};

export default InterviewQuestionDetails;
