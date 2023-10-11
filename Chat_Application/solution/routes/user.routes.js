// routes/userRoutes.mjs
import express from 'express';
import userController from '../controllers/userController.mjs';
import { authenticateJWT, isAdmin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/users', authenticateJWT, isAdmin, userController.getAllUsers);
router.post('/users', authenticateJWT, isAdmin, userController.createUser);
router.delete('/users/:id', authenticateJWT, isAdmin, userController.deleteUser);

export default router;

