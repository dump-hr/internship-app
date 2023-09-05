import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Discipline } from '@internship-app/types';

import { disciplineLabel } from '../constants/internConstants';

type Props = {
  discipline: Discipline;
};

export const SortableDiscipline: React.FC<Props> = ({ discipline }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: discipline });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {disciplineLabel[discipline]}
    </div>
  );
};
