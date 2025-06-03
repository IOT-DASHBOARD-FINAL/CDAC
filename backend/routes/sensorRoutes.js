const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const createSensor = require('../controllers/sensor/createSensor');
const getSensorById = require('../controllers/sensor/getSensorById');
const getSensorByProjectId = require('../controllers/sensor/getSensorByProjectId');
const getAllSensor = require('../controllers/sensor/getAllSensor');
const updateSensor = require('../controllers/sensor/updateSensor');
const deleteSensor = require('../controllers/sensor/deleteSensor');
const sendSensorData = require('../controllers/sensor/sensorData/sendSensorData');
const getSensorData = require('../controllers/sensor/sensorData/getSensorData');
const deleteSensorData = require('../controllers/sensor/sensorData/deleteSensorData');
const deleteMultipleSensorData = require('../controllers/sensor/sensorData/deleteMultipleSensorData');
const getSensorDataByName = require('../controllers/sensor/sensorData/getSensorDataByName');
const { route } = require('./userRoutes');
const sendSensorDataByName = require('../controllers/sensor/sensorData/sendSensorDataByName');

const router = (io) => {
    const router = express.Router();

    // Define user-related routes
    router.post('/projects/:projectId/sensor/create', authenticateToken, createSensor);
    router.post('/projects/:projectId/sensor/get/:sensorId', authenticateToken, getSensorById);
    router.post('/projects/:projectId/sensor/getByProject', authenticateToken, getSensorByProjectId);
    router.post('/projects/:projectId/sensor/getAll', authenticateToken, getAllSensor);
    router.patch('/projects/:projectId/sensor/update/:sensorId', authenticateToken, updateSensor);
    router.delete('/projects/:projectId/sensor/delete/:sensorId', authenticateToken, deleteSensor);

    // Send sensor data (WebSocket enabled)
    router.post('/projects/:projectId/sensor/:sensorId/sendData', authenticateToken, (req, res) => {
        req.io = io;
        sendSensorData(req, res);
    });
    // Get sensor data (WebSocket enabled)
    router.post('/projects/:projectId/sensor/:sensorId/getData', authenticateToken, (req, res) => {
        req.io = io;
        getSensorData(req, res);
    });
    // Delete sensor data
    router.delete('/projects/:projectId/sensor/:sensorId/deleteData/:dataId', authenticateToken, (req, res) => {
        req.io = io;
        deleteSensorData(req, res);
    });
    // Delete multiple sensor data
    router.delete('/projects/:projectId/sensor/:sensorId/deleteData', authenticateToken, deleteMultipleSensorData);

    //get sensor data by sensor name & project Name (WebSocket enabled)
    router.post('/projects/:projectName/sensor/:sensorName/getValue', authenticateToken, (req, res) => {
        req.io = io;
        getSensorDataByName(req, res);
    });

    // Send sensor data by sensor name & project name (WebSocket enabled)
    router.post('/projects/:projectName/sensor/:sensorName/sendValue', authenticateToken, (req, res) => {
        req.io = io;
        sendSensorDataByName(req, res);
    });

    return router;
};

module.exports = router;
