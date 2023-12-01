import { Task } from "../types";
import { TaskType, ColumnType } from "../types";
import { v4 as uuidv4 } from "uuid";

export const INITIAL_TASKS: Task[] = [
  {
    id: uuidv4(),
    title: "Title 2",
    description: "Desc 2",
    status: "backlog",
  },
  {
    id: uuidv4(),
    title: "Title 3",
    description: "Desc 3",
    status: "backlog",
  },
  {
    id: uuidv4(),
    title: "Title 4",
    description: "Desc 4",
    status: "done",
  },
];

//===============================

export const tasksData: TaskType[] = [
  {
    id: "1",
    columnId: "backlog",
    title: "Task 1",
  },
  {
    id: "2",
    columnId: "backlog",
    title: "Task 2",
  },
  // {
  //   id: "3",
  //   columnId: "progress",
  //   title: "Task 3",
  // },
  {
    id: "4",
    columnId: "done",
    title: "Task 4",
  },
];

export const columnsData: ColumnType[] = [
  {
    id: "backlog",
    name: "Back log",
  },
  {
    id: "progress",
    name: "In progress",
  },
  {
    id: "done",
    name: "Done",
  },
];
