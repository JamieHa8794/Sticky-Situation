import type {
  Task,
  TaskUpdates,
  CreateTaskInput,
} from '../../shared/types/tasks';

const API_URL = 'http://localhost:3000';

/**
 * Deletes a task by its ID.
 *
 * @param taskId - The ID of the task to delete.
 * @returns A promise that resolves when the task has been deleted.
 * @throws {Error} If the request fails.
 */
export async function deleteTask(taskId: string): Promise<void> {
  const resp = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (!resp.ok) {
    throw new Error('Failed to delete task');
  }
}

/**
 * Creates a new task.
 *
 * @param newTask - The task to create.
 * @returns A promise that resolves to the created task.
 * @throws {Error} If the request fails.
 */
export async function createTask(newTask: CreateTaskInput): Promise<Task> {
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

/**
 * Updates an existing task.
 *
 * @param taskId - The ID of the task to update.
 * @param updates - The fields to update on the task.
 * @returns A promise that resolves to the updated task.
 * @throws {Error} If the request fails.
 */
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
