import { authContext } from "context/auth/auth.context";
import { useRouter } from "next/router";
import React, { FunctionComponent, useContext, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  COLORS,
  ELEVATION,
  STANDARD_BORDER_RADIUS,
  TEXT,
  TRANSITION,
} from "styles/constants";

const Container = styled.div`
  height: 450px;
  width: 400px;
  padding: 50px 75px;
  background-color: ${COLORS.ui.white};
  border-radius: ${STANDARD_BORDER_RADIUS};
  ${ELEVATION.low};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${TEXT.labelMedium};
  font-weight: 500;
  color: ${COLORS.brand.primary};
  img {
    margin-top: 5px;
  }
`;

const GoogleSignInButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid ${COLORS.ui.ui3};
  ${ELEVATION.subtle};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${TRANSITION};

  &:hover {
    background-color: ${COLORS.ui.ui1};
  }

  span {
    margin-left: 10px;
  }
  img {
    height: 25px;
    width: auto;
  }
`;

const FooterText = styled.div`
  ${TEXT.labelSmall};
  color: ${COLORS.text.textGray2};
  text-align: center;
  a:visited {
    color: inherit;
  }
`;

type AuthCardProps = {
  headerCopy: string;
  footerCopy: {
    firstLine: string;
    secondLine: string; // Alternative: if in "Log in" => "Sign up"
    target: string; // Target page
  };
};
const AuthCard: FunctionComponent<AuthCardProps> = ({
  headerCopy,
  footerCopy,
}) => {
  const { signInWithGoogle, userId } = useContext(authContext);

  const router = useRouter();

  useEffect(() => {
    if (userId) router.push("/");
  }, [router, userId]);

  return (
    <Container>
      <HeaderSection>
        {headerCopy}
        <img src="/assets/logo-dark.svg" alt="Logo" />
      </HeaderSection>
      <GoogleSignInButton type="button" onClick={signInWithGoogle}>
        <img src="/assets/google-icon.svg" alt="Google icon" />
        <span>Continue with Google</span>
      </GoogleSignInButton>
      <FooterText>
        <div>{footerCopy.firstLine}</div>
        <Link href={footerCopy.target}>
          <a>{footerCopy.secondLine}</a>
        </Link>
      </FooterText>
    </Container>
  );
};

export default AuthCard;
