import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Discipline } from '@internship-app/types';
import clsx from 'clsx';

import classes from '../pages/ApplicationFormPage/index.module.css';
import { SortableDiscipline } from './SortableDiscipline';

type Props = {
  internDisciplines: Discipline[];
  setInternDisciplines: React.Dispatch<React.SetStateAction<Discipline[]>>;
};

export const SortableDisciplinesContainer: React.FC<Props> = ({
  internDisciplines,
  setInternDisciplines,
}) => {
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) {
      return;
    }

    setInternDisciplines((prev) => {
      const oldIndex = prev.findIndex((discipline) => discipline === active.id);
      const newIndex = prev.findIndex((discipline) => discipline === over?.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div className={classes.formQuestionWrapper}>
      <label>Područja</label>
      <p
        className={clsx(
          classes.formQuestionSubtitleText,
          classes.marginBottom30px,
        )}
      >
        Ovdje možeš posložiti prioritete
      </p>
      <div className={clsx(classes.cursorGrab, classes.marginBottom30px)}>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={internDisciplines}
            strategy={verticalListSortingStrategy}
          >
            {internDisciplines.map((discipline, index) => (
              <SortableDiscipline
                key={discipline}
                discipline={discipline}
                index={index}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
