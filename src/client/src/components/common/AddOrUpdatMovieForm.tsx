import React, { useState, FormEvent } from 'react';
import styled, { css } from 'styled-components';
import { SPACING } from '../../constants/styles/spacing';
import { MEDIA_QUERY } from '../../constants/styles/media-query';
import TextInput from './TextInput';
import FileDropZone from './FileDropZone';
import FormActionButtons from './FormActionButtons';
import Heading from './MainHeading';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'file';
  placeholder?: string;
  required?: boolean;
  charWidth?: number;
}

interface AddOrUpdatMovieFormProps {
  title: string;
  fields: Field[];
  onSubmit: (formData: FormData) => Promise<void>;
  errorMessage: string;
  onCancel: () => void;
}

const AddOrUpdatMovieForm: React.FC<AddOrUpdatMovieFormProps> = ({
  title,
  fields,
  errorMessage,
  onSubmit,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileSelect = (file: File) => {
    setFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    fields.forEach((field) => {
      if (field.type === 'file' && file) {
        formData.append(field.name, file);
      } else if (formValues[field.name]) {
        formData.append(field.name, formValues[field.name]);

      }
    });

    try {
      await onSubmit(formData);
    } catch (error) {
    }
  };

  return (
    <Wrapper>
      <Container>
        <Heading tag="h2" title={title} />
        <Form onSubmit={handleSubmit}>
          <DesktopLayout>
            <FileDropZoneWrapper>
              <FileDropZone
                onFileSelect={handleFileSelect}
                errorMessage={errorMessage}
              />
            </FileDropZoneWrapper>
            <FormFields>
              {fields.map((field) =>
                field.type === 'text' ? (
                  <TextInput
                    key={field.name}
                    type="text"
                    placeholder={field.placeholder || ''}
                    value={formValues[field.name] || ''}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    charWidth={field.charWidth}
                    required={field.required}
                  />
                ) : null,
              )}
              <FormActionButtons onCancel={onCancel} />
            </FormFields>
          </DesktopLayout>

          <MobileLayout>
            {fields.map((field) =>
              field.type === 'text' ? (
                <TextInput
                  key={field.name}
                  type="text"
                  placeholder={field.placeholder || ''}
                  value={formValues[field.name] || ''}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  required={field.required}
                />
              ) : null,
            )}
            <FileDropZoneWrapper>
              <FileDropZone
                onFileSelect={handleFileSelect}
                errorMessage={errorMessage}
              />
            </FileDropZoneWrapper>
            <FormActionButtons onCancel={onCancel} />
          </MobileLayout>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default AddOrUpdatMovieForm;

// Styled components for layouts

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${SPACING.s11};
  ${MEDIA_QUERY.above.desktop} {
    margin-top: ${SPACING.s12};
  }
`;

const DesktopLayout = styled.div`
  display: none;
  ${MEDIA_QUERY.above.desktop} {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const MobileLayout = styled.div`
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY.above.desktop} {
    display: none;
  }
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FileDropZoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 37vh;
  ${MEDIA_QUERY.above.desktop} {
    flex: 1;
    height: 50vh;
  }
`;
