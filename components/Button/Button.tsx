import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import {
  COLORS,
  ELEVATION,
  STANDARD_BORDER_RADIUS,
  TEXT,
  TRANSITION,
} from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

type ContainerProps = {
  isFilled?: boolean;
  isDisabled?: boolean;
  isBig?: boolean;
  fullWidth?: boolean;
};
const ButtonContainer = styled.button<ContainerProps>`
  ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.isFilled
      ? !props.isDisabled
        ? // Filled and not disabled?
          css`
            background-color: ${COLORS.brand.primary};
            ${ELEVATION.button};
            color: ${COLORS.text.white};
          `
        : // Filled and  disabled?
          css`
            background-color: ${COLORS.ui.ui7};
            color: ${COLORS.text.textGray3};
          `
      : // Not and  disabled?
        css`
          color: ${COLORS.text.textGray2};
        `}

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

  ${TRANSITION};
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
    <ButtonContainer
      {...containerProps}
      type="button"
      onClick={onClick}
      disabled={containerProps.isDisabled}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
