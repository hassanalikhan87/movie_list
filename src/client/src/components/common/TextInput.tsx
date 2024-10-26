import React from 'react';
import styled, { css } from 'styled-components';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { COLOR } from '../../constants/styles/color';
import { SPACING } from '../../constants/styles/spacing';
import { MEDIA_QUERY } from '../../constants/styles/media-query';

interface TextInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  charWidth?: number
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  charWidth
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      $charWidth={charWidth}
    />
  );
};

export default TextInput;

const StyledInput = styled.input<{ $charWidth?: number }>`
  margin-bottom: ${SPACING.s6};
  padding: 10px ${SPACING.s5};
  line-height: ${SPACING.s6};
  border-radius: 10px;
  border: none;
  background-color: ${COLOR.input};
  color: ${COLOR.white};
  width: calc(100% - 32px);

  &::-webkit-input-placeholder {
    ${TYPOGRAPHY.caption}
    color: ${COLOR.white};
  }
  &::-moz-placeholder {
    ${TYPOGRAPHY.caption}
    color: ${COLOR.white};
  }
  &:-ms-input-placeholder {
    ${TYPOGRAPHY.caption}
    color: ${COLOR.white};
  }
  &::placeholder {
    ${TYPOGRAPHY.caption}
    color: ${COLOR.white};
  }
  ${MEDIA_QUERY.above.desktop} {
    ${({ $charWidth }) =>
      $charWidth &&
      css`
        width: ${$charWidth}ch;
      `}
  }
`;
