import * as UserRepository from './user.repository.js';

export async function getAllUsers(req, res) {
  try {
    const users = await UserRepository.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createUser(req, res) {
  const { username, password, role } = req.body;

  try {
    await UserRepository.createUser({ username, password, role });
    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await UserRepository.deleteUser(userId);
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

export async function login(req, res) {
  const { username, password } = req.body;
  const { user, token } = await UserRepository.login(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }

  req.user = user;
  req.token = token;

  res.json(token);
}

export async function register(req, res) {
  const { username, password, role } = req.body;

  try {
    await UserRepository.registerUser({ username, password, role });
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
