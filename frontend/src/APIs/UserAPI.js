 import api from "@/utils/api"

export const getAllUser = async (id) => {
    try {
        const response = await api.post("/api/users/getAll", { id: id });
        const allUser = response.data;
        return allUser;
    } catch (error) {
        console.log('Failed to retrieve users:', error);
        const response = {
            status: error.response?.status,
            message: error.response?.data?.message,
            data: error.response?.data?.data || [],
        };
        return response;
    }
};

export const updateUser = async (userData) => {
    try {
        if(userData){
            const { createdAt, updatedAt, ...rest } = userData;
            userData = rest;
        }
        const response = await api.patch('/api/users/update', userData);
        // console.log(response.data.message);
        return response.data;
    } catch (error) {
        console.log('Failed to update user:', error);
        return "Failed to update user";
    }
 }

 export const deleteUser = async (userId, deleteId) => {
    try {
        const response = await api.delete(`/api/users/delete/${deleteId}`, {
            data: { id: userId }
        });
        return response.data;
    } catch (error) {
        console.log('Failed to retrieve users:', error);
        const response = {
            status: error.response?.status,
            message: error.response?.data?.message,
            data: error.response?.data?.data || [],
        };
        return response;
    }
 }