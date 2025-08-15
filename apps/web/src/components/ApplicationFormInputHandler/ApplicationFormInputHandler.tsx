import { Question, QuestionType } from '@internship-app/types';
import { Input, Radio, RadioGroup } from '@mui/joy';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { FormValues } from '../../pages/ApplicationFormPage/ApplicationFormPage';
import classes from '../../pages/ApplicationFormPage/index.module.css';
import type { FC } from 'react';

type Props = {
  question: Question;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
};

export const ApplicationFormInputHandler: FC<Props> = ({
  question,
  register,
  errors,
  watch,
}) => {
  const errorMessageExists = (keyString: string | undefined) => {
    const dataErrorKeys: Array<string | undefined> = Object.keys(errors);
    if (dataErrorKeys.includes(keyString)) {
      return true;
    }
    return false;
  };

  const getInputComponent = () => {
    switch (question.type) {
      case QuestionType.Field:
        return (
          <div className={classes.formQuestionWrapper}>
            <label className={classes.marginBottom30px} htmlFor={question.id}>
              {question.question}
            </label>
            <Input
              id={question.id}
              type="text"
              placeholder="Your answer"
              {...register(question.registerValue as keyof FormValues, {
                required: question.required,
              })}
            />

            {errorMessageExists(question.registerValue) ? (
              <p className={classes.warningText}>This field is required</p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
        );
      case QuestionType.Number:
        return (
          <div className={classes.formQuestionWrapper}>
            <label className={classes.marginBottom30px} htmlFor={question.id}>
              {question.question}
            </label>
            <Input
              id={question.id}
              type="number"
              placeholder="Your answer"
              {...register(question.registerValue as keyof FormValues, {
                required: question.required,
              })}
            />

            {errorMessageExists(question.registerValue) ? (
              <p className={classes.warningText}>This field is required</p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
        );
      case QuestionType.Date:
        return (
          <div className={classes.formQuestionWrapper}>
            <label className={classes.marginBottom30px} htmlFor={question.id}>
              {question.question}
            </label>
            <Input
              id={question.id}
              type="date"
              placeholder="Your answer"
              {...register(question.registerValue as keyof FormValues, {
                required: question.required,
              })}
            />

            {errorMessageExists(question.registerValue) ? (
              <p className={classes.warningText}>This field is required</p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
        );
      case QuestionType.Radio: {
        const watchValue = watch(question.registerValue as keyof FormValues);

        return (
          <div className={classes.formQuestionWrapper}>
            <label className={classes.marginBottom30px} htmlFor={question.id}>
              {question.question}
            </label>
            <RadioGroup defaultValue="Other" name="radio-buttons-group">
              {question.options.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  label={option}
                  {...register(question.registerValue as keyof FormValues, {
                    required: question.required,
                  })}
                  checked={watchValue === option}
                />
              ))}
            </RadioGroup>

            {errorMessageExists(question.registerValue) ? (
              <p className={classes.warningText}>This field is required</p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
        );
      }
      default:
        return <></>;
    }
  };

  return getInputComponent();
};
