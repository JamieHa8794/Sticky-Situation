import type { Request, Response } from 'express';
import {
  getAllTasks,
  deleteTask,
  createTask,
  updateTask,
} from '../services/taskService';
import type { Task, TaskUpdates } from '../../shared/types/tasks';

type TaskIdParams = {
  taskId: string;
};

export function getTasksController(_req: Request, res: Response): void {
  const tasks = getAllTasks();

  res.json(tasks);
}

export function deleteTaskController(
  req: Request<TaskIdParams>,
  res: Response,
): void {
  const taskId = req.params.taskId;

  const deleteId = deleteTask(taskId);

  if (!deleteId) {
    res.status(404).json({
      message: 'Task not found',
    });
    return;
  }

  res.status(204).send();
}

export function createTaskController(req: Request, res: Response): void {
  const newTask = req.body as Task;

  const createdTask = createTask(newTask);

  res.status(201).json(createdTask);
}

export function updateTaskController(
  req: Request<TaskIdParams>,
  res: Response,
): void {
  const taskId = req.params.taskId;
  const updates = req.body as TaskUpdates;

  const updatedTask = updateTask(taskId, updates);

  if (!updatedTask) {
    res.status(404).json({
      message: 'Task not found',
    });
    return;
  }
  res.json(updatedTask);
}
