import { IconButton } from "components/Button";
import React, { FunctionComponent, useState } from "react";
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const ButtonsContainer = styled.div<{ isVisible?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};

  &,
  * {
    ${TRANSITION};
  }

  button {
    height: 17px;
    width: 17px;

    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
  img {
    height: 100%;
    width: auto;
  }
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
  onClickEdit: () => void;
  title: string;
  description?: string;
};
const TaskCard: FunctionComponent<TaskCardProps> = ({
  id,
  index,
  title,
  description,
  onClickDelete,
  onClickEdit,
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          size={CardSize.SMALL}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <TaskCardContent
            isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}
          >
            <InfoContainer>
              <Title>{title}</Title>
              <Description>{description ?? ""}</Description>
            </InfoContainer>
            <ButtonsContainer isVisible={isMouseOver}>
              <button type="button" onClick={onClickEdit}>
                <img src="/assets/edit-icon-gray.svg" alt="Edit task icon" />
              </button>
              <button type="button" onClick={onClickDelete}>
                <img src="/assets/trash.svg" alt="Delete tasks icon" />
              </button>
            </ButtonsContainer>
          </TaskCardContent>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default TaskCard;
