import { TaskCardContainer } from "components/TaskCard/styles";
import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { COLORS, STANDARD_BORDER_RADIUS, TRANSITION } from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

const InnerContainer = styled.button<{ isDragging: boolean }>`
  width: 100%;
  height: 100%;
  ${flexFullCenterRow};
  opacity: 0.5;

  border: 1px solid ${COLORS.ui.ui6};
  color: ${COLORS.text.textGray1};
  border-radius: ${STANDARD_BORDER_RADIUS};
  ${TRANSITION};

  &:hover {
    ${({ isDragging }) =>
      !isDragging &&
      css`
        border: 1px solid ${COLORS.ui.ui6};
        opacity: 1;
      `}
  }
`;

type TaskCardPlaceholderProps = {
  onClickAdd: () => void;
  isDragging?: boolean;
};
const TaskCardPlaceholder: FunctionComponent<TaskCardPlaceholderProps> = ({
  onClickAdd,
  isDragging,
}) => {
  return (
    <TaskCardContainer
      styles={css`
        margin-bottom: 0;
      `}
    >
      <InnerContainer onClick={onClickAdd} isDragging={isDragging}>
        + Add
      </InnerContainer>
    </TaskCardContainer>
  );
};

export default TaskCardPlaceholder;
