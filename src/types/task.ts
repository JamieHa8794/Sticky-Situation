import type { Task, TaskStatus, TaskPriority } from '../../shared/types/tasks';

export type sortOptions = 'newest' | 'due-date' | 'priority' | 'title';

export type TaskFormState = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  tags: string[];
};

export type TaskAction =
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string | null }
  | { type: 'MOVE_TASK'; payload: { taskId: string; status: TaskStatus } };

export type TaskUpdates = Partial<
  Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'dueDate'>
>;

export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};
