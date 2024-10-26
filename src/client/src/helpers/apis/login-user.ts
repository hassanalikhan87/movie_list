import axios from 'axios';
import { API_HOST, AUTH_PATH } from '../api.config';

export const loginUser = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    const response = await axios.post(`${API_HOST}/${AUTH_PATH}`, {
      email,
      password,
    });
    return response.data.token;
  } catch (err) {
    throw new Error('Login failed. Please check your credentials.');
  }
};
