import React, { FunctionComponent } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

import { Pill } from "components/Pill";
import {
  COLORS,
  ELEVATION,
  STANDARD_BORDER_RADIUS,
  TEXT,
  TRANSITION,
} from "styles/constants";
import { CardContainer, CardSize } from "./styles";

const TaskCardContent = styled.button<{
  isBeingDragged?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  text-align: left;

  width: 100%;
  height: 100%;

  border-radius: ${STANDARD_BORDER_RADIUS};
  background: white;
  ${ELEVATION.low};

  transform: scale(1);
  padding: 25px;
  ${TRANSITION};

  &:hover {
    transform: scale(0.98);
  }
`;

const Title = styled.div`
  ${TEXT.labelMedium};
  margin-bottom: 10px;
`;

const Description = styled.div`
  ${TEXT.labelSmall};
  color: ${COLORS.text.textGray1};
`;

type BoardCardProps = {
  title: string;
  description?: string;
  onClick: () => void;
  containerStyles?: FlattenSimpleInterpolation;
};
const BoardCard: FunctionComponent<BoardCardProps> = ({
  title,
  description,
  onClick,
  containerStyles,
}) => {
  return (
    <CardContainer size={CardSize.MEDIUM} styles={containerStyles}>
      <TaskCardContent type="button" onClick={onClick}>
        <div>
          <Title>{title}</Title>
          <Description>{description ?? ""}</Description>
        </div>
        <Pill>34</Pill>
      </TaskCardContent>
    </CardContainer>
  );
};

export default BoardCard;
