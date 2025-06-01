import api from "./api";

export const getStatus = async (userId) => {
  try {
    const response = await api.post(`/api/users/me`, { id: userId });
    // console.log(response.data)
    if(response?.data?.status === 'success') return 'Connected'
    else if(response?.data?.data === 'Invalid token') return 'Expired'
    else return 'Disconnected'
  } catch (error) {
    if(error?.response?.data?.data?.includes('Invalid token')) {
      return 'Expired';
    }
    // console.log(error);
    return 'Disconnected';
  }
};