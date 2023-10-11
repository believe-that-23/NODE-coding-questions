// app.mjs
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.mjs';
import { login } from './controllers/userController.mjs';
import bodyParser from 'body-parser';

// Initialize Express
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true });

// Express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.post('/login', login);
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

