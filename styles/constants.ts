import { css } from "styled-components";

export const COLORS = {
  brand: {
    primary: "#001F69",
    accent: "#FFCD28",
  },
  text: {
    textDark: "#00113A",
    textGray: "#626775",
    white: "#FFFFFF",
  },
  ui: {
    ui1: "#F5F6F8",
    ui2: "#F5F7FF",
    ui3: "#E2E5EE",
    ui4: "#E2E5EE",
  },
};

export const ELEVATION = {
  button: css`
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  `,
  low: css`
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.25);
  `,
  focus: css`
    box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.25);
  `,
};

export const TEXT = {
  hero: css`
    font-size: 6rem;
    font-weight: bold;
  `,
  header: css`
    font-size: 4rem;
    font-weight: bold;
  `,
  subheader: css`
    font-size: 2rem;
    font-weight: 500;
  `,
  paragraph: css`
    font-size: 1.1rem;
    font-weight: normal;
  `,
  labelBig: css`
    font-size: 1.4rem;
    font-weight: normal;
  `,
  labelMedium: css`
    font-size: 1.2rem;
    font-weight: normal;
  `,
  labelSmall: css`
    font-size: 1rem;
    font-weight: normal;
  `,
  navLink: css`
    font-size: 1.1rem;
    font-weight: 500;
  `,
};

export const TRANSITION = css`
  transition: 0.2s all ease;
`;

export const STANDARD_BORDER_RADIUS = "10px";

export const TRANSPARENT = "rgba(255, 255, 255, 0)";

export const FONT_FAMILY = "Roboto, sans-serif";
