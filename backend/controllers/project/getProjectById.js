const ProjectModel = require("../../models/projectModel");
const { formatResponse } = require("../../utils/helper");
const Joi = require('joi');

const getProjectById = async (req, res) => {
    const schema = Joi.object({
        projectId: Joi.number().integer().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    const { id } = req.body;
    try {
        const project = await ProjectModel.findProjectById(value.projectId);
        if (!project) {
            return res.status(404).json(formatResponse('error', 'Project not found'));
        }
        res.status(200).json(formatResponse('success', 'Project retrieved successfully', project));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = getProjectById;