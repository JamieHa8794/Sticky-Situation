import type { Task, TaskUpdates } from '../../shared/types/tasks';

const API_URL = 'http://localhost:3000';

export async function getTasks(): Promise<Task[]> {
  const resp = await fetch(`${API_URL}/tasks`);

  if (!resp.ok) {
    throw new Error('Failed to get tasks');
  }

  const tasks = await resp.json();

  return tasks;
}

export async function deleteTask(taskId: string): Promise<void> {
  const resp = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (!resp.ok) {
    throw new Error('Failed to delete task');
  }
}

export async function createTask(newTask: Task): Promise<Task> {
  const resp = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  if (!resp.ok) {
    throw new Error('Failed to create task');
  }

  const createdTask = await resp.json();

  return createdTask;
}

export async function updateTask(
  taskId: string,
  updates: TaskUpdates,
): Promise<Task> {
  const resp = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!resp.ok) {
    throw new Error('Failed to update task');
  }

  const updatedTask = await resp.json();

  return updatedTask;
}
