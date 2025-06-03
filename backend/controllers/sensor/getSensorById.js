const SensorModel = require("../../models/sensorModel");
const ProjectModel = require("../../models/projectModel");
const { formatResponse } = require("../../utils/helper");
const Joi = require('joi');

const getSensorById = async (req, res) => {
    const schema = Joi.object({
        sensorId: Joi.number().integer().required(),
        projectId: Joi.number().integer().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    const { id } = req.body;

    try {
        // Check if project exists
        const projectExists = await ProjectModel.findProjectById(parseInt(value.projectId, 10));
        if (!projectExists) {
            return res.status(404).json(formatResponse('error', 'Project not found'));
        }

        // Check if Sensor exists
        const sensor = await SensorModel.findSensorById(value.sensorId);
        if (!sensor) {
            return res.status(404).json(formatResponse('error', 'Sensor not found'));
        }
        res.status(200).json(formatResponse('success', 'Sensor retrieved successfully', sensor));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = getSensorById;