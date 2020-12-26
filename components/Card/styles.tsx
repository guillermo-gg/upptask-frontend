import styled, { FlattenSimpleInterpolation } from "styled-components";

export enum CardSize {
  SMALL,
  MEDIUM,
}

export const CardContainer = styled.li<{
  styles?: FlattenSimpleInterpolation;
  size?: CardSize;
}>`
  margin-bottom: 20px;
  height: ${({ size }) => (size === CardSize.MEDIUM ? "185px" : "75px")};
  width: ${({ size }) => (size === CardSize.MEDIUM ? "300px" : "250px")};
  ${({ styles }) => styles};
`;
