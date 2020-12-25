import { Kanban } from "components/Kanban";
import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import { authContext } from "context/auth/auth.context";
import { tasksContext, TasksProvider } from "context/tasks/tasks.context";
import React, {
  FunctionComponent,
  ReactElement,
  useContext,
  useState,
} from "react";
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
    <PrivateContainer.Content
      header={{
        type: HeaderTypes.BIG,
        title: "Some board title",
        description: "Board description",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Kanban>
          {columns &&
            columns.map((column) => (
              <Column key={column.id} {...column} isDragging={isDragging} />
            ))}
        </Kanban>
      </DragDropContext>
    </PrivateContainer.Content>
  );
};

const BoardWithContext = (): ReactElement => {
  const { user } = useContext(authContext);

  return user?.uid ? (
    <TasksProvider userId={user?.uid}>
      <Board />
    </TasksProvider>
  ) : null;
};

export default BoardWithContext;
