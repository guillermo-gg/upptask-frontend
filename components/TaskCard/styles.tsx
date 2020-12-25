import styled, { FlattenSimpleInterpolation } from "styled-components";

export const TaskCardContainer = styled.li<{
  styles?: FlattenSimpleInterpolation;
}>`
  margin-bottom: 20px;
  height: 75px;
  ${({ styles }) => styles};
`;
