import { Button } from "components/Button";
import { TextInput } from "components/TextInput";
import { TextInputProps } from "components/TextInput/TextInput";
import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";

import {
  COLORS,
  ELEVATION,
  STANDARD_BORDER_RADIUS,
  TEXT,
} from "styles/constants";
import { flexFullCenterColumn } from "styles/mixins";

const ScreenFiller = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: scroll;
  ${flexFullCenterColumn};
  z-index: 500;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  background-color: ${COLORS.ui.white};
  width: 760px;
  border-radius: ${STANDARD_BORDER_RADIUS};
  z-index: 1000;
  padding: 75px 150px;
  ${flexFullCenterColumn};
  position: relative;
  ${ELEVATION.focus};
`;

const CornerIcon = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  img {
    width: 30px;
    height: auto;
  }
`;

const Title = styled.h3`
  ${TEXT.subheader};
  color: ${COLORS.brand.primary};
  margin-bottom: 45px;
`;

const InputContainer = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;

const ButtonContainer = styled(InputContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input: FunctionComponent<TextInputProps> = (props) => (
  <InputContainer>
    <TextInput {...props} />
  </InputContainer>
);

type ModalButton = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};
type ModalProps = {
  onClose: () => void;
  isVisible: boolean;
  title?: string;
  buttonPrimary?: ModalButton;
  buttonSecondary?: ModalButton;
};
interface ModalComponent extends FunctionComponent<ModalProps> {
  Input: FunctionComponent<TextInputProps>;
}
const Modal: ModalComponent = ({
  onClose,
  isVisible,
  children,
  title,
  buttonPrimary,
  buttonSecondary,
}) => {
  return ReactDOM.createPortal(
    isVisible && (
      <ScreenFiller>
        <OutsideClickHandler onOutsideClick={onClose}>
          <ModalContainer>
            <CornerIcon type="button" onClick={onClose}>
              <img src="/assets/close-icon.svg" alt="Close icon" />
            </CornerIcon>
            {title && <Title>{title}</Title>}
            {children}

            {(!!buttonPrimary || !!buttonSecondary) && (
              <ButtonContainer>
                {!!buttonPrimary && (
                  <Button
                    fullWidth
                    isFilled
                    onClick={buttonPrimary.onClick}
                    isDisabled={buttonPrimary.disabled}
                  >
                    {buttonPrimary.text}
                  </Button>
                )}
                {!!buttonSecondary && (
                  <Button
                    fullWidth
                    onClick={buttonSecondary.onClick}
                    isDisabled={buttonSecondary.disabled}
                  >
                    {buttonSecondary.text}
                  </Button>
                )}
              </ButtonContainer>
            )}
          </ModalContainer>
        </OutsideClickHandler>
      </ScreenFiller>
    ),
    document.body
  );
};

Modal.Input = Input;

export default Modal;
