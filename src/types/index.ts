export type Status = "backlog" | "in progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type BoardSections = {
  [name: string]: Task[];
  // name: Task[];
};

//=========================================

export interface TaskType {
  id: string;
  columnId: string;
  title: string;
}

export interface ColumnType {
  id: string;
  name: string;
}
