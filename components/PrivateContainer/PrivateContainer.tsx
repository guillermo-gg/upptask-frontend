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
  background: ${COLORS.background.base};

  main {
    padding: 75px 100px;
    width: 100%;
  }
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? "350px" : "50px")};
  transition: 0.2s all ease;

  background: lightgray;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

type PrivateContainerProps = {};
const PrivateContainer: FunctionComponent<PrivateContainerProps> = ({
  children,
}) => {
  const { userId, loading } = useContext(authContext);

  const { replace } = useRouter();

  useEffect(() => {
    if (!userId && !loading) replace("/");
  }, [loading, replace, userId]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { user, signOut, signInWithGoogle } = useContext(authContext);

  return (
    <AppContainer>
      <SidebarContainer
        isOpen={isSidebarOpen}
        onClick={() => {
          setIsSidebarOpen((current) => !current);
        }}
      >
        <div>{user?.email ?? "Not signed in"}</div>
        <button type="button" onClick={user ? signOut : signInWithGoogle}>
          {user?.email ? "sign out" : "sign in"}
        </button>
      </SidebarContainer>
      <main>{children}</main>
    </AppContainer>
  );
};

export default PrivateContainer;
