const ProjectModel = require("../../models/projectModel");
const UserModel = require("../../models/userModel");
const { formatResponse } = require("../../utils/helper");
const Joi = require('joi');

const getProjectByUserId = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    const userExists = await UserModel.findById(value.id);
    if(!userExists){
        return res.status(404).json(formatResponse('error', 'User not found', null));
    }

    try {
        const projects = await ProjectModel.findByUserId(value.id);
        res.status(200).json(formatResponse('success', 'Projects retrieved successfully', projects));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = getProjectByUserId;