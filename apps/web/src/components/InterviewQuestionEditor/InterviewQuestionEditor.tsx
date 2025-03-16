import {
  Discipline,
  InterviewQuestion,
  InterviewQuestionCategory,
  InterviewQuestionType,
} from '@internship-app/types';
import InterviewQuestionDetails from '../InterviewQuestionDetails/InterviewQuestionDetails';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './InterviewQuestionEditor.module.css';
import { Textarea } from '@mui/joy';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

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
    e:
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<InterviewQuestionCategory>
      | SelectChangeEvent<InterviewQuestionType>
      | SelectChangeEvent<Discipline>,
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <form className={styles.interviewQuestionEditor}>
      <div className={styles.interviewQuestionInfo}>
        <label>
          Tip:
          <Select
            name="type"
            value={formData.type}
            onChange={(e) => handleInputChange(e)}
          >
            {interviewQuestionTypes.map((t) => (
              <MenuItem value={t} key={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </label>
        <label>
          Kategorija:
          <Select
            name="category"
            value={formData.category}
            onChange={(e) => handleInputChange(e)}
          >
            {interviewQuestionCategories.map((c) => (
              <MenuItem value={c} key={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </label>
        {interviewQuestion.category ===
          InterviewQuestionCategory.DisciplineSpecific && (
          <label>
            Područje:
            <Select
              name="discipline"
              value={formData.discipline ?? ''}
              onChange={(e) => handleInputChange(e)}
            >
              <MenuItem value="">Odaberi područje</MenuItem>
              {disciplines.map((d) => (
                <MenuItem value={d} key={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </label>
        )}
      </div>
      <label>
        Pitanje:
        <Textarea
          name="question"
          value={formData.question}
          onChange={(e) => handleInputChange(e)}
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
