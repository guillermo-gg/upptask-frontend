import React, { FunctionComponent } from "react";
import Link from "next/link";
import styled from "styled-components";

import { COLORS, STANDARD_BORDER_RADIUS, TRANSPARENT } from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

type ButtonContainerProps = {
  hasBorder?: boolean;
  isFullWidth?: boolean;
};

const Container = styled.div<ButtonContainerProps>`
  color: ${COLORS.text.white};
  border: 1px solid
    ${({ hasBorder }) => (hasBorder ? COLORS.ui.white : TRANSPARENT)};
  border-radius: ${STANDARD_BORDER_RADIUS};
  padding: 6px 20px;
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "auto")};

  ${flexFullCenterRow};
`;

const LogoImg = styled.img`
  height: 18px;
  width: auto;
`;

const Label = styled.span`
  margin-left: 10px;
`;

const getWrapper = (
  wrapper: "a" | "button"
): FunctionComponent<{ localHref?: string; [key: string]: any }> => ({
  children,
  localHref,
  ...otherProps
}) =>
  wrapper === "a" ? (
    <Link href={localHref}>
      <a {...otherProps}>{children}</a>
    </Link>
  ) : (
    <button type="button" {...otherProps}>
      {children}
    </button>
  );

interface IconButtonProps extends ButtonContainerProps {
  onClick?: () => void;
  localHref?: string;
  icon: string; // Icon src
  children?: string;
}
const IconButton: FunctionComponent<IconButtonProps> = ({
  onClick,
  localHref,
  children,
  icon,
  ...containerProps
}) => {
  const Wrapper = getWrapper(onClick ? "button" : "a");

  return (
    <Wrapper onClick={onClick} localHref={localHref}>
      <Container {...containerProps}>
        <LogoImg src={icon} alt="Button icon" />
        {children && <Label>{children}</Label>}
      </Container>
    </Wrapper>
  );
};

export default IconButton;
