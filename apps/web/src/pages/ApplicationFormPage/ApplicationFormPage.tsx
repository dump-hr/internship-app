import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  EducationOrEmploymentStatus,
  Field,
  FoundOutAboutInternshipBy,
  mapEducationOrEmploymentStatusToCroatian,
  mapFieldToCroatian,
  mapFoundOutAboutInternshipByToCroatian,
} from '@internship-app/types';
import { Checkbox, FormControl, RadioGroup } from '@mui/joy';
import Radio from '@mui/joy/Radio';
import { Button, Input } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { usePostIntern } from '../../api/usePostIntern';
import { SortableField } from '../../components/SortableField';
import classes from './index.module.css';

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  fields: Field[];
  data: {
    phoneNumber: number;
    dateOfBirth: string;
    educationOrEmploymentStatus: EducationOrEmploymentStatus;
    highSchoolOrCollegeName: string;
    foundOutAboutInternshipBy: FoundOutAboutInternshipBy;
    reasonForApplying: string;
  };
};

export const ApplicationFormPage = () => {
  const [internFields, setInternFields] = useState<Field[]>([]);

  const fieldEnumKeys = Object.keys(Field);
  const fieldEnumValues = Object.values(Field);
  const educationOrEmploymentStatusEnumKeys = Object.keys(
    EducationOrEmploymentStatus,
  );
  const educationOrEmploymentStatusEnumValues = Object.values(
    EducationOrEmploymentStatus,
  );
  const foundOutAboutInternshipByEnumKeys = Object.keys(
    FoundOutAboutInternshipBy,
  );
  const foundOutAboutInternshipByEnumValues = Object.values(
    FoundOutAboutInternshipBy,
  );

  const { mutate: createInternMutation } = usePostIntern();

  const { register, handleSubmit, formState, reset, watch } =
    useForm<FormValues>({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        fields: [],
        data: {
          phoneNumber: 0,
          dateOfBirth: '',
          educationOrEmploymentStatus: EducationOrEmploymentStatus.Other,
          highSchoolOrCollegeName: '',
          foundOutAboutInternshipBy: FoundOutAboutInternshipBy.Other,
          reasonForApplying: '',
        },
      } as FormValues,
    });

  const { errors } = formState;

  const watchEmploymentOrEducationStatus = watch(
    'data.educationOrEmploymentStatus',
  );
  const watchFoundOutAboutInternshipBy = watch(
    'data.foundOutAboutInternshipBy',
  );
  console.log(watchFoundOutAboutInternshipBy);

  const onSubmit = (data: FormValues) => {
    try {
      createInternMutation(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (internFields.includes(event.target.value as Field)) {
        return;
      }
      setInternFields((prev) => {
        return [...prev, event.target.value as Field];
      });
    } else {
      setInternFields((prev) => {
        return [...prev.filter((field) => field !== event.target.value)];
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) {
      return;
    }

    setInternFields((prev) => {
      const oldIndex = prev.findIndex((field) => field === active.id);
      const newIndex = prev.findIndex((field) => field === over?.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleReset = () => {
    reset();
    setInternFields([]);
  };

  return (
    <div className={classes.applicationFormPageWrapper}>
      <h1 className={classes.applicationFormTitle}>
        Prijava na DUMP internship
      </h1>
      <form
        className={classes.formClass}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
        <div className={classes.formQuestionWrapper}>
          <label className={classes.marginBottom30px} htmlFor="dateOfBirth">
            Datum rođenja:
          </label>
          <Input
            type="date"
            id="dateOfBirth"
            {...register('data.dateOfBirth', {
              required: 'Date of birth is required',
            })}
          />

          {errors.data?.dateOfBirth ? (
            <p className={classes.warningText}>
              {errors.data?.dateOfBirth?.message}
            </p>
          ) : (
            <div className={classes.warningTextPlaceholder}></div>
          )}
        </div>
        <div className={classes.formQuestionWrapper}>
          <label className={classes.marginBottom30px} htmlFor="phoneNumber">
            Broj mobitela:
          </label>
          <Input
            placeholder="Your answer"
            type="number"
            id="phoneNumber"
            {...register('data.phoneNumber')}
          />

          {errors.data?.phoneNumber ? (
            <p className={classes.warningText}>
              {errors.data?.phoneNumber.message}
            </p>
          ) : (
            <div className={classes.warningTextPlaceholder}></div>
          )}
        </div>

        <div
          className={clsx(
            classes.formQuestionWrapper,
            classes.fieldsChoiceWrapper,
          )}
        >
          <div className={classes.marginBottom30px}>
            <label>Prijavljuješ se na:</label>
            <p className={classes.formQuestionSubtitleText}>
              Broj područja na koja se možeš prijaviti nije ograničen.
            </p>
          </div>

          {fieldEnumKeys.map((field, index) => (
            <div key={field}>
              <Checkbox
                value={fieldEnumValues[index]}
                label={mapFieldToCroatian(fieldEnumValues[index])}
                {...register('fields')}
                onChange={(e) => handleCheckboxChange(e)}
                name="fields"
                checked={internFields.includes(fieldEnumValues[index])}
              />
            </div>
          ))}

          {errors.fields ? (
            <p className={classes.warningText}>{errors.fields?.message}</p>
          ) : (
            <div className={classes.warningTextPlaceholder}></div>
          )}
        </div>

        {internFields.length > 1 && (
          <div className={classes.formQuestionWrapper}>
            <p className={classes.formQuestionSubtitleText}>
              Ovdje možeš posložiti prioritete
            </p>
            <div className={classes.cursorGrab}>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={internFields}
                  strategy={verticalListSortingStrategy}
                >
                  {internFields.map((field) => (
                    <SortableField key={field} field={field} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        )}
        <div className={classes.formQuestionWrapper}>
          <label className={classes.marginBottom30px}>
            Status obrazovanja/zaposlenja:
          </label>

          <FormControl>
            <RadioGroup defaultValue="Other" name="radio-buttons-group">
              {educationOrEmploymentStatusEnumKeys.map((status, index) => (
                <Radio
                  checked={watchEmploymentOrEducationStatus === status}
                  key={status}
                  value={educationOrEmploymentStatusEnumValues[index]}
                  label={mapEducationOrEmploymentStatusToCroatian(
                    educationOrEmploymentStatusEnumValues[index],
                  )}
                  {...register('data.educationOrEmploymentStatus', {
                    required: 'This field is required',
                  })}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {errors.data?.educationOrEmploymentStatus ? (
            <p className={classes.warningText}>
              {errors.data.educationOrEmploymentStatus?.message}
            </p>
          ) : (
            <div className={classes.warningTextPlaceholder}></div>
          )}
        </div>
        <div className={classes.formQuestionWrapper}>
          <label
            className={classes.marginBottom30px}
            htmlFor="highSchoolOrCollegeName"
          >
            Naziv srednje škole ili fakulteta koji trenutno pohađaš:
          </label>
          <Input
            placeholder="Your answer"
            type="text"
            id="highSchoolOrCollegeName"
            {...register('data.highSchoolOrCollegeName')}
          />
        </div>
        <div className={classes.formQuestionWrapper}>
          <label className={classes.marginBottom30px} htmlFor="channel">
            Za DUMP internship si saznao/la putem:
          </label>

          <FormControl>
            <RadioGroup defaultValue="Other" name="radio-buttons-group">
              {foundOutAboutInternshipByEnumKeys.map((answer, index) => (
                <Radio
                  checked={watchFoundOutAboutInternshipBy === answer}
                  key={answer}
                  value={foundOutAboutInternshipByEnumValues[index]}
                  label={mapFoundOutAboutInternshipByToCroatian(
                    foundOutAboutInternshipByEnumValues[index],
                  )}
                  {...register('data.foundOutAboutInternshipBy', {
                    required: 'This field is required',
                  })}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {errors.data?.foundOutAboutInternshipBy ? (
            <p className={classes.warningText}>
              {errors.data.foundOutAboutInternshipBy.message}
            </p>
          ) : (
            <div className={classes.warningTextPlaceholder}></div>
          )}
        </div>
        <div className={classes.formQuestionWrapper}>
          <label
            className={classes.marginBottom30px}
            htmlFor="reasonForApplying"
          >
            Zašto se prijavljuješ na DUMP internship?
          </label>
          <Input
            placeholder="Your answer"
            type="text"
            id="firstName"
            {...register('data.reasonForApplying', {
              required: 'Reason for applying is required',
            })}
          />

          {errors.data?.reasonForApplying ? (
            <p className={classes.warningText}>
              {errors.data.reasonForApplying.message}
            </p>
          ) : (
            <div className={classes.warningTextPlaceholder}></div>
          )}
        </div>

        <div className={classes.formActionsWrapper}>
          <Button
            type="submit"
            variant="contained"
            className={classes.submitButton}
          >
            Submit
          </Button>

          <Button type="button" variant="text" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
      <h3 className={classes.applicationFooterText}>
        DUMP udruga mladih programera
      </h3>
    </div>
  );
};
