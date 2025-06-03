const SensorModel = require("../../../models/sensorModel");
const ProjectModel = require("../../../models/projectModel");
const { formatResponse } = require("../../../utils/helper");
const Joi = require('joi');

const getSensorDataByName = async (req, res) => {
    const paramsSchema = Joi.object({
        projectName: Joi.string().required(),
        sensorName: Joi.string().required(),
    });

    const { error: paramsError, value: paramsValue } = paramsSchema.validate(req.params);
    if (paramsError) {
        const formattedError = paramsError.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }
    
    try {
        // Check if project exists
        const projectExists = await ProjectModel.findProjectByName(paramsValue.projectName);
        if (!projectExists) {
            return res.status(404).json(formatResponse('error', 'Project not found'));
        }

        // Check if Sensor exists
        const sensor = await SensorModel.findSensorByName(paramsValue.sensorName);
        if (!sensor) {
            return res.status(404).json(formatResponse('error', 'Sensor not found'));
        }

        const sensorDataByName = await SensorModel.findSensorDataBySensorId(sensor.id);

        req.io.emit('sensorData', sensorDataByName);
        res.status(201).json(formatResponse('success', 'Sensor data received successfully', sensorDataByName));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
};

module.exports = getSensorDataByName;