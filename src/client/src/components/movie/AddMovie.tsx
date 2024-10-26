import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovieApi } from '../../helpers/apis/add-movie-api';
import AddOrUpdatMovieForm from '../common/AddOrUpdatMovieForm';

const fields = [
  {
    name: 'title',
    label: 'Title',
    type: 'text' as const,
    placeholder: 'Enter the movie title',
    required: true,
    charWidth: 45

  },
  {
    name: 'publishingYear',
    label: 'Publishing Year',
    type: 'text' as const,
    placeholder: 'Enter the publishing year',
    required: true,
    charWidth: 25
  },
  {
    name: 'poster',
    label: 'Poster',
    type: 'file' as const,
    required: true,
  },
];

const AddMovie: React.FC = () => {
const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {

    try {
      await addMovieApi(
        formData.get('title') as string,
        formData.get('publishingYear') as string,
        formData.get('poster') as File
      );
      navigate('/');
    } catch (error) {
      setErrorMessage('Error adding movie')
      console.error('Error adding movie', error);
    }
  };


  const handleCancel = () => {
    navigate('/');
  };

  return (
    <AddOrUpdatMovieForm
      title="Create a New Movie"
      fields={fields}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      errorMessage={errorMessage}
    />
  );
};

export default AddMovie;
