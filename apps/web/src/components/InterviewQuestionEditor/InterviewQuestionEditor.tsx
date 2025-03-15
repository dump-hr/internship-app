import {
  Discipline,
  InterviewQuestion,
  InterviewQuestionCategory,
  InterviewQuestionType,
} from '@internship-app/types';
import InterviewQuestionDetails from '../InterviewQuestionDetails/InterviewQuestionDetails';

interface InterviewQuestionEditorProps {
  interviewQuestion: InterviewQuestion;
}

const InterviewQuestionEditor: React.FC<InterviewQuestionEditorProps> = ({
  interviewQuestion,
}) => {
  const interviewQuestionTypes: string[] = Object.values(InterviewQuestionType);
  const interviewQuestionCategories: string[] = Object.values(
    InterviewQuestionCategory,
  );
  const disciplines: string[] = Object.values(Discipline);

  return (
    <form className="interview-question-editor">
      <label>
        Tip:
        <select
          name="interview-question-type"
          defaultValue={interviewQuestion.type}
        >
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
          name="interview-question-category"
          defaultValue={interviewQuestion.category}
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
          <select name="interview-question-category">
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
        <input type="text" defaultValue={interviewQuestion.question} />
      </label>
      <InterviewQuestionDetails interviewQuestion={interviewQuestion} />
    </form>
  );
};

export default InterviewQuestionEditor;
