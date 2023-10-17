import request from 'supertest';
import mongoose from 'mongoose';
import app from './index.js';
import FriendshipRepository from './src/features/friendship/friendship.repository.js';
import User from './src/features/user/user.model.js';
import connectDB from './src/configs/db.js';

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
});

// beforeEach(async () => {
//     // Clear the database or perform any necessary setup
//     // await User.deleteMany({});
//     // await FriendshipRepository.clear(); // Clear Friendship data (if needed)
// });

describe('Friendship Routes', () => {
    let userId, userId2; // To store the user's ID
    let token;

    beforeAll(async () => {
        // Create a user for testing

        const testUser = {
            name: 'testuser',
            email: 'arnavpandey72@gmail.com',
            password: 'testpassword',
            gender: 'Male'
        };

        const testUser2 = {
            name: 'testuser2',
            email: 'arnavpandey724@gmail.com',
            password: 'testpassword2',
            gender: 'Male'

        };

        const register = await request(app)
            .post('/api/users/signup')
            .send(testUser);
        const register2 = await request(app)
            .post('/api/users/signup')
            .send(testUser2)

        userId = register.body._id; // Store the user's ID
        userId2 = register2.body._id;

        // Log in the user to obtain the authentication token
        const loginResponse = await request(app)
            .post('/api/users/signin')
            .send({ email: 'arnavpandey72@gmail.com', password: 'testpassword' });

        token = loginResponse.res.text;
    });

    it('should get user friends', async () => {
        // Create test friendships if needed

        const response = await request(app)
            .get(`/api/friends/get-friends/${userId}`)
            .set("Cookie", [`jwtToken=${token}`])
        // Add assertions to validate the response
        expect(response.status).toBe(200);
    });

    it('should get pending requests', async () => {
        // Create test pending requests if needed

        const response = await request(app)
            .get('/api/friends/get-pending-requests')
            .set("Cookie", [`jwtToken=${token}`])
            .query({ request: 'sent' }); // or query({ request: 'received' })

        // Add assertions to validate the response
        expect(response.status).toBe(200);
    });

    it('should toggle friendship', async () => {
        // Create test friendships if needed

        const friendId = userId2; // Replace with a valid friend's user ID
        const response = await request(app)
            .get(`/api/friends/toggle-friendship/${friendId}`)
            .set("Cookie", [`jwtToken=${token}`])

        // Add assertions to validate the response
        // Expect different responses based on adding or removing friendship
    });

    it('should accept/reject friendship', async () => {
        // Create test pending requests if needed

        const friendId = userId2;
        const response = await request(app)
            .get(`/api/friends/response-to-request/${friendId}`)
            .set("Cookie", [`jwtToken=${token}`])
            .query({ action: 'accept' }); // or query({ action: 'reject' })


        expect(response.status).toBe(200)
    });
});
