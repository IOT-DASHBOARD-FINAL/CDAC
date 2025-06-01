import axios from 'axios';
import { getAuthHeader } from './auth';
import getBackendUrl from './checkBackend';

const getApiInstance = async () => {
  const API_URL = await getBackendUrl();

  return axios.create({
    baseURL: API_URL,
  });
};

const api = await getApiInstance();

api.interceptors.request.use(
  (config) => {
    const headers = getAuthHeader();
    if (headers) {
      config.headers = { ...config.headers, ...headers };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;