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
  syncBoard,
  TaskT,
  updateFirestoreBoard,
} from "services/board.service";

type UpdateBoardLastUsedCallback = () => Promise<void>;

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
  title: string;
  description: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  columns: ColumnT[];
  setColumns: Dispatch<SetStateAction<ColumnT[]>>;
  addTaskToColumn: AddTaskToColumnCallback;
  deleteTask: DeleteTaskCallback;
  moveTask: MoveTaskCallback;
  updateBoardLastUsed: UpdateBoardLastUsedCallback;
};

export const tasksContext = createContext<TasksContextT | null>(null);

const { Provider } = tasksContext;

// Using Immer:
/* eslint-disable no-param-reassign */
type TaskProviderProps = {
  boardId: string;
};
export const TasksProvider: FunctionComponent<TaskProviderProps> = ({
  children,
  boardId,
}) => {
  const [columns, setColumns] = useState<ColumnT[]>(null);
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  // Fetch tasks:
  useEffect(() => {
    if (boardId) syncBoard({ boardId, setColumns, setTitle, setDescription });
  }, [boardId]);

  // Update Firestore:
  useEffect(() => {
    if (!columns) return;
    updateFirestoreBoard(boardId, { columns });
  }, [columns, boardId]);

  useEffect(() => {
    if (!title) return;
    updateFirestoreBoard(boardId, { title });
  }, [title, boardId]);

  useEffect(() => {
    if (!description) return;
    updateFirestoreBoard(boardId, { description });
  }, [description, boardId]);

  const updateBoardLastUsed: UpdateBoardLastUsedCallback = () => {
    return updateFirestoreBoard(boardId, { lastUsed: Date.now() });
  };

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
        title,
        description,
        setTitle,
        setDescription,
        columns,
        setColumns,
        addTaskToColumn,
        deleteTask,
        moveTask,
        updateBoardLastUsed,
      }}
    >
      {children}
    </Provider>
  );
};
