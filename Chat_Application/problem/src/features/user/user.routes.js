// routes/userRoutes.mjs
import express from 'express';
import * as userController from './user.controller.js';
import { authenticateJWT, isAdmin } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateJWT, isAdmin, userController.getAllUsers);
router.post('/', authenticateJWT, isAdmin, userController.createUser);
router.delete('/:id', authenticateJWT, isAdmin, userController.deleteUser);
router.post('/register', userController.register);

export default router;

