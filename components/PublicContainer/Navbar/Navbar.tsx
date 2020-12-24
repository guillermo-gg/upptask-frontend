import { Button } from "components/Button";
import { authContext } from "context/auth/auth.context";
import { useRouter } from "next/router";
import React, { FunctionComponent, useContext } from "react";
import styled from "styled-components";

export const NAVBAR_HEIGHT = "100px";
const Container = styled.nav`
  height: 20px;
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  height: ${NAVBAR_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type NavbarProps = {};
const Navbar: FunctionComponent<NavbarProps> = (props) => {
  const { user, signOut, signInWithGoogle } = useContext(authContext);

  const router = useRouter();

  return (
    <Container>
      <Logo src="/assets/logo-dark.svg" alt="Logo" />
      <LinksContainer>
        {user ? (
          <>
            <Button onClick={signOut}>Log out</Button>
            <Button isFilled onClick={() => router.push("/boards")}>
              Boards
            </Button>
          </>
        ) : (
          <>
            <Button onClick={signInWithGoogle}>Log in</Button>
            <Button isFilled onClick={signInWithGoogle}>
              Sign up
            </Button>
          </>
        )}
      </LinksContainer>
    </Container>
  );
};

export default Navbar;
