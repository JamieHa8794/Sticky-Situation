import type { SelectOption } from '../types/common';
import type {
  Task,
  TaskStatus,
  TaskPriority,
  sortOptions,
} from '../types/task';

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Create project',
    description: 'Set up Vite and React',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-06-25',
  },
  {
    id: '2',
    title: 'Build TaskCard',
    description: 'Render task information',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-2',
  },
  {
    id: '3',
    title: 'Create Column',
    description: 'Display tasks by status',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-06-29',
  },
  {
    id: '4',
    title: 'Create Board',
    description: 'Render all columns',
    status: 'todo',
    priority: 'medium',
    dueDate: null,
  },
];

export const taskStatusList: SelectOption<TaskStatus>[] = [
  {
    key: 'todo',
    name: 'To Do',
  },
  {
    key: 'in-progress',
    name: 'In Progress',
  },
  {
    key: 'done',
    name: 'Done',
  },
];

export const priorityList: SelectOption<TaskPriority>[] = [
  {
    key: 'low',
    name: 'Low',
  },
  {
    key: 'medium',
    name: 'Medium',
  },
  {
    key: 'high',
    name: 'High',
  },
];

export const sortList: SelectOption<sortOptions>[] = [
  {
    key: 'default',
    name: 'Default',
  },
  {
    key: 'due-date',
    name: 'Due Date',
  },
  {
    key: 'priority',
    name: 'Priority',
  },
  {
    key: 'title',
    name: 'Title',
  },
];
