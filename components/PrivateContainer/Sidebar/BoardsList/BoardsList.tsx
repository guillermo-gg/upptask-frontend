import { getButtonWrapper } from "components/Button";
import React, { FunctionComponent } from "react";
import { BoardT } from "services/board.service";
import styled, { css } from "styled-components";
import { COLORS, STANDARD_BORDER_RADIUS, TEXT } from "styles/constants";
import { flexFullCenterRow } from "styles/mixins";

const SectionTitle = styled.div`
  ${TEXT.labelMedium};
  color: ${COLORS.brand.accent};
  margin-bottom: 15px;
`;

const BoardButton = styled.div`
  width: 100%;
  ${flexFullCenterRow};
  height: 45px;
  color: white;
  border-radius: ${STANDARD_BORDER_RADIUS};

  &:hover {
    background-color: ${COLORS.ui.ui5};
  }
`;

const SectionDivider = styled.div`
  width: 50%;
  height: 1px;
  margin: 10px;
  background-color: ${COLORS.ui.ui5};
  opacity: 0.5;
`;

const buttonWrapperStyles = css`
  width: 100%;
`;

type BoardsListProps = {
  boards: BoardT[];
};
const BoardsList: FunctionComponent<BoardsListProps> = ({ boards }) => {
  const ButtonWrapper = getButtonWrapper("button", buttonWrapperStyles);
  const LinkWrapper = getButtonWrapper("a", buttonWrapperStyles);
  return (
    <>
      <SectionTitle>Your boards</SectionTitle>
      {boards.map(({ title, id }) => (
        <ButtonWrapper onClick={() => alert("label")} key={id}>
          <BoardButton>{title}</BoardButton>
        </ButtonWrapper>
      ))}
      <SectionDivider />
      <LinkWrapper localHref="/boards">
        <BoardButton>See all your boards</BoardButton>
      </LinkWrapper>
    </>
  );
};

export default BoardsList;
