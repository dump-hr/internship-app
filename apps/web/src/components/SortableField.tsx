import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Field } from '@internship-app/types';

import { fieldLabel } from '../constants/internConstants';

type Props = {
  field: Field;
};

export const SortableField: React.FC<Props> = ({ field }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {fieldLabel[field]}
    </div>
  );
};
