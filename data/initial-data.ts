import { ColumnT, TaskT } from "data/types";

export const tasks: TaskT[] = [
  {
    id: "1",
    content: "Task 1",
  },
  {
    id: "2",
    content: "Task 2",
  },
  {
    id: "3",
    content: "Task 3",
  },
  {
    id: "4",
    content: "Task 4",
  },
];

export const columns: ColumnT[] = [
  {
    id: "1",
    name: "To do",
    tasks,
  },
];
