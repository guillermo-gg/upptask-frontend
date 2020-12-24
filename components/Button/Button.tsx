import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import {
  COLORS,
  ELEVATION,
  STANDARD_BORDER_RADIUS,
  TEXT,
} from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

type ContainerProps = {
  isFilled?: boolean;
  isBig?: boolean;
  fullWidth?: boolean;
};
const ButtonContainer = styled.button<ContainerProps>`
  ${(props) =>
    props.isFilled
      ? css`
          background-color: ${COLORS.brand.primary};
          ${ELEVATION.button};
          color: ${COLORS.text.white};
        `
      : ""}

  ${(props) =>
    props.isBig
      ? css`
          ${TEXT.labelBig};
          height: 65px;
        `
      : css`
          ${TEXT.navLink};
          height: 45px;
        `};

  ${flexFullCenterRow};
  padding: 0 30px;

  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  border-radius: ${STANDARD_BORDER_RADIUS};
`;

interface ButtonProps extends ContainerProps {
  onClick: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  ...containerProps
}) => {
  return (
    <ButtonContainer {...containerProps} type="button" onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
