import { ColumnT } from "data/types";
import { insertInArray } from "helpers/utils";
import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { DragDropContext, DroppableId, DropResult } from "react-beautiful-dnd";

import { columns as initialColumns } from "data/initial-data";

import { Column } from "components/Column";

const KanbanContainer = styled.div`
  margin: 2rem 1rem;
  display: flex;

  & > * {
    margin-right: 20px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

type BoardProps = {};
const Board: FunctionComponent<BoardProps> = (props) => {
  const [columns, setColumns] = useState<ColumnT[]>(initialColumns);
  const [isDragging, setIsDragging] = useState(false);

  const updateColumns = (
    from: {
      droppableId: DroppableId;
      index: number;
    },
    to: {
      droppableId: DroppableId;
      index: number;
    }
  ) => {
    setColumns((currentColumns) => {
      const movedTask = currentColumns.find(({ id }) => id === from.droppableId)
        .tasks[from.index];

      return (
        currentColumns
          // Get rid of the item in the old position:
          .map((column) => ({
            ...column,
            tasks:
              column.id === from.droppableId
                ? column.tasks.filter((_, index) => {
                    return index !== from.index;
                  })
                : column.tasks,
          }))
          // Add it to the new position:
          .map((column) => ({
            ...column,
            tasks:
              column.id === to.droppableId
                ? insertInArray(movedTask, to.index, column.tasks)
                : column.tasks,
          }))
      );
    });
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    setIsDragging(false);
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    updateColumns(source, destination);
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <KanbanContainer>
        {columns.map((column) => (
          <Column key={column.id} {...column} isDragging={isDragging} />
        ))}
      </KanbanContainer>
    </DragDropContext>
  );
};

export default Board;
