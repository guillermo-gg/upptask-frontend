import { TaskCard, AddItemCard } from "components/Card";
import { Pill } from "components/Pill";
import { tasksContext } from "context/tasks/tasks.context";
import * as faker from "faker";
import React, { FunctionComponent, useContext } from "react";
import { ColumnT } from "services/tasks.service";
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

interface ColumnProps extends ColumnT {
  isDragging?: boolean;
}
const Column: FunctionComponent<ColumnProps> = ({
  id,
  name,
  tasks,
  isDragging,
}) => {
  const { addTaskToColumn, deleteTask } = useContext(tasksContext);

  return (
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
            {tasks.map(({ id: taskId, content }, index) => (
              <TaskCard
                key={taskId}
                id={taskId}
                index={index}
                onClickDelete={() => deleteTask(id, index)}
                title={content}
                description="Some description"
              />
            ))}
            {droppableProvided.placeholder}
            <AddItemCard
              isDragging={isDragging}
              onClickAdd={() => addTaskToColumn(faker.company.bsBuzz(), id)}
            />
          </DropArea>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
