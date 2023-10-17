import express from 'express';
import userRoutes from './src/features/user/user.routes.js';
import taskRoutes from './src/features/task/task.routes.js'
import { login } from './src/features/user/user.controller.js';

// Initialize Express
const app = express();

// Express middleware
app.use(express.json());

// Routes
app.post('/login', login);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

export default app;