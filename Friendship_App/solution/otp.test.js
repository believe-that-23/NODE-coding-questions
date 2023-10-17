import request from 'supertest';
import mongoose from 'mongoose';
import app from './index.js';
import OtpRepository from './src/features/otp/otp.repository.js';
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
//     await User.deleteMany({});
//     await OtpRepository.clear();
// });

describe('OTP Controller', () => {
    let token; // To store the authentication token
    let userId; // To store the user's ID

    beforeAll(async () => {
        // Create a user for testing
        const testUser = {
            name: 'testuser',
            email: 'arnavpandey72@gmail.com',
            password: 'testpassword',
            gender: 'Male'
        };

        const register = await request(app)
            .post('/api/users/signup')
            .send(testUser);

        userId = register.body._id;

        // Log in the user to obtain the authentication token
        const loginResponse = await request(app)
            .post('/api/users/signin')
            .send({ email: 'arnavpandey72@gmail.com', password: 'testpassword' });

        token = loginResponse.res.text;
    });

    it('should send OTP', async () => {
        const response = await request(app)
            .post('/api/otp/send')
            .set("Cookie", [`jwtToken=${token}`])
            .send({ email: 'arnavpandey72@gmail.com'}); // Use the user's email

        // Add assertions to validate the response
        expect(response.status).toBe(201);
        // Validate the response body or other specific expectations
    });

    it('should verify OTP', async () => {
        const response = await request(app)
            .post('/api/otp/verify')
            .set("Cookie", [`jwtToken=${token}`])
            .send({ otp: '123456', email: 'arnavpandey72@gmail.com' }); // Use the user's email and a valid OTP

        console.log(response.res)
        // Add assertions to validate the response
        expect(response.status).toBe(201);
        // Validate the response body or other specific expectations
    });

    it('should reset password', async () => {
        const response = await request(app)
            .post('/api/otp/reset-password')
            .set("Cookie", [`jwtToken=${token}`])
            .send({
                email: 'arnavpandey72@gmail.com', // Use the user's email
                new_password: 'newpassword',
                confirm_password: 'newpassword'
            });
        
        // console.log(response);`

        // Add assertions to validate the response
        expect(response.status).toBe(400);
    });
});
