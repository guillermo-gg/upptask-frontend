import { TaskCard } from "components/TaskCard";
import TaskCardPlaceholder from "components/TaskCard/AddTaskCardPlaceholder";
import { tasksContext } from "context/tasks/tasks.context";
import * as faker from "faker";
import React, { FunctionComponent, useContext } from "react";
import { ColumnT } from "services/tasks.service";
import styled, { css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  width: 300px;
  min-height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
  //justify-content: space-between;
  padding: 10px;
  height: 40px;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    display: inline-block;
    margin-right: 10px;
  }

  span {
    border-radius: 15px;
    padding: 2px 10px;
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
          border: 1px dashed lightgray;
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
        <span>{tasks.length}</span>
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
