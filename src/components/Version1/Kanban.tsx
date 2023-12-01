import { useState } from "react";

import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  defaultDropAnimation,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { v4 as uuidv4 } from "uuid";

import { TaskType, ColumnType } from "../../types";
import { tasksData, columnsData } from "../../data";
import MyColumn from "./MyColumn";
import MyTask from "./MyTask";

const Kanban = () => {
  const [tasks, setTasks] = useState<TaskType[]>(tasksData);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const columns: ColumnType[] = columnsData;

  const [taskInput, setTaskInput] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(tasks.filter((task) => task.id === active.id)[0]);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    const activeColumnId = active.data.current?.sortable.containerId;
    const activeColumn = columns.filter((col) => col.id === activeColumnId)[0];

    const overColumnId = over.id;
    const overColumn = columns.filter((col) => col.id === overColumnId)[0];

    const overTaskId = over.id;
    const overTask = tasks.filter((task) => task.id === overTaskId)[0];

    if (!activeTask || !activeColumn) return;

    // Drop task over task
    if (overTask && overColumn === undefined && activeTask !== overTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeTask.id);
        const overIndex = tasks.findIndex((t) => t.id === overTask.id);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Drop task over column
    if (overTask === undefined && overColumn && activeColumn !== overColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeTask.id);

        tasks[activeIndex].columnId = overColumn.id;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    console.log(active, over);
  };

  const task = activeTask ? activeTask : null;

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: TaskType = {
      id: uuidv4(),
      columnId: "backlog",
      title: taskInput,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex gap-5 my-5"
        onSubmit={(e) => {
          handleAddTask(e);
        }}
      >
        <input
          placeholder="input task"
          className="w-[300px] px-2 border-2 border-solid"
          value={taskInput}
          onChange={(e) => {
            setTaskInput(e.target.value);
          }}
        />
        <button className="w-[80px] bg-blue-500 text-white p-2 rounded-md">
          Add
        </button>
      </form>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-wrap gap-5">
          {columns?.map((col) => {
            return (
              <MyColumn
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            );
          })}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <MyTask task={task} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default Kanban;
