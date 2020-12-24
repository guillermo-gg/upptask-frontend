import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { COLORS, STANDARD_BORDER_RADIUS, TRANSPARENT } from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

type ButtonContainerProps = {
  hasBorder?: boolean;
  isFullWidth?: boolean;
};

const Container = styled.button<ButtonContainerProps>`
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

interface IconButtonProps extends ButtonContainerProps {
  onClick: () => void;
  icon: string; // Icon src
  children?: string;
}
const IconButton: FunctionComponent<IconButtonProps> = ({
  onClick,
  children,
  icon,
  ...containerProps
}) => {
  return (
    <Container type="button" onClick={onClick} {...containerProps}>
      <LogoImg src={icon} alt="Button icon" />
      {children && <Label>{children}</Label>}
    </Container>
  );
};

export default IconButton;
