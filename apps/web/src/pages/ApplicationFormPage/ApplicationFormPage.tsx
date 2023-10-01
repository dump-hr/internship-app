import {
  Discipline,
  EducationOrEmploymentStatus,
  FoundOutAboutInternshipBy,
} from '@internship-app/types';
import { Checkbox } from '@mui/joy';
import { Button, Input } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { usePostIntern } from '../../api/usePostIntern';
import formWelcomeImage from '../../assets/form-welcome-image.png';
import { ApplicationFormInputHandler } from '../../components/ApplicationFormInputHandler/ApplicationFormInputHandler';
import { Logo } from '../../components/Logo';
import { SortableDisciplinesContainer } from '../../components/SoratableDisciplinesContainer';
import { disciplineLabel } from '../../constants/internConstants';
import { applicationFormDataQuestions } from './constants/ApplicationFormQuestions';
import classes from './index.module.css';

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  disciplines: Discipline[];
  phoneNumber: string;
  dateOfBirth: string;
  educationOrEmploymentStatus: EducationOrEmploymentStatus;
  highSchoolOrCollegeName: string;
  yearOfStudy: string;
  foundOutAboutInternshipBy: FoundOutAboutInternshipBy;
  reasonForApplying: string;
};

const disciplineEnumKeys = Object.keys(Discipline);
const disciplineEnumValues = Object.values(Discipline);

export const ApplicationFormPage = () => {
  const [internDisciplines, setInternDisciplines] = useState<Discipline[]>([]);

  const createIntern = usePostIntern();

  const { register, handleSubmit, formState, watch } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      disciplines: [],
      phoneNumber: '',
      yearOfStudy: '',
      dateOfBirth: '',
      educationOrEmploymentStatus: EducationOrEmploymentStatus.Other,
      highSchoolOrCollegeName: '',
      foundOutAboutInternshipBy: FoundOutAboutInternshipBy.Other,
      reasonForApplying: '',
    } as FormValues,
  });

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const internToSend = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      disciplines: internDisciplines,
      data: {
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        educationOrEmploymentStatus: data.educationOrEmploymentStatus,
        highSchoolOrCollegeName: data.highSchoolOrCollegeName,
        yearOfStudy: data.yearOfStudy,
        foundOutAboutInternshipBy: data.foundOutAboutInternshipBy,
        reasonForApplying: data.reasonForApplying,
      },
    };

    try {
      createIntern.mutate(internToSend);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (internDisciplines.includes(event.target.value as Discipline)) {
        return;
      }
      setInternDisciplines((prev) => {
        return [...prev, event.target.value as Discipline];
      });
    } else {
      setInternDisciplines((prev) => {
        return [
          ...prev.filter((discipline) => discipline !== event.target.value),
        ];
      });
    }
  };

  return (
    <div className={classes.applicationFormPageWrapper}>
      <div className={classes.applicationFormIntroSection}>
        <Logo />
        <h1 className={classes.applicationFormTitle}>Postani dumpovac!</h1>
        <img
          className={classes.applicationFormWelcomeImage}
          src={formWelcomeImage}
          alt="form-welcome-image"
        />
      </div>
      <div className={classes.applicationForm}>
        <h2 className={classes.applicationFormSubtitle}>
          Prijava na DUMP Internship
        </h2>
        <div className={classes.applicationFormAdditional}>
          Ispuni ovu formu osobnim podatcima. Postupak može potrajati nekoliko
          minuta.
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={classes.formQuestionWrapper}>
            <label className={classes.marginBottom30px} htmlFor="firstName">
              Ime:
            </label>
            <Input
              placeholder="Your answer"
              type="text"
              id="firstName"
              {...register('firstName', {
                required: 'First name is required',
              })}
            />

            {errors.firstName ? (
              <p className={classes.warningText}>{errors.firstName?.message}</p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
          <div className={classes.formQuestionWrapper}>
            <label className={classes.marginBottom30px} htmlFor="lastName">
              Prezime:
            </label>
            <Input
              placeholder="Your answer"
              type="text"
              id="lastName"
              {...register('lastName', {
                required: 'Last name is required',
              })}
            />

            {errors.lastName ? (
              <p className={classes.warningText}>{errors.lastName?.message}</p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
          <div className={classes.formQuestionWrapper}>
            <label className={classes.marginBottom30px} htmlFor="email">
              Email
            </label>
            <Input
              placeholder="Your answer"
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            {errors.email ? (
              <p className={classes.warningText}>{errors.email?.message}</p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
          <div
            className={clsx(
              classes.formQuestionWrapper,
              classes.disciplinesChoiceWrapper,
            )}
          >
            <div className={classes.marginBottom30px}>
              <label>Prijavljuješ se na:</label>
              <p className={classes.formQuestionSubtitleText}>
                Broj područja na koja se možeš prijaviti nije ograničen.
              </p>
            </div>

            {disciplineEnumKeys.map((discipline, index) => (
              <div key={discipline}>
                <Checkbox
                  value={disciplineEnumValues[index]}
                  label={disciplineLabel[disciplineEnumValues[index]]}
                  {...register('disciplines', {
                    required: 'This field is required',
                  })}
                  onChange={(e) => handleCheckboxChange(e)}
                  name="disciplines"
                  checked={internDisciplines.includes(
                    disciplineEnumValues[index],
                  )}
                />
              </div>
            ))}

            {errors.disciplines ? (
              <p className={classes.warningText}>
                {errors.disciplines?.message}
              </p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
          {internDisciplines.length > 1 && (
            <SortableDisciplinesContainer
              internDisciplines={internDisciplines}
              setInternDisciplines={setInternDisciplines}
            />
          )}

          {applicationFormDataQuestions.map((question) => (
            <ApplicationFormInputHandler
              key={question.id}
              question={question}
              register={register}
              errors={errors}
              watch={watch}
            />
          ))}
          <div className={classes.formActionsWrapper}>
            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
            >
              Pridruži nam se
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
