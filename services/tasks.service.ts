import { Dispatch, SetStateAction } from "react";
import { updateUserColumnsId } from "services/user.service";
import { db } from "./firebase.service";

export type TaskT = {
  id: string;
  content: string;
};

export type ColumnT = {
  id: string;
  name: string;
  tasks: TaskT[];
};

export type BoardT = {
  id: string;
  title: string;
  description?: string;
};

const columnsRef = db.collection("columns");
const usersRef = db.collection("users");

// Returns the ID of the newly created document:
export const createNewColumnsDoc = async (): Promise<string> => {
  const columns: ColumnT[] = [
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
    await columnsRef.add({
      columns,
    })
  ).id;
};

export const syncColumnsId = async (
  userId: string,
  setColumnsId: Dispatch<SetStateAction<string>>
) => {
  usersRef.doc(userId).onSnapshot((doc) => {
    const { columnsId } = doc.data();
    setColumnsId(columnsId);
    if (!columnsId) {
      createNewColumnsDoc().then((newColumnsId) => {
        updateUserColumnsId(userId, newColumnsId);
      });
    }
  });
};

export const syncTasks = (
  columnsId: string | null,
  setTasks: Dispatch<SetStateAction<ColumnT[]>>
) => {
  // if (!columnsId) {
  //   createNewColumnsDoc();
  // }

  return columnsRef.doc(columnsId).onSnapshot((doc) => {
    if (!doc.exists) return;
    setTasks((doc.data() as { columns: ColumnT[] }).columns);
  });
};

export const updateFirestoreTasks = (
  columnsId: string | null,
  updatedColumns: ColumnT[]
) => {
  if (!columnsId) return;

  return columnsRef.doc(columnsId).set(
    {
      columns: updatedColumns,
    },
    { merge: true }
  );
};

export const syncBoards = (setBoards: Dispatch<SetStateAction<BoardT[]>>) => {
  const dummyBoards: BoardT[] = [
    {
      title: "Some board",
      id: "pt793fiqewhuclij",
      description: "sdau asdf asdfa",
    },
    {
      title: "Some other board",
      id: "pt793fiqef2whuclij",
      description: "sdau asdf asdfa",
    },
    {
      title: "A third board",
      id: "pt793fiqedfwhuclij",
      description: "sdau asdf asdfa",
    },
  ];

  setBoards(dummyBoards);
};
