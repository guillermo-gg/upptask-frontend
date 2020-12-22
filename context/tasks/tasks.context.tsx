import { produce } from "immer";
import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import {
  ColumnT,
  syncColumnsId,
  syncTasks,
  TaskT,
  updateFirestoreTasks,
} from "services/tasks.service";

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

export const tasksContext = createContext<TasksContextT | null>(null);

const { Provider } = tasksContext;

// Using Immer:
/* eslint-disable no-param-reassign */
type TaskProviderProps = {
  userId?: string;
};
export const TasksProvider: FunctionComponent<TaskProviderProps> = ({
  children,
  userId,
}) => {
  const [columns, setColumns] = useState<ColumnT[]>(null);
  const [columnsId, setColumnsId] = useState<string>();

  // Get columns id and sync to state. Will create an empty document with
  // the columns if none is found.
  useEffect(() => {
    syncColumnsId(userId, setColumnsId);
  }, [userId]);

  // Fetch tasks:
  useEffect(() => {
    if (columnsId) syncTasks(columnsId, setColumns);
  }, [columnsId]);

  // Update Firestore:
  useEffect(() => {
    if (!columns) return;
    updateFirestoreTasks(columnsId, columns);
  }, [columns, columnsId]);

  const addTaskToColumn: AddTaskToColumnCallback = (
    content: string, // TaskContent
    columnId: string
  ) => {
    const newTask = {
      id: uuid(),
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
