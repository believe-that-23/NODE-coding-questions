import request from 'supertest';
import mongoose from 'mongoose';
import app from './index.js'; // Your app setup
import User from './src/features/user/user.model.js';
import { connectUsingMongoose } from './src/config/db.config.js';

beforeAll(async () => {
    await connectUsingMongoose();
});

afterAll(async () => {
    await mongoose.disconnect();
});

beforeEach(async () => {
    await User.deleteMany({});
});

describe('User API Endpoints', () => {
    it('should create a new admin user and not allow creation of second admin user', async () => {
        const newUser = {
            username: 'adminuser',
            password: 'adminpassword',
            role: "admin", // Ensure this user is an admin
        };

        const response = await request(app)
            .post('/users/register')
            .send(newUser);

        console.log(response.body);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully.');

        const newUser2 = {
            username: 'adminuser2',
            password: 'adminpassword',
            role: "admin",
        }

        const response2 = await request(app)
            .post('/users/register')
            .send(newUser2);

        expect(response2.status).toBe(500);

    });

    it('should not allow creating a non-admin user', async () => {
        const newUser = {
            username: 'regularuser',
            password: 'userpassword',
            admin: 'user', // Ensure this user is not an admin
        };

        const response = await request(app)
            .post('/users/register')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully.');
    });

    it('should allow deleting an admin user', async () => {
        // Log in as an admin user to obtain an authentication token
        const adminUser = await User.create({
            username: 'adminuser',
            password: 'adminpassword',
            role: 'admin',
        });

        const loginResponse = await request(app)
            .post('/login')
            .send({ username: 'adminuser', password: 'adminpassword' });

        const authToken = loginResponse.body;

        console.log(authToken);
        expect(loginResponse.status).toBe(200);

        // Now, send the delete request with the obtained authentication token
        const response = await request(app)
            .delete(`/users/${adminUser._id}`)
            .set('Authorization', `${authToken}`);

        expect(response.status).toBe(200);
    });


    it('should allow admin user to create user', async () => {
        const adminUser = await User.create({
            username: 'adminuser',
            password: 'adminpassword',
            role: 'admin',
        });

        const loginResponse = await request(app)
            .post('/login')
            .send({ username: 'adminuser', password: 'adminpassword' });

        const authToken = loginResponse.body;

        const user = {
            username: 'user',
            password: 'password',
            role: 'user',
        }

        const response = await request(app)
            .post('/users')
            .set('Authorization', `${authToken}`)
            .send(user);

        expect(response.status).toBe(201);
    });

    it('should not allow admin user to create a new admin user', async () => {
        const adminUser = await User.create({
            username: 'adminuser',
            password: 'adminpassword',
            role: 'admin',
        });

        const loginResponse = await request(app)
            .post('/login')
            .send({ username: 'adminuser', password: 'adminpassword' });

        const authToken = loginResponse.body;

        const user = {
            username: 'user',
            password: 'password',
            role: 'admin',
        }

        const response = await request(app)
            .post('/users')
            .set('Authorization', `${authToken}`)
            .send(user);

        expect(response.status).toBe(500);
    });

    it('should allow admin user to get all users', async () => {
        const adminUser = await User.create({
            username: 'adminuser',
            password: 'adminpassword',
            role: 'admin',
        });

        const loginResponse = await request(app)
            .post('/login')
            .send({ username: 'adminuser', password: 'adminpassword' });

        const authToken = loginResponse.body;

        const response = await request(app)
            .get('/users')
            .set('Authorization', `${authToken}`)

        expect(response.status).toBe(200);
    });
});
