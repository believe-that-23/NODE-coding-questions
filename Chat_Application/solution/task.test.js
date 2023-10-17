import request from 'supertest';
import mongoose from 'mongoose';
import app from './index.js';
import Task from './src/features/task/task.model.js';
import User from './src/features/user/user.model.js';
import { createTask } from './src/features/task/task.repository.js';
import { connectUsingMongoose } from './src/config/db.config.js';

// Custom authentication middleware for testing
function customAuthenticationMiddleware(userId) {
    return (req, res, next) => {
        // Simulate setting req.user with the user information
        req.user = { _id: userId };
        next();
    };
}

beforeAll(async () => {
    await connectUsingMongoose();
});

afterAll(async () => {
    await mongoose.disconnect();
});

beforeEach(async () => {
    await Task.deleteMany({});
});

describe('Task Routes', () => {
    let userId; // To store the user's ID
    let authToken; // To store the authentication token

    beforeAll(async () => {
        // Create a user for testing
        const adminUser = await User.create({
            username: 'adminuser',
            password: 'adminpassword',
            role: 'admin',
        });
        
        userId = adminUser._id; // Store the user's ID

        // Log in the user to obtain the authentication token
        const loginResponse = await request(app)
            .post('/login')
            .send({ username: 'adminuser', password: 'adminpassword' });

        authToken = loginResponse.body.token; // Use loginResponse.body.token to get the actual token
    });

    it('should create a new task', async () => {
        const newTask = {
            name: 'New Task',
            description: 'New Description',
            owner: userId
        };

        const response = await createTask(newTask);

        expect(response.name).toBe(newTask.name);
        expect(response.description).toBe(newTask.description);
        expect(response.owner).toBe(newTask.owner);

    });
});
