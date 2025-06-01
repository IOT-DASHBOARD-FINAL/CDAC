import api from "@/utils/api";

// create sensor
export const createSensor = async (projectId, data) => {
  try {
    const response = await api.post(`/api/projects/${projectId}/sensor/create`, data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.error("Failed to create sensor:", errorMessage);
    const response = {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data?.data,
    };
    return response;
  }
};

// get sensor by sensorId
export const getSensorById = async (projectId, sensorId, userId) => {
    try{
        const response = await api.post(`/api/projects/${projectId}/sensor/get/${sensorId}`, { id: userId });
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to get sensor:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: error.response.data?.data,
        };
        return response;
    }
}

// get sensor by projectId
export const getSensorByProjectId = async (projectId, userId) => {
    try {
        const response = await api.post(`/api/projects/${projectId}/sensor/getByProject`, { id: userId });
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to get sensor:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: error.response.data?.data,
        };
        return response;
    }
}

// get all sensors
export const getAllSensors = async (projectId, userId) => {
    try {
        const response = await api.post(`/api/projects/${projectId}/sensor/getAll`, { id: userId });
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to get sensor:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: error.response.data?.data,
        };
        return response;
    }
}

// update sensor
export const updateSensor = async (projectId, sensorId, data) => {
    try {
        const response = await api.patch(`/api/projects/${projectId}/sensor/update/${sensorId}`, data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to update sensor:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: error.response.data?.data,
        };
        return response;
    }
}

// delete sensor
export const deleteSensor = async (projectId, sensorId, userId) => {
    try {
        const response = await api.delete(`/api/projects/${projectId}/sensor/delete/${sensorId}`, {
            data: { id: userId }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        console.error("Failed to delete sensor:", errorMessage);
        const response = {
            status: error.response.status,
            message: errorMessage,
            data: error.response.data?.data,
        };
        return response;
    }
}


