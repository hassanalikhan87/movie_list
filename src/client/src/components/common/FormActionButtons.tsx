import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import { SPACING } from '../../constants/styles/spacing';
import { MEDIA_QUERY } from '../../constants/styles/media-query';

interface FormActionButtonsProps {
  onCancel: () => void;
}

const FormActionButtons: React.FC<FormActionButtonsProps> = ({ onCancel }) => (
  <Container>
    <Button
      type="button"
      variant="secondary"
      children="Cancel"
      fullWidth
      onClick={onCancel}
    />
    <Button type="submit" variant="primary" fullWidth children="Submit" />
  </Container>
);

export default FormActionButtons;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${SPACING.s8};
  width: 100%;
  gap: 16px;
  ${MEDIA_QUERY.above.desktop} {
    width: calc(44ch + 16px);
    margin: 0;
  }
`;
