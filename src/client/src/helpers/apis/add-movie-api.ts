import axios from 'axios';
import { getToken } from '../get-refresh-token';
import { ADD_UPDATE_MOVIE_PATH, API_HOST } from '../api.config';

export const addMovieApi = async (
  title: string,
  publishingYear: string,
  poster: File,
) => {
  const token = getToken();
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
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to add movie');
  }
};
