import React, { FunctionComponent } from "react";
import Link from "next/link";
import styled from "styled-components";
import { COLORS, TEXT, TRANSITION } from "styles/constants";
import { flexFullCenterColumn } from "styles/mixins";

const FooterContainer = styled.footer`
  height: 50vh;
  width: 100%;

  ${flexFullCenterColumn};
  background-color: ${COLORS.ui.ui8};
  color: ${COLORS.text.textGray4};
`;

const Logo = styled.img`
  opacity: 0.7;
  width: 200px;
  height: auto;
  margin-bottom: 50px;
`;

const CopyrightLabel = styled.div`
  font-size: 0.9rem;
  color: ${COLORS.text.textGray3};
  margin-bottom: 30px;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${COLORS.text.textGray4};

  a {
    ${TRANSITION};

    &:not(:last-of-type) {
      margin-right: 20px;
    }

    &:visited {
      color: inherit;
    }

    &:hover {
      color: ${COLORS.brand.accent};
      text-decoration: none;
    }
  }
`;

type FooterProps = {};
const Footer: FunctionComponent<FooterProps> = (props) => {
  return (
    <FooterContainer>
      <Logo src="/assets/logo-light.svg" alt="Logo" />
      <CopyrightLabel>Copyright 2020 &copy; Upptask</CopyrightLabel>
      <LinksContainer>
        <Link href="/legal/privacy-note">
          <a>Privacy Note </a>
        </Link>
        <Link href="/legal/terms-and-conditions">
          <a> Terms &amp; Conditions</a>
        </Link>
      </LinksContainer>
    </FooterContainer>
  );
};

export default Footer;
