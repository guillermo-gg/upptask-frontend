import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { flexFullCenterColumn } from "styles/mixins";

const Container = styled.div`
  ${flexFullCenterColumn}
  height: 100%;
`;

type BoardsProps = {};
const Boards: FunctionComponent<BoardsProps> = (props) => {
  return <Container>Select one of the boards in the sidebar.</Container>;
};

export default Boards;
