export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  tags: string[];
};

export type CreateTaskInput = Omit<Task, 'id'>;

export type TaskUpdates = Partial<
  Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'dueDate'>
>;
