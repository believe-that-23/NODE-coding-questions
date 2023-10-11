// controllers/taskController.mjs
import Task from '../models/Task.mjs';

export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find().populate('owner');
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createTask(req, res) {
  const { name, description } = req.body;
  const owner = req.user._id; // Assuming you're using Passport for authentication

  try {
    const task = new Task({ name, description, owner });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

