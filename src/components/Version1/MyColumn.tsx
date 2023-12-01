import { useDroppable } from "@dnd-kit/core";
import { TaskType, ColumnType } from "../../types";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import MyTask from "./MyTask";

interface PropType {
  column: ColumnType;
  tasks: TaskType[];
}

const MyColumn = (props: PropType) => {
  const { column, tasks } = props;

  const id = column.id;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="w-[400px] flex flex-col items-center bg-blue-200 p-2">
      <p>{column.id}</p>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="mt-5 flex flex-col gap-3">
          {tasks.map((task) => (
            <div key={task.id}>
              <MyTask task={task} />
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default MyColumn;
