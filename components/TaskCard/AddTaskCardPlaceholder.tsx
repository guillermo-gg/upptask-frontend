import { CARD_CONSTANTS, TaskCardContainer } from "components/TaskCard/styles";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { COLORS, TRANSITION } from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

const InnerContainer = styled.button`
  width: 100%;
  height: 100%;
  ${flexFullCenterRow};

  border: 1px solid ${COLORS.background.border};
  border-radius: ${CARD_CONSTANTS.borderRadius};
  ${TRANSITION};
  color: ${COLORS.background.border};

  &:hover {
    border: 1px solid ${COLORS.elements.buttonText};
    color: ${COLORS.elements.buttonText};
  }
`;

type TaskCardPlaceholderProps = {
  onClickAdd: () => void;
};
const TaskCardPlaceholder: FunctionComponent<TaskCardPlaceholderProps> = ({
  onClickAdd,
}) => {
  return (
    <TaskCardContainer>
      <InnerContainer onClick={onClickAdd}>+ Add</InnerContainer>
    </TaskCardContainer>
  );
};

export default TaskCardPlaceholder;
