import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TaskType } from "../../types";

interface PropType {
  task: TaskType;
}

const Task = (props: PropType) => {
  const { task } = props;

  const id = task.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[300px] bg-gray-200 p-4"
    >
      {task.title}
    </div>
  );
};

export default Task;
