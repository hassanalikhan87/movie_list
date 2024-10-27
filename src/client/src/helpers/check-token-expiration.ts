import { jwtDecode } from 'jwt-decode';

export const checkTokenExpiration = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
};
