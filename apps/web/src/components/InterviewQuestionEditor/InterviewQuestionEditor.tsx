import {
  Discipline,
  InterviewQuestion,
  InterviewQuestionCategory,
  InterviewQuestionType,
} from '@internship-app/types';
import InterviewQuestionDetails from '../InterviewQuestionDetails/InterviewQuestionDetails';
import { ChangeEvent, useEffect, useState } from 'react';

interface InterviewQuestionEditorProps {
  interviewQuestion: InterviewQuestion;
  setInterviewQuestion: Function;
}

interface InterviewQuestionData {
  question: string;
  type: InterviewQuestionType;
  category: InterviewQuestionCategory;
  discipline?: Discipline;
}

const InterviewQuestionEditor: React.FC<InterviewQuestionEditorProps> = ({
  interviewQuestion,
  setInterviewQuestion,
}) => {
  const interviewQuestionTypes: string[] = Object.values(InterviewQuestionType);
  const interviewQuestionCategories: string[] = Object.values(
    InterviewQuestionCategory,
  );
  const disciplines: string[] = Object.values(Discipline);
  const [formData, setFormData] = useState<InterviewQuestionData>({
    question: interviewQuestion.question,
    type: interviewQuestion.type,
    category: interviewQuestion.category,
    discipline: interviewQuestion.discipline,
  });

  useEffect(() => {
    setInterviewQuestion({
      ...interviewQuestion,
      question: formData.question,
      type: formData.type,
      category: formData.category,
      discipline: formData.discipline,
    });
  }, [formData]);

  function handleInputChange(
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <form className="interview-question-editor">
      <label>
        Tip:
        <select name="type" value={formData.type} onChange={handleInputChange}>
          {interviewQuestionTypes.map((t) => (
            <option value={t} key={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label>
        Kategorija:
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          {interviewQuestionCategories.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      {interviewQuestion.category ===
        InterviewQuestionCategory.DisciplineSpecific && (
        <label>
          Područje:
          <select
            name="discipline"
            value={formData.discipline ?? ''}
            onChange={handleInputChange}
          >
            <option value="">Odaberi područje</option>
            {disciplines.map((d) => (
              <option value={d} key={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      )}
      <label>
        Pitanje:
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleInputChange}
        />
      </label>
      <InterviewQuestionDetails
        interviewQuestion={interviewQuestion}
        setInterviewQuestion={setInterviewQuestion}
      />
    </form>
  );
};

export default InterviewQuestionEditor;
