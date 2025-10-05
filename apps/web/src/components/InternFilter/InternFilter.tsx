import {
  getInitialCriteria,
  getNewCriteria,
  InputHandler,
} from '@components/index';
import { CriteriaSection, QuestionType } from '@internship-app/types';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

type InternFilterProps = {
  submitHandler: (values: FieldValues) => void;
  disabled?: boolean;
  initialValues?: FieldValues;
};

export const InternFilter = ({
  submitHandler,
  disabled,
  initialValues,
}: InternFilterProps) => {
  const form = useForm({
    shouldUnregister: true,
    defaultValues: initialValues,
  });
  const { handleSubmit, reset } = form;
  const [criteria, setCriteria] = useState<CriteriaSection[]>(() =>
    getInitialCriteria(initialValues?.main ?? null),
  );

  // Load initial values and criteria from URL params
  useEffect(() => {
    if (!initialValues) return;

    reset(initialValues);
    const disciplines = initialValues.disciplines ?? {};
    const main = initialValues.main ?? null;
    const disciplineSections = [];

    if (Object.keys(disciplines).length > 0) {
      for (const key in disciplines) {
        const discipline = disciplines[key];
        const sectionId = key.startsWith('disciplines.')
          ? key
          : `disciplines.${key}`;

        const disciplineSection = getNewCriteria(sectionId, discipline);
        disciplineSections.push(disciplineSection);
      }
    }

    setCriteria([...getInitialCriteria(main), ...disciplineSections]);
  }, [initialValues, reset]);

  const addDisciplineSection = () => {
    const id = `disciplines.${crypto.randomUUID()}`;
    setCriteria((prev) => [...prev, getNewCriteria(id)]);
  };

  const removeDisciplineSection = (id: string) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={disabled}
        >
          Filtriraj
        </Button>
        {criteria.map((section, index) => (
          <Box display="flex" gap="20px" alignItems="center" key={section.id}>
            {section.questions.map((q) => (
              <Box
                minWidth={q.type != QuestionType.Checkbox ? '200px' : ''}
                key={q.id}
              >
                <InputHandler form={form} question={q} />
              </Box>
            ))}
            {index !== 0 && (
              <Box>
                <IconButton onClick={() => removeDisciplineSection(section.id)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            {criteria.length - 1 === index && (
              <Box>
                <IconButton onClick={addDisciplineSection}>
                  <AddIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </form>
    </div>
  );
};
