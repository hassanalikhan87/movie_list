export const getToken = (): string | null => {
  try {
    const sessionStorageToken = sessionStorage.getItem('authToken');
    const localStorageToken = localStorage.getItem('authToken');

    const token = sessionStorageToken ?? localStorageToken;
    return token;
  } catch (error) {
    console.error('Error accessing storage:', error);
    return null;
  }
};
