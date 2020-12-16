import TaskCard from "components/TaskCard";
import { ColumnT } from "data/types";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  width: 300px;
  min-height: 200px;
  padding: 20px;
  border: 2px solid gray;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

type ColumnProps = ColumnT;
const Column: FunctionComponent<ColumnProps> = ({ id, name, tasks }) => {
  return (
    <Container>
      <h1>{name}</h1>
      <Droppable droppableId={id}>
        {(droppableProvided) => (
          <ul
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
          >
            {tasks.map(({ id: taskId, content }, index) => (
              <TaskCard key={taskId} id={taskId} index={index}>
                {content}
              </TaskCard>
            ))}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
