import type { Task } from '../../shared/types/tasks';
import type { TaskUpdates } from '../types/task';

const TASKS_STORAGE_KEY = 'tasks';
const API_URL = 'http://localhost:3000';

async function readTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`);

  const tasks = await response.json();

  return tasks;
}

function writeTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export function getTasks(): Promise<Task[]> {
  return readTasks();
}

export async function deleteTask(taskId: string): Promise<void> {
  const tasks = await readTasks();
  const newTasks = tasks.filter((task) => task.id !== taskId);

  writeTasks(newTasks);
}

export async function createTask(newTask: Task): Promise<void> {
  const tasks = await readTasks();
  const updatedTaskList = [...tasks, newTask];
  writeTasks(updatedTaskList);
}

export async function updateTask(
  taskId: string,
  updates: TaskUpdates,
): Promise<Task> {
  const tasks = await readTasks();

  let updatedTask: Task | undefined;

  const updatedTaskList = tasks.map((task) => {
    if (task.id === taskId) {
      updatedTask = { ...task, ...updates };
      return updatedTask;
    }
    return task;
  });

  writeTasks(updatedTaskList);

  if (!updatedTask) {
    throw new Error('Task not found');
  }
  return updatedTask;
}
