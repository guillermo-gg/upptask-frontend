import BoardCard from "components/Card/BoardCard";
import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import { boardContext } from "context/board/board.context";
import { useRouter } from "next/router";
import React, { FunctionComponent, useContext } from "react";
import styled, { css } from "styled-components";

const BoardsGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-right: -25px;
`;

const cardStyles = css`
  margin-right: 25px;
  margin-bottom: 25px;
`;

type BoardsProps = {};
const Boards: FunctionComponent<BoardsProps> = () => {
  const router = useRouter();

  const { boards } = useContext(boardContext);

  return (
    <PrivateContainer.Content
      header={{
        type: HeaderTypes.REGULAR,
        title: "Your boards",
        description: "Select a board, or create one",
      }}
    >
      <BoardsGrid>
        {boards.map(({ title, description, id }) => (
          <BoardCard
            title={title}
            description={description}
            key={id}
            containerStyles={cardStyles}
            onClick={() => router.push(`${router.pathname}/${id}`)}
          />
        ))}
      </BoardsGrid>
    </PrivateContainer.Content>
  );
};

export default Boards;
