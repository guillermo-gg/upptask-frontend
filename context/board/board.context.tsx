import { authContext } from "context/auth/auth.context";
import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { BoardT, createNewBoardDoc, syncBoards } from "services/board.service";

type CreateBoardCallback = (params: {
  title: string;
  description?: string;
}) => Promise<string>;

type BoardContextT = {
  boards: BoardT[];
  setBoards: Dispatch<SetStateAction<BoardT[]>>;
  createBoard: CreateBoardCallback;
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

  const { userId } = useContext(authContext);

  useEffect(() => {
    if (userId) syncBoards(userId, setBoards);
  }, [userId]);

  const createBoard: CreateBoardCallback = ({ title, description }) => {
    return createNewBoardDoc({
      title,
      description,
      userId,
    });
  };

  return (
    <Provider
      value={{
        boards,
        setBoards,
        createBoard,
      }}
    >
      {children}
    </Provider>
  );
};
