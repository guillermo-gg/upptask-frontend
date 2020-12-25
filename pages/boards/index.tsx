import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import React, { FunctionComponent } from "react";

type Board = {
  label: string;
  id: string;
};

const boards: Board[] = [
  {
    label: "Some board",
    id: "pt793fiqewhuclij",
  },
  {
    label: "Some other board",
    id: "pt793fiqef2whuclij",
  },
  {
    label: "A third board",
    id: "pt793fiqedfwhuclij",
  },
];

type BoardsProps = {};
const Boards: FunctionComponent<BoardsProps> = (props) => {
  return (
    <PrivateContainer.Content
      header={{
        type: HeaderTypes.REGULAR,
        title: "Your boards",
        description: "Select a board, or create one",
      }}
    >
      {boards.map(({ label, id }) => null)}
    </PrivateContainer.Content>
  );
};

export default Boards;
