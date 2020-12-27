import { Kanban } from "components/Kanban";
import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import { authContext } from "context/auth/auth.context";
import { tasksContext, TasksProvider } from "context/tasks/tasks.context";
import { useRouter } from "next/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Column } from "components/Column";

type BoardProps = {};
const Board: FunctionComponent<BoardProps> = (props) => {
  const [isDragging, setIsDragging] = useState(false);

  const {
    columns,
    moveTask,
    title,
    description,
    updateBoardLastUsed,
  } = useContext(tasksContext);

  useEffect(() => {
    updateBoardLastUsed();
  }, [updateBoardLastUsed]);

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
        title,
        description,
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

const BoardWithContext: FunctionComponent = () => {
  const { user } = useContext(authContext);

  const {
    query: { boardId: parsedBoardId },
  } = useRouter();

  const boardId = useMemo(
    (): string =>
      Array.isArray(parsedBoardId) ? parsedBoardId[0] : parsedBoardId,
    [parsedBoardId]
  );

  return user?.uid && boardId ? (
    <TasksProvider boardId={boardId}>
      <Board />
    </TasksProvider>
  ) : null;
};

export default BoardWithContext;
