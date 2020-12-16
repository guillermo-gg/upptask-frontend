import { ColumnT } from "data/types";
import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { columns as initialColumns, tasks } from "data/initial-data";

import Column from "components/Column";

const KanbanContainer = styled.div`
  margin: 2rem 1rem;
  display: flex;
`;

type BoardProps = {};
const Board: FunctionComponent<BoardProps> = (props) => {
  const [columns, setColumns] = useState<ColumnT[]>(initialColumns);

  const onDragEnd = () => {
    //
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <KanbanContainer>
        {columns.map((column) => (
          <Column key={column.id} {...column} />
        ))}
      </KanbanContainer>
    </DragDropContext>
  );
};

export default Board;
