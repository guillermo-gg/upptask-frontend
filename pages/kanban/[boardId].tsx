import { Kanban } from "components/Kanban";
import { tasksContext, TasksProvider } from "context/tasks/tasks.context";
import { FunctionComponent, ReactElement, useContext, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Column } from "components/Column";

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
      <Kanban>
        {columns.map((column) => (
          <Column key={column.id} {...column} isDragging={isDragging} />
        ))}
      </Kanban>
    </DragDropContext>
  );
};

const BoardWithContext = (): ReactElement => (
  <TasksProvider>
    <Board />
  </TasksProvider>
);

export default BoardWithContext;
