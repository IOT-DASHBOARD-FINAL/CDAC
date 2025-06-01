import api from "@/utils/api";

// Create a new project
export const createProjects = async (data) => {
  try {
    const response = await api.post("/api/projects/create", data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.error("Failed to create project:", errorMessage);
    const response = {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data?.data,
    };
    return response;
  }
};

// Read all projects by using userId
export const getProjectsByUserId = async (userId) => {
  try {
    const response = await api.post(`/api/projects/getByUser/${userId}`);
    const projects = response.data;

    return projects;
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.error("Failed to fetch projects:", errorMessage);
    const response = {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data?.data,
    };
    return response;
  }
};

// Read all projects
export const getAllProjects = async (id) => {
  try {
    const response = await api.post("/api/projects/getAll", { id: id });
    const projects = response.data?.data;

    return projects;
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.error("Failed to fetch projects:", errorMessage);
    const response = {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data?.data,
    };
    return response;
  }
};

// Read a project by using projectId
export const getProjectById = async (projectId, userId) => {
  try {
    const response = await api.post(`/api/projects/get/${projectId}`, {
      id: userId,
    });
    const projects = response.data;

    return projects;
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.error("Failed to fetch projects:", errorMessage);
    const response = {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data?.data,
    };
    return response;
  }
};

// Update a project
export const updateProject = async (projectId, userId, data) => {
  try {
    const response = await api.patch(`/api/projects/update/${projectId}`, {
      id: userId,
      ...data,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.error("Failed to update projects:", errorMessage);
    const response = {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data?.data,
    };
    return response;
  }
};

// Delete a project
export const deleteProject = async (projectId, userId) => {
  try {
    const response = await api.delete(`/api/projects/delete/${projectId}`, {
      data: { id: userId }
  });
    return response.data;
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.error("Failed to delete projects:", errorMessage);
    const response = {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data?.data,
    };
    return response;
  }
};
