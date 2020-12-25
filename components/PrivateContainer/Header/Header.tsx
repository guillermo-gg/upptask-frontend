import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { COLORS, TEXT } from "styles/constants";

export enum HeaderTypes {
  BIG,
  REGULAR,
}

type HeaderOptions = {
  type?: HeaderTypes;
};

const Container = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1<HeaderOptions>`
  ${({ type }) => (type === HeaderTypes.BIG ? TEXT.header : TEXT.subheader)};
  margin-bottom: 1rem;
`;

const Description = styled.div<HeaderOptions>`
  ${({ type }) => (type === HeaderTypes.BIG ? TEXT.labelBig : TEXT.paragraph)};
  color: ${COLORS.text.textGray2};
`;

type HeaderContentProps = {
  title: string;
  description?: string;
};

export interface HeaderProps extends HeaderOptions, HeaderContentProps {}
const Header: FunctionComponent<HeaderProps> = ({
  title,
  description,
  type,
}) => {
  return (
    <Container>
      <Title type={type}>{title}</Title>
      <Description type={type}>{description ?? ""}</Description>
    </Container>
  );
};

export default Header;
