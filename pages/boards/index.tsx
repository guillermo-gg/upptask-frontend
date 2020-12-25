import { PrivateContainer } from "components/PrivateContainer";
import { HeaderTypes } from "components/PrivateContainer/Header";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { flexFullCenterColumn } from "styles/mixins";

type BoardsProps = {};
const Boards: FunctionComponent<BoardsProps> = (props) => {
  return (
    <PrivateContainer.Content
      header={{
        type: HeaderTypes.REGULAR,
        title: "Your boards",
        description: "Select a board, or create one",
      }}
    >
      Actual content
    </PrivateContainer.Content>
  );
};

export default Boards;
