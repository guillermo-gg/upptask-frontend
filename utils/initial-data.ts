import { v4 as uuid } from "uuid";

const getNewTask = (title: string, description?: string) => ({
  id: uuid(),
  title,
  description,
});

export const getFirstBoardParams = () => ({
  title: "Your first board",
  description: "Take a look inside...",
  initialColumns: [
    {
      id: "1",
      name: "To do",
      tasks: [
        getNewTask("This is a task", "Try dragging it to another column"),
      ],
    },
    {
      id: "2",
      name: "Doing",
      tasks: [],
    },
    {
      id: "3",
      name: "Done",
      tasks: [],
    },
  ],
});
