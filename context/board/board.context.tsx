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
  BoardT,
  ColumnT,
  syncBoards,
  syncColumnsId,
  syncTasks,
  TaskT,
  updateFirestoreTasks,
} from "services/tasks.service";

type BoardContextT = {
  boards: BoardT[];
  setBoards: Dispatch<SetStateAction<BoardT[]>>;
};

export const boardContext = createContext<BoardContextT | null>(null);

const { Provider } = boardContext;

// Using Immer:
/* eslint-disable no-param-reassign */
type BoardProviderProps = {};
export const BoardProvider: FunctionComponent<BoardProviderProps> = ({
  children,
}) => {
  const [boards, setBoards] = useState<BoardT[]>([]);

  useEffect(() => {
    syncBoards(setBoards);
  }, []);

  return (
    <Provider
      value={{
        boards,
        setBoards,
      }}
    >
      {children}
    </Provider>
  );
};
