import { authContext } from "context/auth/auth.context";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, useContext, useEffect } from "react";
import styled from "styled-components";
import { COLORS, TRANSITION } from "styles/constants";
import { flexCenterRow, flexFullCenterRow } from "styles/mixins";

export const NAVBAR_HEIGHT = "100px";
const Container = styled.nav`
  padding: 20px;
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  height: ${NAVBAR_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonBase = styled.button`
  min-width: 150px;
  height: 100%;
  border-radius: 10px;
  ${flexFullCenterRow};

  ${TRANSITION};

  margin-left: 20px;
`;

const ButtonSecondary = styled(ButtonBase)`
  color: ${COLORS.illustration.secondary};
  &:hover {
    color: ${COLORS.elements.buttonText};
  }
`;

const ButtonCTA = styled(ButtonBase)`
  color: ${COLORS.illustration.main};
  background-color: ${COLORS.illustration.secondary};
  &:hover {
    background-color: ${COLORS.elements.buttonText};
  }
`;

type NavbarProps = {};
const Navbar: FunctionComponent<NavbarProps> = (props) => {
  const { user, signOut, signInWithGoogle } = useContext(authContext);

  const router = useRouter();

  return (
    <Container>
      {user ? (
        <>
          <span>Hello, {user.displayName}</span>
          <ButtonSecondary type="button" onClick={signOut}>
            Log out
          </ButtonSecondary>
          <ButtonCTA type="button" onClick={() => router.push("/kanban")}>
            Boards
          </ButtonCTA>
        </>
      ) : (
        <>
          <ButtonSecondary type="button" onClick={signInWithGoogle}>
            Log in
          </ButtonSecondary>
          <ButtonCTA type="button" onClick={signInWithGoogle}>
            Sign up
          </ButtonCTA>
        </>
      )}
    </Container>
  );
};

export default Navbar;
