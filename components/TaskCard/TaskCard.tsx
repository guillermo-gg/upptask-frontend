import { TaskCardContainer } from "components/TaskCard/styles";
import React, { FunctionComponent } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";

const TaskCardContent = styled.div<{
  isBeingDragged?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  border: 2px solid gray;
  background: white;

  transform: scale(1);

  transition: 0.5s all ease;
  padding: 10px;

  ${(props) =>
    props.isBeingDragged &&
    css`
      transform: scale(1.1);
      box-shadow: 0px 0px 42px 0px rgba(0, 0, 0, 0.75);
    `}
`;

type TaskCardProps = {
  id: string;
  index: number;
  onClickDelete: () => void;
};
const TaskCard: FunctionComponent<TaskCardProps> = ({
  id,
  index,
  children,
  onClickDelete,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TaskCardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TaskCardContent
            isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
          >
            <span>{children}</span>
            <button type="button" onClick={onClickDelete}>
              Delete
            </button>
          </TaskCardContent>
        </TaskCardContainer>
      )}
    </Draggable>
  );
};

export default TaskCard;
