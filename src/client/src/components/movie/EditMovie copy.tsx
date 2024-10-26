import React, { useState, useRef } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { SPACING } from '../../constants/styles/spacing';
import Heading from '../common/MainHeading';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
import { iconByName } from '../icons/Index';
import { TYPOGRAPHY } from '../../constants/styles/typography';
import { COLOR } from '../../constants/styles/color';
import TextInput from '../common/TextInput';
import { useLocation, useNavigate } from 'react-router-dom';

const EditMovie2: React.FC = () => {
  const [title, setTitle] = useState('');
  const [publishingYear, setPublishingYear] = useState('');
  const [poster, setPoster] = useState<File | null>(null);
  const [errorMessage, setMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { id } = location.state;

  const UploadIcon = iconByName['upload'];

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPoster(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPoster(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    e.preventDefault();

    if (!title || !publishingYear || !poster) {
      setMessage('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('publishingYear', publishingYear);
    formData.append('poster', poster);

    try {
      const response = await axios.put(
        `http://localhost:9000/api/movies/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      );
      if (response.data) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error adding movie');
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <Wrapper>
      <Container>
        <Heading tag="h2" title="Create a new movie " />
        <SubContainer>
          <DragContainer className="drag-drop-area">
            <Drag
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
              $dragActive={dragActive}
            >
              <label>
                <UploadIcon />
              </label>
              <input
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the default file input
              />
              <DragText>
                {poster ? poster.name : 'Upload an image here'}
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              </DragText>
            </Drag>
          </DragContainer>
          <Form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              charWidth={45}
            />
            <TextInput
              type="text"
              placeholder="Publishing year"
              value={publishingYear}
              onChange={(e) => setPublishingYear(e.target.value)}
              required
              charWidth={25}
            />
            <DragContainerMobile className="drag-drop-area">
              <Drag
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
                $dragActive={dragActive}
              >
                <label>
                  <UploadIcon />
                </label>
                <input
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }} // Hide the default file input
                />
                <DragText>
                  {poster ? poster.name : 'Upload an image here'}
                </DragText>
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              </Drag>
            </DragContainerMobile>
            <div>
              <button type="submit">Add Movie</button>
            </div>
          </Form>
        </SubContainer>
      </Container>
    </Wrapper>
  );
};

export default EditMovie2;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 120px);
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${SPACING.s11} ${SPACING.s6} 0;
  width: 100%;
  max-width: 1200px;
  ${MEDIA_QUERY.above.desktop} {
    padding: 0 ${SPACING.s12};
    margin: ${SPACING.s12} 0 0 0;
  }
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: ${SPACING.s11} 0 0 0;
  ${MEDIA_QUERY.above.desktop} {
    margin: ${SPACING.s12} 0 0 0;
  }
`;

const DragContainer = styled.div`
  display: none;
  height: 50vh;
  color: ${COLOR.white};
  ${MEDIA_QUERY.above.desktop} {
    display: block;
    flex: 1;
  }
`;

const Drag = styled.div<{ $dragActive: boolean }>`
  height: 100%;
  background-color: ${COLOR.input};
  border: 2px dashed ${COLOR.white};
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

const ErrorText = styled.p`
  ${TYPOGRAPHY.caption}
  background-color: transparent;
  color: ${COLOR.error};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${MEDIA_QUERY.above.desktop} {
    flex: 1;
  }
`;

const DragContainerMobile = styled.div`
  height: 37vh;
  color: white;
  ${MEDIA_QUERY.above.desktop} {
    display: none;
    flex: 1;
  }
`;
