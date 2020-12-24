import { Navbar } from "components/PublicContainer/Navbar";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { COLORS } from "styles/constants";

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.ui.ui2};
`;

type PublicContainerProps = {};
const PublicContainer: FunctionComponent<PublicContainerProps> = ({
  children,
}) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};

export default PublicContainer;
