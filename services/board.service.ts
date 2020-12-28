import { Dispatch, SetStateAction } from "react";
import { db } from "./firebase.service";

export type TaskT = {
  id: string;
  title: string;
  description: string;
};

export type ColumnT = {
  id: string;
  name: string;
  tasks: TaskT[];
};

export type BoardT = {
  id: string;
  userId: string;
  title: string;
  lastUsed: number; // Date.now()
  description?: string;
  columns: ColumnT[];
};

const boardsRef = db.collection("boards");

// Returns the ID of the newly created document:
export const createNewBoardDoc = async ({
  userId,
  title,
  description,
}: {
  userId: string;
  title: string;
  description?: string;
}): Promise<string> => {
  const emptyColumns: ColumnT[] = [
    {
      id: "1",
      name: "To do",
      tasks: [],
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
  ];

  return (
    await boardsRef.add({
      title,
      description: description ?? "",
      userId,
      lastUsed: Date.now(),
      columns: emptyColumns,
    })
  ).id;
};

type SyncBoardParams = {
  boardId: string | null;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setColumns: Dispatch<SetStateAction<ColumnT[]>>;
};
export const syncBoard = ({
  boardId,
  setTitle,
  setDescription,
  setColumns,
}: SyncBoardParams) => {
  return boardsRef.doc(boardId).onSnapshot((doc) => {
    if (!doc.exists) return;
    const { title, description, columns } = doc.data();
    setColumns(columns);
    setTitle(title);
    setDescription(description);
  });
};

export const updateFirestoreBoard = (
  boardId: string | null,
  updatedData: {
    columns?: ColumnT[];
    title?: string;
    lastUsed?: number;
    description?: string;
  }
) => {
  if (!boardId) return;

  return boardsRef.doc(boardId).set(updatedData, { merge: true });
};

export const deleteFirestoreBoard = (boardId: string | null) => {
  if (!boardId) return;

  return boardsRef.doc(boardId).delete();
};

export const syncBoards = async (
  userId: string,
  setBoards: Dispatch<SetStateAction<BoardT[]>>
) => {
  boardsRef.where("userId", "==", userId).onSnapshot((snapshot) => {
    const retrievedBoards: BoardT[] = [];
    snapshot.forEach((doc) => {
      const { title, description, columns, lastUsed } = doc.data();
      retrievedBoards.push({
        title,
        description,
        columns,
        userId,
        lastUsed,
        id: doc.id,
      });
    });
    setBoards(
      retrievedBoards.sort((a, b) => (b.lastUsed ?? 0) - (a.lastUsed ?? 0))
    );
  });
};
