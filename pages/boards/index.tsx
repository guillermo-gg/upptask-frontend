import { AddItemCard } from "components/Card";
import BoardCard from "components/Card/BoardCard";
import { CardSize } from "components/Card/styles";
import { BoardOptionsModal } from "components/Modal";
import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";

import { boardContext } from "context/board/board.context";
import { useRouter } from "next/router";
import React, { FunctionComponent, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { useImmer } from "use-immer";

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <PrivateContainer.Content
        header={{
          type: HeaderTypes.REGULAR,
          title: "Your boards",
          description: "Select a board, or create one",
        }}
      >
        <BoardsGrid>
          {boards.map(({ title, description, id, lastUsed }) => (
            <BoardCard
              title={title}
              description={description}
              key={id}
              containerStyles={cardStyles}
              onClick={() => router.push(`${router.pathname}/${id}`)}
              lastUsed={lastUsed}
            />
          ))}
          <AddItemCard
            onClickAdd={() => setIsModalVisible(true)}
            size={CardSize.MEDIUM}
          />
        </BoardsGrid>
      </PrivateContainer.Content>
      <BoardOptionsModal
        onClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}
      />
    </>
  );
};

export default Boards;
