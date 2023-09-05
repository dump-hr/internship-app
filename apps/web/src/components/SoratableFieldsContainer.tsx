import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Field } from '@internship-app/types';

import classes from '../pages/ApplicationFormPage/index.module.css';
import { SortableField } from './SortableField';

type Props = {
  internFields: Field[];
  setInternFields: React.Dispatch<React.SetStateAction<Field[]>>;
};

export const SortableFieldsContainer: React.FC<Props> = ({
  internFields,
  setInternFields,
}) => {
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

  console.log(internFields);

  return (
    <div className={classes.formQuestionWrapper}>
      <p className={classes.formQuestionSubtitleText}>
        Ovdje možeš posložiti prioritete
      </p>
      <div className={classes.cursorGrab}>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
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
  );
};
