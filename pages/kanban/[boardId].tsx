import { tasksContext, TasksProvider } from "context/tasks/tasks.context";
import { FunctionComponent, ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
  const [isDragging, setIsDragging] = useState(false);

  const { columns, moveTask } = useContext(tasksContext);

  const onDragEnd = ({ source, destination }: DropResult) => {
    setIsDragging(false);
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    moveTask(
      source.droppableId,
      source.index,
      destination.droppableId,
      destination.index
    );
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

const BoardWithContext = (): ReactElement => (
  <TasksProvider>
    <Board />
  </TasksProvider>
);

export default BoardWithContext;
