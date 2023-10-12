import Task from './task.model.js';

export async function getAllTasks() {
  return Task.find().populate({
    path: 'owner',
    select: 'username role -_id',
  });
}

export async function createTask({ name, description, owner }) {
  const task = new Task({ name, description, owner });
  return task.save();
}
