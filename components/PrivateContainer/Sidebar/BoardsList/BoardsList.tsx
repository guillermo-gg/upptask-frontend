import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { COLORS, STANDARD_BORDER_RADIUS, TEXT } from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

const SectionTitle = styled.div`
  ${TEXT.labelMedium};
  color: ${COLORS.brand.accent};
  margin-bottom: 15px;
`;

const BoardButton = styled.button`
  width: 100%;
  ${flexFullCenterRow};
  height: 45px;
  color: white;
  border-radius: ${STANDARD_BORDER_RADIUS};

  &:hover {
    background-color: ${COLORS.ui.ui5};
  }
`;

type BoardsListProps = {
  boards: {
    label: string;
    id: string;
  }[];
};
const BoardsList: FunctionComponent<BoardsListProps> = ({ boards }) => {
  return (
    <>
      <SectionTitle>Your boards</SectionTitle>
      {boards.map(({ label, id }) => (
        <BoardButton key={id} type="button">
          {label}
        </BoardButton>
      ))}
    </>
  );
};

export default BoardsList;
