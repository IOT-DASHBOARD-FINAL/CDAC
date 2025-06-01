import api from "@/utils/api";

// Send sensor data (For input switch)
export const sendSensorData = async (projectId, sensorId, data) => {
    try {
        const response = await api.post(`/api/projects/${projectId}/sensor/${sensorId}/sendData`, data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to send sensor data:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: null,
        };
        return response;
    }
}

// Receive sensor data (For output)
export const receiveSensorData = async (projectId, sensorId, userId) => {
    try {
        const response = await api.post(`/api/projects/${projectId}/sensor/${sensorId}/getData`, { id : userId });
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to receive sensor data:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: null,
        };
        return response;
    }
}

// Delete single sensor data
export const deleteSensorData = async (projectId, sensorId, dataId, userId) => {
    try {
        const response = await api.delete(`/api/projects/${projectId}/sensor/${sensorId}/deleteData/${dataId}`, { data: {id: userId }});
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to delete sensor data:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: null,
        };
        return response;
    }
}

// Delete multiple sensor data
export const deleteMultipleSensorData = async (projectId, sensorId, userId, ids) => {
    try {
        const response = await api.delete(`/api/projects/${projectId}/sensor/${sensorId}/deleteData`, {
            id: userId,
            ids: ids,
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to delete sensor data:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: null,
        };
        return response;
    }
}