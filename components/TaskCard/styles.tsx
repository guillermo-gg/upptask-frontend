import styled, { FlattenSimpleInterpolation } from "styled-components";

export const TaskCardContainer = styled.li<{
  styles?: FlattenSimpleInterpolation;
}>`
  ${({ styles }) => styles};
  margin-bottom: 20px;
  height: 75px;
`;

export const CARD_CONSTANTS = {
  borderRadius: "10px",
};
