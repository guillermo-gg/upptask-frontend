import { css, FlattenSimpleInterpolation } from "styled-components";

export const flexCenterColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const flexFullCenterColumn = css`
  ${flexCenterColumn};
  justify-content: center;
`;

export const flexCenterRow = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const flexFullCenterRow = css`
  ${flexCenterRow};
  justify-content: center;
`;

export const screenSizeQuery = (
  styles: FlattenSimpleInterpolation,
  maxSize: number
) => css`
  @media screen and (max-width: ${maxSize}px) {
    ${styles};
  }
`;
