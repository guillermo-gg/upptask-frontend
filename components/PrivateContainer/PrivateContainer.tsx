import { Header, HeaderProps } from "components/PrivateContainer/Header";
import { Sidebar } from "components/PrivateContainer/Sidebar";
import { authContext } from "context/auth/auth.context";
import { BoardProvider } from "context/board/board.context";
import { useRouter } from "next/router";
import React, { FunctionComponent, useContext, useEffect } from "react";
import styled from "styled-components";

import { COLORS } from "styles/constants";

const AppContainer = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  height: 100vh;
  background-color: ${COLORS.ui.ui1};
`;

const ContentContainer = styled.div`
  padding: 120px 150px;
  flex: 1;
  overflow: scroll;
`;

type ContentProps = {
  header: HeaderProps;
};
const Content: FunctionComponent<ContentProps> = ({ children, header }) => (
  <ContentContainer>
    <Header {...header} />
    <main>{children}</main>
  </ContentContainer>
);

type PrivateContainerProps = {};

interface PrivateContainerType
  extends FunctionComponent<PrivateContainerProps> {
  Content: FunctionComponent<ContentProps>;
}
const PrivateContainer: PrivateContainerType = ({ children }) => {
  const { user, userId, loading } = useContext(authContext);

  const { replace } = useRouter();

  useEffect(() => {
    if (!userId && !loading) replace("/");
  }, [loading, replace, userId]);

  return user ? (
    <AppContainer>
      <BoardProvider>
        <Sidebar />
        {children}
      </BoardProvider>
    </AppContainer>
  ) : null;
};
PrivateContainer.Content = Content;

export default PrivateContainer;
