const SensorModel = require("../../../models/sensorModel");
const ProjectModel = require("../../../models/projectModel");
const { formatResponse } = require("../../../utils/helper");
const Joi = require('joi');

const deleteMultipleSensorData = async (req, res) => {
    const paramsSchema = Joi.object({
        projectId: Joi.number().integer().required(),
        sensorId: Joi.number().integer().required()
    });

    const { error: paramsError, value: paramsValue } = paramsSchema.validate(req.params);
    if (paramsError) {
        const formattedError = paramsError.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    const bodySchema = Joi.object({
        id: Joi.number().integer().required(),
        ids: Joi.array().items(Joi.number().integer().required()).required()
    });

    const { error: BodyError, value: BodyValue } = bodySchema.validate(req.body);
    if (BodyError) {
        const formattedError = BodyError.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    try {
        // Check if project exists
        const projectExists = await ProjectModel.findProjectById(parseInt(paramsValue.projectId, 10));
        if (!projectExists) {
            return res.status(404).json(formatResponse('error', 'Project not found'));
        }

        // Check if sensor exists
        const sensorExists = await SensorModel.findSensorById(paramsValue.sensorId);
        if (!sensorExists) {
            return res.status(404).json(formatResponse('error', 'Sensor not found'));
        }

        // Check if each sensor data exists
        const sensorDataExists = await SensorModel.findSensorDataByIds(BodyValue.ids);
        const existingIds = sensorDataExists.map(data => data.id);
        const nonExistingIds = BodyValue.ids.filter(id => !existingIds.includes(id));

        if (nonExistingIds.length > 0) {
            return res.status(404).json(formatResponse('error', `Sensor data with IDs ${nonExistingIds.join(', ')} not found`));
        }

        await SensorModel.deleteMultipleSensorData(BodyValue.ids);
        res.status(200).json(formatResponse('success', 'Sensor data deleted successfully'));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = deleteMultipleSensorData;