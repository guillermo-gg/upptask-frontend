import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import {
  COLORS,
  STANDARD_BORDER_RADIUS,
  TEXT,
  TRANSITION,
} from "styles/constants";

const InputContainer = styled.label`
  width: 75%;
`;

const Label = styled.div`
  ${TEXT.labelExtraSmall};
  color: ${COLORS.text.textGray1};
  text-transform: uppercase;
  padding-left: ${STANDARD_BORDER_RADIUS};
  margin-bottom: ${STANDARD_BORDER_RADIUS};
`;

const textContainerStyles = css`
  width: 100%;
  ${TEXT.labelSmall};
  padding: 12px;
  outline: none;

  ${TRANSITION};

  border: 1px solid ${COLORS.ui.ui6};
  border-radius: ${STANDARD_BORDER_RADIUS};

  &:focus {
    border: 1px solid ${COLORS.brand.primary};
  }

  &::placeholder {
    color: ${COLORS.ui.ui6};
  }
`;

const Input = styled.input`
  ${textContainerStyles}
`;

const TextArea = styled.textarea`
  ${textContainerStyles};
  max-height: 125px;
  font-family: inherit;
  resize: none;
`;

export type TextInputProps = {
  isTextArea?: boolean;
  placeholder?: string;
  label?: string;
  value: string;
  setValue: (newValue: string) => void;
};
const TextInput: FunctionComponent<TextInputProps> = ({
  label,
  isTextArea,
  placeholder,
  value,
  setValue,
}) => {
  const textProps = {
    placeholder,
    value,
    onChange: ({ target: { value: newValue } }) => setValue(newValue),
  };

  return (
    <InputContainer>
      <Label>{label}</Label>
      {isTextArea ? <TextArea {...textProps} /> : <Input {...textProps} />}
    </InputContainer>
  );
};

export default TextInput;
