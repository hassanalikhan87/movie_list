// src/components/common/ErrorMessage.tsx
import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/styles/color';
import { TYPOGRAPHY } from '../../constants/styles/typography';

interface FormErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => (
  <ErrorText>{message}</ErrorText>
);

export default ErrorMessage;

const ErrorText = styled.p`
  ${TYPOGRAPHY.caption}
  background-color: transparent;
  color: ${COLOR.error};
  margin-top: 20px;
`;
