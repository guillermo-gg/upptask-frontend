import Link from "next/link";
import React, { FunctionComponent } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

type WrapperProps = {
  localHref?: string;
  onClick?: () => void;
};

const StyledAnchor = styled.a<{ styles?: FlattenSimpleInterpolation }>`
  ${({ styles }) => styles};

  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button<{ styles?: FlattenSimpleInterpolation }>`
  ${({ styles }) => styles};
`;

export const getButtonWrapper = (
  wrapper: "a" | "button",
  wrapperStyles?: FlattenSimpleInterpolation
): FunctionComponent<WrapperProps> => ({ children, localHref }) => {
  return wrapper === "a" ? (
    <Link href={localHref}>
      <StyledAnchor styles={wrapperStyles}>{children}</StyledAnchor>
    </Link>
  ) : (
    <StyledButton type="button" styles={wrapperStyles}>
      {children}
    </StyledButton>
  );
};
