import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../../types";
import TaskItem from "./TaskItem";

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const Column = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="w-[400px] flex flex-col items-center bg-blue-200 p-2">
      <p>{title}</p>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="mt-5 flex flex-col gap-3">
          {tasks.map((task) => (
            <div key={task.id}>
              <TaskItem task={task} />
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
