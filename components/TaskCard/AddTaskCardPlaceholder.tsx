import { TaskCardContainer } from "components/TaskCard/styles";
import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { flexFullCenterRow } from "styles/mixins";

const InnerContainer = styled.button`
  width: 100%;
  height: 100%;
  ${flexFullCenterRow};

  border: 1px solid lightgray;
  transition: 0.2s all ease;

  &:hover {
    border: 1px solid black;
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
