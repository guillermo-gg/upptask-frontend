import { CARD_CONSTANTS, TaskCardContainer } from "components/TaskCard/styles";
import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { COLORS, TRANSITION } from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

const InnerContainer = styled.button`
  width: 100%;
  height: 100%;
  ${flexFullCenterRow};

  border: 1px solid lightgray;
  border-radius: ${CARD_CONSTANTS.borderRadius};
  ${TRANSITION};

  &:hover {
    border: 1px solid lightgray;
  }
`;

type TaskCardPlaceholderProps = {
  onClickAdd: () => void;
};
const TaskCardPlaceholder: FunctionComponent<TaskCardPlaceholderProps> = ({
  onClickAdd,
}) => {
  return (
    <TaskCardContainer
      styles={css`
        margin-bottom: 0;
      `}
    >
      <InnerContainer onClick={onClickAdd}>+ Add</InnerContainer>
    </TaskCardContainer>
  );
};

export default TaskCardPlaceholder;
