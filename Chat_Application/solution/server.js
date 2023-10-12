import express from 'express';
import userRoutes from './src/features/user/user.routes.js';
import taskRoutes from './src/features/task/task.routes.js'
import { login } from './src/features/user/user.controller.js';
import bodyParser from 'body-parser';
import { connectUsingMongoose } from './src/config/db.config.js';

// Initialize Express
const app = express();

// Express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.post('/login', login);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectUsingMongoose();
});

