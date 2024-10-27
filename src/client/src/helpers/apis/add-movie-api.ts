import axios from 'axios';
import { getToken } from '../get-refresh-token';
import { ADD_UPDATE_MOVIE_PATH, API_HOST } from '../api.config';

export const addMovieApi = async (
  title: string,
  publishingYear: string,
  poster: File,
) => {
  const token = getToken(); // Assumes the token already has the 'Bearer ' prefix
  const formData = new FormData();
  formData.append('title', title);
  formData.append('publishingYear', publishingYear);
  formData.append('poster', poster);

  try {
    const response = await axios.post(
      `${API_HOST}/${ADD_UPDATE_MOVIE_PATH}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token, // Should include 'Bearer ' prefix
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to add movie');
  }
};
