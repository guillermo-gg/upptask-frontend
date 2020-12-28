import { TaskCard, AddItemCard } from "components/Card";
import { TaskOptionsModal } from "components/Modal";
import { Pill } from "components/Pill";
import { tasksContext } from "context/tasks/tasks.context";
import * as faker from "faker";
import React, { FunctionComponent, useContext, useState } from "react";
import { ColumnT } from "services/board.service";
import styled, { css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { COLORS, TEXT } from "styles/constants";

const Container = styled.div`
  min-height: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-left: -10px;
  }
`;

const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 40px;

  h2 {
    ${TEXT.labelBig};
    font-weight: bold;

    display: inline-block;
    margin-right: 15px;
  }
`;

const DropArea = styled.ul<{
  isDragging?: boolean;
}>`
  flex: 1;
  padding: 10px;

  border-radius: 10px;
  border: 1px dashed transparent;
  transition: 0.5s all ease;

  ${({ isDragging }) =>
    isDragging
      ? css`
          border: 1px dashed ${COLORS.ui.ui6};
        `
      : null}
`;

type TaskModalOptions = {
  isVisible: boolean;
  initialValues?: {
    id: string;
    title: string;
    description?: string;
  };
};

interface ColumnProps extends ColumnT {
  isDragging?: boolean;
}
const Column: FunctionComponent<ColumnProps> = ({
  id,
  name,
  tasks,
  isDragging,
}) => {
  const { deleteTask } = useContext(tasksContext);

  const [
    editTaskModalStatus,
    setEditTaskModalStatus,
  ] = useState<TaskModalOptions>({ isVisible: false });

  return (
    <>
      <Container>
        <ColumnTitle>
          <h2>{name}</h2>
          <Pill>{tasks.length}</Pill>
        </ColumnTitle>
        <Droppable droppableId={id}>
          {(droppableProvided) => (
            <DropArea
              isDragging={isDragging}
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {tasks.map(
                (
                  {
                    id: taskId,
                    title: taskTitle,
                    description: taskDescription,
                  },
                  index
                ) => (
                  <TaskCard
                    key={taskId}
                    id={taskId}
                    index={index}
                    onClickDelete={() => deleteTask(id, index)}
                    title={taskTitle}
                    description={taskDescription}
                  />
                )
              )}
              {droppableProvided.placeholder}
              <AddItemCard
                isDragging={isDragging}
                onClickAdd={() => setEditTaskModalStatus({ isVisible: true })}
                containerStyles={css`
                  margin-bottom: 0;
                `}
              />
            </DropArea>
          )}
        </Droppable>
      </Container>
      <TaskOptionsModal
        onClose={() => setEditTaskModalStatus({ isVisible: false })}
        isVisible={editTaskModalStatus.isVisible}
        initialValues={editTaskModalStatus.initialValues}
        columnId={id}
      />
    </>
  );
};

export default Column;
