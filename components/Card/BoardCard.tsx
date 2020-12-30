import React, { FunctionComponent } from "react";
import { ColumnT } from "services/board.service";
import styled, { FlattenSimpleInterpolation } from "styled-components";

import { Pill } from "components/Pill";
import {
  COLORS,
  ELEVATION,
  STANDARD_BORDER_RADIUS,
  TEXT,
  TRANSITION,
} from "styles/constants";
import { flexCenterRow } from "styles/mixins";
import { countTotalTasks } from "utils/board-utils";
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

const BottomContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;
const LastUsed = styled.div`
  ${TEXT.labelExtraSmall};
  color: ${COLORS.text.textGray1};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  span:not(:last-child) {
    margin-bottom: 5px;
  }
`;

type BoardCardProps = {
  title: string;
  columns: ColumnT[];
  description?: string;
  lastUsed?: number;
  onClick: () => void;
  containerStyles?: FlattenSimpleInterpolation;
};
const BoardCard: FunctionComponent<BoardCardProps> = ({
  title,
  description,
  columns,
  lastUsed,
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
        <BottomContainer>
          <Pill>{countTotalTasks(columns)}</Pill>
          <LastUsed>
            <span>Last seen:</span>
            <span>{new Date(lastUsed).toLocaleString("en-GB")}</span>
          </LastUsed>
        </BottomContainer>
      </TaskCardContent>
    </CardContainer>
  );
};

export default BoardCard;
