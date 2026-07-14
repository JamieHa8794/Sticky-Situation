import type { Request, Response } from 'express';
import {
  getAllTasks,
  deleteTask,
  createTask,
  updateTask,
} from '../services/taskService';
import type {
  Task,
  CreateTaskInput,
  TaskUpdates,
} from '../../shared/types/tasks';

type TaskIdParams = {
  taskId: string;
};

export async function getTasksController(
  _req: Request,
  res: Response,
): Promise<void> {
  const tasks = await getAllTasks();

  res.json(tasks);
}

export function deleteTaskController(
  req: Request<TaskIdParams>,
  res: Response,
): void {
  const taskId = req.params.taskId;

  const deletedTask = deleteTask(taskId);

  if (!deletedTask) {
    res.status(404).json({
      message: 'Task not found',
    });
    return;
  }

  res.status(204).send();
}

export async function createTaskController(
  req: Request,
  res: Response,
): Promise<void> {
  const newTask = req.body as CreateTaskInput;

  const createdTask = await createTask(newTask);

  res.status(201).json(createdTask);
}

export async function updateTaskController(
  req: Request<TaskIdParams>,
  res: Response,
): Promise<void> {
  const taskId = req.params.taskId;
  const updates = req.body as TaskUpdates;

  const updatedTask = await updateTask(taskId, updates);

  if (!updatedTask) {
    res.status(404).json({
      message: 'Task not found',
    });
    return;
  }
  res.json(updatedTask);
}
