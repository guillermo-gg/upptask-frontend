import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";

import { COLORS } from "styles/constants";

const AppContainer = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  height: 100vh;
  background: ${COLORS.background.base};

  main {
    padding: 75px 100px;
    width: 100%;
  }
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? "250px" : "100px")};
  transition: 0.2s all ease;

  background: lightgray;
  padding: 10px;
`;

type PrivateContainerProps = {};
const PrivateContainer: FunctionComponent<PrivateContainerProps> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppContainer>
      <SidebarContainer
        isOpen={isSidebarOpen}
        onClick={() => {
          setIsSidebarOpen((current) => !current);
        }}
      >
        Sidebar
      </SidebarContainer>
      <main>{children}</main>
    </AppContainer>
  );
};

export default PrivateContainer;
