import { usePostIntern } from '@api/index';
import {
  ApplicationFormInputHandler,
  Logo,
  SortableDisciplinesContainer,
} from '@components/index';
import { disciplineLabel } from '@constants/index';
import {
  Discipline,
  EducationOrEmploymentStatus,
  FoundOutAboutInternshipBy,
} from '@internship-app/types';
import { Checkbox } from '@mui/joy';
import { Button, Input } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { initDataLayer, pushToDataLayer } from '../../../analytics.ts';
import formWelcomeImage from '../../assets/form-welcome-image.png';
import { applicationFormDataQuestions } from './constants/ApplicationFormQuestions.ts';
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

//
const applicationsClosed = false; //PROMINIT PRIJE DEPLOYA!
//

export const ApplicationFormPage = () => {
  const [internDisciplines, setInternDisciplines] = useState<Discipline[]>([]);

  const createIntern = usePostIntern();

  const { register, handleSubmit, formState, setValue, watch } =
    useForm<FormValues>({
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

  useEffect(() => {
    initDataLayer();
  }, []);

  const onSubmit = async (data: FormValues) => {
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
      await createIntern.mutateAsync(internToSend);
      pushToDataLayer('internship_prijava');
    } catch (err) {
      console.log('Error', err);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Discipline;
    let updatedDisciplines: Discipline[] = [...internDisciplines];

    if (event.target.checked) {
      if (internDisciplines.includes(value)) return;

      if (internDisciplines.length >= 2) {
        event.preventDefault();
        return;
      }

      updatedDisciplines.push(value);
    } else {
      updatedDisciplines = updatedDisciplines.filter(
        (discipline) => discipline !== value,
      );
    }

    setInternDisciplines(updatedDisciplines);
    setValue('disciplines', updatedDisciplines, { shouldValidate: true });
  };

  if (applicationsClosed) {
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
          <h2 className={classes.applicationFormSubtitle}>Prijave zatvorene</h2>
        </div>
      </div>
    );
  }

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
                required: 'Ime je obvezno',
              })}
              inputProps={{
                maxLength: 35,
              }}
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
                required: 'Prezime je obvezno',
              })}
              inputProps={{
                maxLength: 35,
              }}
            />

            {errors.lastName ? (
              <p className={classes.warningText}>{errors.lastName?.message}</p>
            ) : (
              <div className={classes.warningTextPlaceholder}></div>
            )}
          </div>
          <div className={classes.formQuestionWrapper}>
            <label className={classes.marginBottom30px} htmlFor="email">
              Email:
            </label>
            <Input
              placeholder="Your answer"
              type="email"
              id="email"
              {...register('email', {
                required: 'Email je obvezan',
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
                Možeš se prijaviti na maksimalno 2 područja.
              </p>
            </div>

            {disciplineEnumKeys.map((discipline, index) => (
              <div key={discipline}>
                <Checkbox
                  value={disciplineEnumValues[index]}
                  label={disciplineLabel[disciplineEnumValues[index]]}
                  {...register('disciplines', {
                    required: 'Ovo polje je obvezno',
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
