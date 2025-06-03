const ProjectModel = require("../../models/projectModel");
const { formatResponse } = require("../../utils/helper");

const getAllProject = async (req, res) => {
    try {
        const projects = await ProjectModel.getAllProjects();
        res.status(200).json(formatResponse('success', 'Projects retrieved successfully', projects));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = getAllProject;