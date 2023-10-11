// controllers/userController.mjs
import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createUser(req, res) {
  const { username, password, role } = req.body;

  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export function login(req, res) {
  const { username, password } = req.body;
  
  // Authenticate the user based on username and password
  // If authenticated, generate a JWT
  const user = authenticateUser(username, password);
  
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }

  const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });

  res.json({ token });
}

function authenticateUser(username, password) {
  // Implement user authentication logic here
  // Check the database or user repository
  // Return the user object if authenticated, or null
  return null;
}

