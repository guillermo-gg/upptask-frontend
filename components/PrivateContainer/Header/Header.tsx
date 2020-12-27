import { IconButton } from "components/Button";
import React, { FunctionComponent, ReactNode } from "react";
import styled, { css } from "styled-components";
import { COLORS, TEXT, TRANSITION } from "styles/constants";

export enum HeaderTypes {
  BIG,
  REGULAR,
}

type HeaderOptions = {
  type?: HeaderTypes;
};

const Container = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h1<HeaderOptions>`
  ${({ type }) => (type === HeaderTypes.BIG ? TEXT.header : TEXT.subheader)};
  margin-bottom: ${({ type }) =>
    type === HeaderTypes.BIG ? "1rem" : "0.5rem"};
`;

const ButtonsContainer = styled.div`
  & > * {
    ${TRANSITION};
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }

    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`;

interface DescriptionProps extends HeaderOptions {
  isPlaceholder?: boolean;
}
const Description = styled.div<DescriptionProps>`
  ${({ type }) => (type === HeaderTypes.BIG ? TEXT.labelBig : TEXT.paragraph)};
  color: ${COLORS.text.textGray2};

  ${({ isPlaceholder }) =>
    isPlaceholder &&
    css`
      opacity: 0.5;
      font-style: italic;
    `};
`;

type HeaderContentProps = {
  title: string;
  description?: string;
  buttons?: {
    id: string;
    component: ReactNode;
  }[];
};

export interface HeaderProps extends HeaderOptions, HeaderContentProps {}
const Header: FunctionComponent<HeaderProps> = ({
  title,
  description,
  type,
  buttons,
}) => {
  return (
    <Container>
      <div>
        <Title type={type}>{title}</Title>
        <Description type={type} isPlaceholder={!description?.length}>
          {description?.length ? description : "This board has no description"}
        </Description>
      </div>
      {buttons && (
        <ButtonsContainer>
          {buttons.map(({ id, component }) => (
            <React.Fragment key={id}>{component}</React.Fragment>
          ))}
        </ButtonsContainer>
      )}
    </Container>
  );
};

export default Header;
