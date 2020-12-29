import { IconButton } from "components/Button";
import { Kanban } from "components/Kanban";
import { BoardOptionsModal, Modal } from "components/Modal";
import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import { Seo } from "components/Seo";
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
import { COLORS } from "styles/constants";

type BoardProps = {};
const Board: FunctionComponent<BoardProps> = (props) => {
  const [isDragging, setIsDragging] = useState(false);

  const router = useRouter();

  const [isLastUsedUpdated, setIsLastUsedUpdated] = useState(false);
  const [isEditBoardModalVisible, setIsEditBoardModalVisible] = useState(false);

  const {
    columns,
    moveTask,
    title,
    description,
    updateBoardLastUsed,
    updateBoardDetails,
    deleteBoard,
  } = useContext(tasksContext);

  useEffect(() => {
    setIsLastUsedUpdated((current) => {
      if (!current) updateBoardLastUsed();
      return true;
    });
  }, [isLastUsedUpdated, updateBoardLastUsed]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    setIsDragging(false);
    if (
      // Same column and spot:
      (source?.droppableId === destination?.droppableId &&
        source?.index === destination?.index) ||
      // Dragging outside of the dropping areas:
      source?.droppableId ||
      destination?.droppableId ||
      !source?.index ||
      destination?.index
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
    <>
      <Seo title={`${title} | Upptask`} />
      <PrivateContainer.Content
        header={{
          type: HeaderTypes.BIG,
          title,
          description,
          buttons: [
            {
              id: "edit-button",
              component: (
                <IconButton
                  hasBorder
                  icon="/assets/edit-icon-gray.svg"
                  onClick={() => {
                    setIsEditBoardModalVisible(true);
                  }}
                  color={COLORS.text.textGray1}
                >
                  Edit
                </IconButton>
              ),
            },
            {
              id: "delete-button",
              component: (
                <IconButton
                  hasBorder
                  icon="/assets/trash.svg"
                  onClick={() => {
                    deleteBoard().then(() => {
                      router.push("/boards");
                    });
                  }}
                  color={COLORS.ui.red1}
                >
                  Delete
                </IconButton>
              ),
            },
          ],
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
      <BoardOptionsModal
        onClose={() => setIsEditBoardModalVisible(false)}
        isVisible={isEditBoardModalVisible}
        initialValues={{ title, description }}
        updateBoardDetails={updateBoardDetails}
      />
    </>
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
