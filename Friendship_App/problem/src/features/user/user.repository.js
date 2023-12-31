import UserModel from './user.model.js';
import bcrypt from 'bcrypt';

export default class UserRepository {
    
    async signup(user) {
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }
    
    async signin(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password))
            throw new Error('Incorrect email or password');
        return user;
    }

    async saveSession(token, user){
        user.auth_tokens.push({ token });
        await user.save();
    }
    
    async logout(userId, token){
        let user = await UserModel.findById(userId);
        
        // Remove the current token from the user's auth_token array
        user.auth_tokens = user.auth_tokens.filter((obj) => obj.token != token);
    
        await user.save();
    }

    async logoutAllDevices(userId){
        let user = await UserModel.findById(userId);
        
        // Remove all the tokens from the user's auth_token array
        user.auth_tokens = [];
    
        await user.save();
    }

    async get(userId) {
        return await UserModel.findById(userId).select('-password -auth_tokens');
    }

    async getAll() {
        return await UserModel.find({}).select('-password -auth_tokens');
    }

    async update(userId, data) {
        return await UserModel.findByIdAndUpdate(userId, data);
    }
}