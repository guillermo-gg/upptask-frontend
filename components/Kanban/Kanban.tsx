import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { TEXT } from "styles/constants";

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

const HeaderContainer = styled.div`
  margin-bottom: 75px;

  h1 {
    ${TEXT.header};
  }
`;

type KanbanProps = {};
const Kanban: FunctionComponent<KanbanProps> = ({ children }) => {
  return (
    <OuterContainer>
      <HeaderContainer>
        <h1>Some title</h1>
      </HeaderContainer>
      <ColumnContainer>{children}</ColumnContainer>
    </OuterContainer>
  );
};

export default Kanban;
