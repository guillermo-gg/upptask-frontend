import { css } from "styled-components";

export const COLORS = {
  elements: {
    headline: "#1f1235",
    subHeadline: "#1b1425",
    button: "#ff6e6c",
    buttonText: "#1f1235",
  },
  illustration: {
    stroke: "#1f1235",
    main: "#FFFFFF",
    highlight: "#ff6e6c",
    secondary: "#67568c",
    tertiary: "#fbdd74",
  },
  background: {
    base: "#f3f3f3",
    border: "#b8b8b8",
    fillLight: "#d4d4d4",
    fillDark: "#989898",
  },
};

export const ELEVATION = {
  low: css`
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.25);
  `,
  focus: css`
    box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.25);
  `,
};

export const TEXT = {
  title: css`
    font-size: 2.5rem;
    font-weight: 600;
  `,
};

export const TRANSITION = css`
  transition: 0.2s all ease;
`;

export const TRANSPARENT = "rgba(255, 255, 255, 0)";

export const FONT_FAMILY = "Roboto, sans-serif";
