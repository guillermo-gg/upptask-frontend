import { AddItemCard } from "components/Card";
import BoardCard from "components/Card/BoardCard";
import { CardSize } from "components/Card/styles";
import { Modal } from "components/Modal";
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

  const { boards, createBoard } = useContext(boardContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInputs, updateModalInputs] = useImmer({
    title: "",
    description: "",
  });

  const updateTitle = (newValue: string) => {
    updateModalInputs((draft) => {
      draft.title = newValue;
    });
  };

  const updateDescription = (newValue: string) => {
    updateModalInputs((draft) => {
      draft.description = newValue;
    });
  };

  const resetInputs = () => {
    updateModalInputs((draft) => {
      draft.title = "";
      draft.description = "";
    });
  };

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

      <Modal
        onClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}
        title="Add new board"
        buttonPrimary={{
          text: "Save",
          onClick: () => {
            createBoard(modalInputs).then(() => {
              resetInputs();
              setIsModalVisible(false);
            });
          },
          disabled: !modalInputs.title,
        }}
        buttonSecondary={{
          text: "Cancel",
          onClick: () => setIsModalVisible(false),
        }}
      >
        <Modal.Input
          value={modalInputs.title}
          setValue={updateTitle}
          placeholder="Title"
          label="Title"
        />
        <Modal.Input
          value={modalInputs.description}
          setValue={updateDescription}
          placeholder="Description"
          label="Description"
          isTextArea
        />
      </Modal>
    </>
  );
};

export default Boards;
