import axios from 'axios';
import { API_HOST, Get_PAGINATEDMOVIES_PATH } from '../api.config';
import { getToken } from '../get-refresh-token';

export const fetchMoviesApi = async (page: number, limit: number) => {
  const token = getToken();
  try {
    const response = await axios.get(
      `${API_HOST}/${Get_PAGINATEDMOVIES_PATH}?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: token },
      },
    );
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch movies.');
  }
};
