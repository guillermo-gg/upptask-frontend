import React, { FunctionComponent } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import {
  COLORS,
  ELEVATION,
  STANDARD_BORDER_RADIUS,
  TEXT,
  TRANSITION,
} from "styles/constants";
import { CardContainer, CardSize } from "./styles";

const TaskCardContent = styled.div<{
  isBeingDragged?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  border-radius: ${STANDARD_BORDER_RADIUS};
  background: white;
  ${ELEVATION.low};

  transform: scale(1) rotate(0deg);
  padding: 15px;
  ${TRANSITION};

  ${({ isBeingDragged }) =>
    isBeingDragged &&
    css`
      transform: scale(1.1) rotate(2deg);
      ${ELEVATION.focus};
    `};
`;

const Title = styled.div`
  ${TEXT.labelSmall};
`;

const Description = styled.div`
  ${TEXT.labelExtraSmall};
  color: ${COLORS.text.textGray1};
`;

type TaskCardProps = {
  id: string;
  index: number;
  onClickDelete: () => void;
  title: string;
  description?: string;
};
const TaskCard: FunctionComponent<TaskCardProps> = ({
  id,
  index,
  title,
  description,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          size={CardSize.SMALL}
        >
          <TaskCardContent
            isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
          >
            <Title>{title}</Title>
            <Description>{description ?? ""}</Description>
          </TaskCardContent>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default TaskCard;
