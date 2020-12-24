import { Sidebar } from "components/PrivateContainer/Sidebar";
import { authContext } from "context/auth/auth.context";
import { useRouter } from "next/router";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

import { COLORS } from "styles/constants";

const AppContainer = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  height: 100vh;
  background-color: ${COLORS.ui.ui1};

  main {
    padding: 120px 150px;
    flex: 1;
  }
`;

type PrivateContainerProps = {};
const PrivateContainer: FunctionComponent<PrivateContainerProps> = ({
  children,
}) => {
  const { user, userId, loading } = useContext(authContext);

  const { replace } = useRouter();

  useEffect(() => {
    if (!userId && !loading) replace("/");
  }, [loading, replace, userId]);

  return user ? (
    <AppContainer>
      <Sidebar />
      <main>{children}</main>
    </AppContainer>
  ) : null;
};

export default PrivateContainer;
