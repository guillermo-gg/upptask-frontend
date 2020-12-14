import { css, FlattenSimpleInterpolation } from "styled-components";
import {
  NARROW_CONTAINER_SIZE,
  SMALL_SCREEN_SIZE,
  WIDE_CONTAINER_SIZE,
} from "./constants";

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

export const wideInnerContainerWidth = css`
  width: 100%;
  max-width: ${WIDE_CONTAINER_SIZE}px;
`;

export const narrowInnerContainerWidth = css`
  width: 100%;
  max-width: ${NARROW_CONTAINER_SIZE}px;
`;

export const screenSizeQuery = (
  styles: FlattenSimpleInterpolation,
  maxSize: number
) => css`
  @media screen and (max-width: ${maxSize}px) {
    ${styles};
  }
`;

/**
 * @param {styled.css} styles
 * @param {number} offset - how much, in pixels, to increase the query
 * threshold.
 */
export const smallScreenQuery = (
  styles: FlattenSimpleInterpolation,
  offset?: number
) => screenSizeQuery(styles, SMALL_SCREEN_SIZE + (offset ?? 0));

export const narrowContainerQuery = (
  styles: FlattenSimpleInterpolation,
  offset?: number
) => screenSizeQuery(styles, NARROW_CONTAINER_SIZE + (offset ?? 0));

export const wideContainerQuery = (
  styles: FlattenSimpleInterpolation,
  offset?: number
) => screenSizeQuery(styles, WIDE_CONTAINER_SIZE + offset ?? 0);
