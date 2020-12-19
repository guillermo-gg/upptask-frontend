import { produce } from "immer";
import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { columns as initialColumns } from "context/tasks/initial-data";

export type TaskT = {
  id: string;
  content: string;
};

export type ColumnT = {
  id: string;
  name: string;
  tasks: TaskT[];
};

type AddTaskToColumnCallback = (content: string, columnId: string) => void;

// Returns deleted task.
type DeleteTaskCallback = (
  sourceColumnId: string,
  sourceTaskIndex: number
) => TaskT;
type MoveTaskCallback = (
  sourceColumnId: string,
  sourceTaskIndex: number,
  destColumnId: string,
  destTaskIndex: number
) => void;

type TasksContextT = {
  columns: ColumnT[];
  setColumns: Dispatch<SetStateAction<ColumnT[]>>;
  addTaskToColumn: AddTaskToColumnCallback;
  deleteTask: DeleteTaskCallback;
  moveTask: MoveTaskCallback;
};

// export const initialColumns = [];

export const tasksContext = createContext<TasksContextT | null>(null);

const { Provider } = tasksContext;

// Using Immer:
/* eslint-disable no-param-reassign */
export const TasksProvider: FunctionComponent = ({ children }) => {
  const [columns, setColumns] = useState<ColumnT[]>(initialColumns);

  const [lastTaskId, setLastTaskId] = useState(100);

  const getNewTaskId = () => {
    const newTaskId = lastTaskId + 1;
    setLastTaskId((current) => current + 1);
    return newTaskId;
  };

  const addTaskToColumn: AddTaskToColumnCallback = (
    content: string, // TaskContent
    columnId: string
  ) => {
    const newTask = {
      id: String(getNewTaskId()),
      content,
    };

    setColumns((currentColumns) => {
      // Append to the tasks of the target column.
      return produce(currentColumns, (draft) => {
        draft[draft.findIndex(({ id }) => id === columnId)].tasks.push(newTask);
      });
    });
  };

  const deleteTask: DeleteTaskCallback = (
    sourceColumnId: string,
    sourceTaskIndex: number
  ) => {
    let targetTask: TaskT = null;

    setColumns((currentColumns) => {
      // Task list in the target column
      const originTaskList =
        currentColumns[
          currentColumns.findIndex(({ id }) => id === sourceColumnId)
        ].tasks;

      targetTask = originTaskList[sourceTaskIndex];

      return produce(currentColumns, (draft) => {
        draft[
          draft.findIndex(({ id }) => id === sourceColumnId)
        ].tasks = originTaskList.filter(
          (_, index) => index !== sourceTaskIndex
        );
      });
    });

    return targetTask;
  };

  const moveTask: MoveTaskCallback = (
    sourceColumnId: string,
    sourceTaskIndex: number,
    destColumnId: string,
    destTaskIndex: number
  ) => {
    const targetTask = deleteTask(sourceColumnId, sourceTaskIndex);

    setColumns((currentColumns) => {
      return produce(currentColumns, (draft) => {
        draft[draft.findIndex(({ id }) => id === destColumnId)].tasks.splice(
          destTaskIndex,
          0,
          targetTask
        );
      });
    });
  };

  return (
    <Provider
      value={{
        columns,
        setColumns,
        addTaskToColumn,
        deleteTask,
        moveTask,
      }}
    >
      {children}
    </Provider>
  );
};
