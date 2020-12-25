import React, { FunctionComponent } from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ColumnContainer = styled.div`
  display: flex;

  & > * {
    margin-right: 20px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

type KanbanProps = {};
const Kanban: FunctionComponent<KanbanProps> = ({ children }) => {
  return (
    <OuterContainer>
      <ColumnContainer>{children}</ColumnContainer>
    </OuterContainer>
  );
};

export default Kanban;
