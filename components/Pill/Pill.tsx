import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { COLORS, TEXT } from "styles/constants";

const PillContainer = styled.span`
  opacity: 0.85;
  ${TEXT.labelExtraSmall};
  color: ${COLORS.text.textGray1};
  background-color: ${COLORS.brand.accent};
  border-radius: 15px;
  padding: 2px 10px;
`;

type PillProps = {};
const Pill: FunctionComponent<PillProps> = ({ children }) => {
  return <PillContainer>{children}</PillContainer>;
};

export default Pill;
