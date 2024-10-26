import React from 'react';
import styled, { css } from 'styled-components';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { SPACING } from '../../constants/styles/spacing';
import { COLOR } from '../../constants/styles/color';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  variant = 'primary',
  fullWidth = false,
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $variant={variant}
      $fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary';
  $fullWidth: boolean;
}>`
  ${TYPOGRAPHY.h6}
  padding: ${SPACING.s4} ${SPACING.s5};
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: ${COLOR.primary};
      color: ${COLOR.white};
      &:hover {
        opacity: 0.8;
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: transparent;
      border: 1px solid ${COLOR.white};
      color: ${COLOR.white};
      &:hover {
        opacity: 0.8;
      }
    `}
`;
