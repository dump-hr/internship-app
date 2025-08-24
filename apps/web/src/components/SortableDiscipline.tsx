import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Discipline } from '@internship-app/types';
import type { FC } from 'react';

import { disciplineLabel } from '../constants/internConstants';

type Props = {
  discipline: Discipline;
  index: number;
};

export const SortableDiscipline: FC<Props> = ({ discipline, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: discipline });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: '12px 0',
    touchAction: 'none',
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {index + 1}. {disciplineLabel[discipline]}
    </div>
  );
};
