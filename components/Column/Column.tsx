import { TaskCard } from "components/TaskCard";
import TaskCardPlaceholder from "components/TaskCard/AddTaskCardPlaceholder";
import { tasksContext } from "context/tasks/tasks.context";
import { ColumnT } from "data/types";
import * as faker from "faker";
import React, { FunctionComponent, useContext } from "react";
import styled, { css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  width: 300px;
  min-height: 200px;
  padding: 20px;
  border: 2px solid gray;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

const DropArea = styled.ul<{
  isDragging?: boolean;
}>`
  flex: 1;

  // TODO: Fix this: not working
  padding-bottom: -10px;

  border: 2px dashed transparent;
  transition: 0.5s all ease;

  ${({ isDragging }) =>
    isDragging
      ? css`
          border: 2px dashed lightgray;
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
      <h1>{name}</h1>
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
              >
                {content}
              </TaskCard>
            ))}
            {droppableProvided.placeholder}
            <TaskCardPlaceholder
              onClickAdd={() => addTaskToColumn(faker.company.bsBuzz(), id)}
            />
          </DropArea>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
