import React, { FunctionComponent } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const TaskCardContainer = styled.li`
  padding: 15px;

  border: 2px solid gray;
  background: white;
  margin-bottom: 10px;
`;

type TaskCardProps = {
  id: string;
  index: number;
};
const TaskCard: FunctionComponent<TaskCardProps> = ({
  id,
  index,
  children,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(draggableProvided) => (
        <TaskCardContainer
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
        >
          {children}
        </TaskCardContainer>
      )}
    </Draggable>
  );
};

export default TaskCard;
