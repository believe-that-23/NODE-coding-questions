import User from './user.model.js';
import jwt from 'jsonwebtoken';

export async function getAllUsers() {
  return User.find();
}

export async function createUser({ username, password, role }) {
  const existingUser = await User.findOne({ username });
  const adminUser = await User.findOne({ role: 'admin' });

  if (existingUser) {
    throw new Error('User already exists.');
  }

  if (adminUser && role === 'admin') {
    throw new Error('Admin User already exists.');
  }

  const user = new User({ username, password, role });
  await user.save();
}

export async function deleteUser(userId) {
  return User.findByIdAndRemove(userId);
}

export async function login(username, password) {
  const user = await authenticateUser(username, password);

  if (!user) {
    return { user: null, token: null };
  }

  const token = jwt.sign({ user }, 'your-secret-key', { expiresIn: '1h' });

  return { user, token };
}

async function authenticateUser(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    return null; // User not found
  }

  if (user.password !== password) {
    return null; // Password doesn't match
  }

  return user;
}

export async function registerUser({ username, password, role }) {
    const existingUser = await User.findOne({ username });
    const adminUser = await User.findOne({ role: 'admin' });
  
    if (existingUser) {
      throw new Error('User already exists.');
    }
  
    if (adminUser && role === 'admin') {
      throw new Error('Admin User already exists.');
    }
  
    const user = new User({ username, password, role });
    await user.save();
  }
