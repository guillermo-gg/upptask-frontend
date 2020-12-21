import { CARD_CONSTANTS, TaskCardContainer } from "components/TaskCard/styles";
import React, { FunctionComponent, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import { ELEVATION, TRANSITION } from "styles/constants";

const TaskCardContent = styled.div<{
  isBeingDragged?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  border-radius: ${CARD_CONSTANTS.borderRadius};
  background: white;
  ${ELEVATION.low};

  transform: scale(1) rotate(0deg);
  padding: 20px;
  ${TRANSITION};

  ${({ isBeingDragged }) =>
    isBeingDragged &&
    css`
      transform: scale(1.1) rotate(2deg);
      ${ELEVATION.focus};
    `};
`;

const DeleteIcon = styled.button`
  ${TRANSITION};
  padding: 2px;
  img {
    height: 100%;
    max-width: 20px;
  }
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
  const [isMouseOver, setIsMouseOver] = useState(false);

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
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          >
            <span>{children}</span>
            <DeleteIcon type="button" onClick={onClickDelete}>
              <img src="/assets/trash.svg" alt="trash" />
            </DeleteIcon>
          </TaskCardContent>
        </TaskCardContainer>
      )}
    </Draggable>
  );
};

export default TaskCard;
