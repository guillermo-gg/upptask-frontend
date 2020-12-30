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
  deleteFirestoreBoard,
  syncBoard,
  TaskT,
  updateFirestoreBoard,
} from "services/board.service";

type UpdateBoardLastUsedCallback = () => Promise<void>;
type DeleteBoardCallback = () => Promise<void>;

export type UpdateBoardDetailsCallback = (params: {
  title: string;
  description: string;
}) => Promise<void>;

type AddTaskToColumnCallback = (
  content: {
    title: string;
    description?: string;
  },
  columnId: string
) => void;

type UpdateTaskDetailsCallback = (
  content: {
    title: string;
    description?: string;
  },
  taskId: string,
  columnId: string
) => void;

// Returns deleted task.
type DeleteTaskCallback = (
  sourceColumnId: string,
  sourceTaskIndex: number
) => void;
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
  updateTaskDetails: UpdateTaskDetailsCallback;
  deleteTask: DeleteTaskCallback;
  moveTask: MoveTaskCallback;
  updateBoardLastUsed: UpdateBoardLastUsedCallback;
  updateBoardDetails: UpdateBoardDetailsCallback;
  deleteBoard: DeleteBoardCallback;
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

  const updateBoardLastUsed: UpdateBoardLastUsedCallback = () => {
    return updateFirestoreBoard(boardId, { lastUsed: Date.now() });
  };

  const updateBoardDetails: UpdateBoardDetailsCallback = ({
    title: newTitle,
    description: newDescription,
  }) => {
    return updateFirestoreBoard(boardId, {
      title: newTitle,
      description: newDescription,
    });
  };

  const deleteBoard: DeleteBoardCallback = () => {
    return deleteFirestoreBoard(boardId);
  };

  const addTaskToColumn: AddTaskToColumnCallback = (
    { title: taskTitle, description: taskDescription },
    columnId
  ) => {
    const newTask = {
      id: uuid(),
      title: taskTitle,
      description: taskDescription ?? "",
    };

    const newColumns = produce(columns, (draft) => {
      draft[draft.findIndex(({ id }) => id === columnId)].tasks.push(newTask);
    });

    updateFirestoreBoard(boardId, {
      columns: newColumns,
    });
  };

  const updateTaskDetails: UpdateTaskDetailsCallback = (
    { title: newTitle, description: newDescription },
    taskId,
    columnId
  ) => {
    const newColumns = produce(columns, (draft) => {
      const columnIndex = draft.findIndex(({ id }) => id === columnId);
      const taskIndex = draft[columnIndex].tasks.findIndex(
        ({ id }) => id === taskId
      );
      draft[columnIndex].tasks[taskIndex].title = newTitle;
      draft[columnIndex].tasks[taskIndex].description = newDescription;
    });

    updateFirestoreBoard(boardId, {
      columns: newColumns,
    });
  };

  /**
   * Helper used when only deleting a task, as well as an intermediate step
   * when moving a task.
   */
  const getDeleteStatus = (
    currentColumns: ColumnT[],
    sourceColumnId: string,
    sourceTaskIndex: number
  ) => {
    const originTaskList =
      currentColumns[
        currentColumns.findIndex(({ id }) => id === sourceColumnId)
      ].tasks;

    const targetTask = originTaskList[sourceTaskIndex];

    const newColumns = produce(currentColumns, (draft) => {
      draft[
        draft.findIndex(({ id }) => id === sourceColumnId)
      ].tasks = originTaskList.filter((_, index) => index !== sourceTaskIndex);
    });

    return { newColumns, targetTask };
  };

  const deleteTask: DeleteTaskCallback = (
    sourceColumnId: string,
    sourceTaskIndex: number
  ) => {
    updateFirestoreBoard(boardId, {
      columns: getDeleteStatus(columns, sourceColumnId, sourceTaskIndex)
        .newColumns,
    });
  };

  const moveTask: MoveTaskCallback = (
    sourceColumnId: string,
    sourceTaskIndex: number,
    destColumnId: string,
    destTaskIndex: number
  ) => {
    setColumns((currentColumns) => {
      const { targetTask, newColumns: columnsAfterDelete } = getDeleteStatus(
        currentColumns,
        sourceColumnId,
        sourceTaskIndex
      );

      const newColumns = produce(columnsAfterDelete, (draft) => {
        draft[draft.findIndex(({ id }) => id === destColumnId)].tasks.splice(
          destTaskIndex,
          0,
          targetTask
        );
      });

      updateFirestoreBoard(boardId, {
        columns: newColumns,
      });

      return newColumns;
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
        updateTaskDetails,
        deleteTask,
        moveTask,
        updateBoardLastUsed,
        updateBoardDetails,
        deleteBoard,
      }}
    >
      {children}
    </Provider>
  );
};
