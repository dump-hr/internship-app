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
  phoneNumber: number;
  dateOfBirth: string;
  fields: Field[];
  educationOrEmploymentStatus: EducationOrEmploymentStatus;
  highSchoolOrCollegeName: string;
  foundOutAboutInternshipBy: FoundOutAboutInternshipBy;
  reasonForApplying: string;
};

export const ApplicationFormPage = () => {
  const [internFields, setInternFields] = useState<Field[]>([]);

  const { mutate: createInternMutation } = usePostIntern();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: 0,
      dateOfBirth: '',
      fields: [],
      educationOrEmploymentStatus: EducationOrEmploymentStatus.Other,
      highSchoolOrCollegeName: '',
      foundOutAboutInternshipBy: FoundOutAboutInternshipBy.Friend,
      reasonForApplying: '',
    } as FormValues,
  });

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const internToAdd = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      fields: internFields,
      educationOrEmploymentStatus: data.educationOrEmploymentStatus,
      highSchoolOrCollegeName: data.highSchoolOrCollegeName,
      foundOutAboutInternshipBy: data.foundOutAboutInternshipBy,
      reasonForApplying: data.reasonForApplying,
    };

    try {
      createInternMutation(internToAdd);
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
            {...register('dateOfBirth', {
              required: 'Date of birth is required',
            })}
          />

          {errors.dateOfBirth ? (
            <p className={classes.warningText}>{errors.dateOfBirth?.message}</p>
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
            {...register('phoneNumber')}
          />

          {errors.phoneNumber ? (
            <p className={classes.warningText}>{errors.phoneNumber?.message}</p>
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

          <div>
            <Checkbox
              value={Field.Development}
              label="Programiranje"
              {...register('fields', { required: 'Field is required' })}
              onChange={(e) => handleCheckboxChange(e)}
            />
          </div>
          <div>
            <Checkbox
              value={Field.Design}
              label="Dizajn"
              {...register('fields')}
              onChange={(e) => handleCheckboxChange(e)}
            />
          </div>
          <div>
            <Checkbox
              value={Field.Marketing}
              label="Marketing"
              {...register('fields')}
              onChange={(e) => handleCheckboxChange(e)}
            />
          </div>
          <div>
            <Checkbox
              value={Field.Multimedia}
              label="Multimediju"
              {...register('fields')}
              onChange={(e) => handleCheckboxChange(e)}
            />
          </div>

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
            <RadioGroup defaultValue="medium" name="radio-buttons-group">
              <Radio
                value={EducationOrEmploymentStatus.Pupil}
                label="Učenik"
                {...register('educationOrEmploymentStatus', {
                  required: 'This field is required',
                })}
              />
              <Radio
                value={EducationOrEmploymentStatus.Student}
                label="Student"
                {...register('educationOrEmploymentStatus')}
              />
              <Radio
                value={EducationOrEmploymentStatus.Employed}
                label="Zaposlen"
                {...register('educationOrEmploymentStatus')}
              />
              <Radio
                value={EducationOrEmploymentStatus.Other}
                label="Ostalo"
                {...register('educationOrEmploymentStatus')}
              />
            </RadioGroup>
          </FormControl>

          {errors.educationOrEmploymentStatus ? (
            <p className={classes.warningText}>
              {errors.educationOrEmploymentStatus?.message}
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
            {...register('highSchoolOrCollegeName')}
          />
        </div>
        <div className={classes.formQuestionWrapper}>
          <label className={classes.marginBottom30px} htmlFor="channel">
            Za DUMP internship si saznao/la putem:
          </label>

          <FormControl>
            <RadioGroup defaultValue="medium" name="radio-buttons-group">
              <Radio
                value={FoundOutAboutInternshipBy.Friend}
                label="Prijatelja ili poznanika"
                {...register('foundOutAboutInternshipBy', {
                  required: 'This field is required',
                })}
              />
              <Radio
                value={FoundOutAboutInternshipBy.SocialMedia}
                label="Društvenih mreža"
                {...register('foundOutAboutInternshipBy')}
              />
              <Radio
                value={FoundOutAboutInternshipBy.Presentation}
                label="Predstavljanja na fakultetima/školama"
                {...register('foundOutAboutInternshipBy')}
              />
              <Radio
                value={FoundOutAboutInternshipBy.Media}
                label="Medija"
                {...register('foundOutAboutInternshipBy')}
              />
              <Radio
                value={FoundOutAboutInternshipBy.Other}
                label="Ostalo"
                {...register('foundOutAboutInternshipBy')}
              />
            </RadioGroup>
          </FormControl>

          {errors.foundOutAboutInternshipBy ? (
            <p className={classes.warningText}>
              {errors.foundOutAboutInternshipBy?.message}
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
            {...register('reasonForApplying', {
              required: 'Reason for applying is required',
            })}
          />

          {errors.reasonForApplying ? (
            <p className={classes.warningText}>
              {errors.reasonForApplying?.message}
            </p>
          ) : (
            <div className={classes.warningTextPlaceholder}></div>
          )}
        </div>

        <Button
          type="submit"
          variant="contained"
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>
      <h3 className={classes.applicationFooterText}>
        DUMP udruga mladih programera
      </h3>
    </div>
  );
};
