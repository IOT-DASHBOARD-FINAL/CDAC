import axios from 'axios';

const checkBackend = async (urls) => {
  for (const url of urls) {
    try {
      await axios.get(`${url}/health`, { timeout: 3000 });
      // console.log(`Backend is reachable at: ${url}`);
      return url;
    } catch (error) {
      // console.warn(`Backend not reachable at: ${url}`);
    }
  }
  throw new Error('No backend URL is reachable.');
};

const getBackendUrl = async () => {
  const urls = [
    import.meta.env.VITE_APP_BACKEND_URL,
    import.meta.env.VITE_APP_VM,
    import.meta.env.VITE_APP_SERVER,
  ];
  return await checkBackend(urls);
}

export default getBackendUrl;