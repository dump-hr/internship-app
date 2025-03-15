import { InterviewQuestionType } from '@internship-app/types';
import { useEffect, useState } from 'react';
import OptionCreator from '../OptionCreator/OptionCreator';

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
    setDetails(newDetails);
    setOptions(newDetails?.options);
  }

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
        <div className="interview-question-details">
          {details.options && (
            <OptionCreator options={details.options} setOptions={setOptions} />
          )}
          {details.min !== undefined && (
            <label>
              Min:
              <input type="number" />
            </label>
          )}
          {details.max !== undefined && (
            <label>
              Max:
              <input type="number" />
            </label>
          )}
          {details.step !== undefined && (
            <label>
              Step:
              <input type="number" />
            </label>
          )}
        </div>
      )}
    </>
  );
};

export default InterviewQuestionDetails;
