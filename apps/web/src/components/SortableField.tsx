import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableField = ({ field }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {field}
    </div>
  );
};
