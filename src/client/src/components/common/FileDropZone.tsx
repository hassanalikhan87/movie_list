import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLOR } from '../../constants/styles/color';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { SPACING } from '../../constants/styles/spacing';
import { iconByName } from '../icons/Index';
import FormErrorMessage from './FormErrorMessage';

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  errorMessage?: string;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFileSelect,
  errorMessage,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileNAme, setFileNAme] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const UploadIcon = iconByName['upload'];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
      setFileNAme(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files[0]);
      setFileNAme(e.target.files[0].name);
    }
  };

  return (
    <Drag
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      $dragActive={dragActive}
    >
      <label>
        <UploadIcon />
      </label>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <DragText>{fileNAme ? fileNAme : 'Upload an image here'}</DragText>
      {errorMessage && <FormErrorMessage message={errorMessage} />}
    </Drag>
  );
};

export default FileDropZone;

const Drag = styled.div<{ $dragActive: boolean }>`
  width: 100%;
  background-color: ${COLOR.input};
  border: 2px dashed ${COLOR.white};
  color: ${COLOR.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ $dragActive }) =>
    $dragActive &&
    css`
      opacity: 0.5;
    `}
  ${MEDIA_QUERY.above.desktop} {
    margin-right: ${SPACING.s12};
  }
`;

const DragText = styled.p`
  ${TYPOGRAPHY.bodySM}
  background-color: transparent;
`;
