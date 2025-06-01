import { Content } from "@radix-ui/react-dialog";

export const saveToken = (token) => {
  localStorage.setItem('jwtToken', token);
};

export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getAuthHeader = () => {
  const token = getToken();
  return token ? { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}` 
  } : {};
};