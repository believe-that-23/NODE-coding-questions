// routes/taskRoutes.mjs
import express from 'express';
import { authenticateJWT } from '../../../middleware/authMiddleware.js';
import * as taskController from './task.controller.js';

const router = express.Router();

// Secure this route with JWT authentication
router.use(authenticateJWT);

// Get all tasks
router.get('/', taskController.getAllTasks);

// Create a new task
router.post('/', taskController.createTask);

export default router;
