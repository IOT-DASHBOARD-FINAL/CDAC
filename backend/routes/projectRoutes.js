const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const createProject = require('../controllers/project/createProject');
const getProjectById = require('../controllers/project/getProjectById');
const getProjectByUserId = require('../controllers/project/getProjectByUserId');
const getAllProject = require('../controllers/project/getAllProject');
const updateProject = require('../controllers/project/updateProject');
const deleteProject = require('../controllers/project/deleteProject');

const router = express.Router();

// Define user-related routes
router.post('/projects/create', authenticateToken, createProject);
router.post('/projects/get/:projectId', authenticateToken, getProjectById);
router.post('/projects/getByUser/:id', authenticateToken, getProjectByUserId);
router.post('/projects/getAll', authenticateToken, getAllProject);
router.patch('/projects/update/:projectId', authenticateToken, updateProject);
router.delete('/projects/delete/:projectId', authenticateToken, deleteProject);

module.exports = router;