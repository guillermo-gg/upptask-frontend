export type TaskT = {
  id: string;
  content: string;
};

export type ColumnT = {
  id: string;
  name: string;
  tasks: TaskT[];
};
