import * as TaskRepository from './task.repository.js';

export async function getAllTasks(req, res) {
  try {
    const tasks = await TaskRepository.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function createTask(req, res) {
  const { name, description } = req.body;
  const owner = req.user._id;

  try {
    const task = await TaskRepository.createTask({ name, description, owner });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
