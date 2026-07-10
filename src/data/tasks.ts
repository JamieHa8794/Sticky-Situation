import { Circle } from 'lucide-react';
import type { SelectOption } from '../types/common';
import type { Task, TaskStatus, TaskPriority } from '../types/task';

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Create project',
    description: 'Set up Vite and React',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-06-25',
    tags: ['setup', 'react', 'vite'],
  },
  {
    id: '2',
    title: 'Build TaskCard',
    description: 'Render task information',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-02',
    tags: ['frontend', 'ui'],
  },
  {
    id: '3',
    title: 'Create Column',
    description: 'Display tasks by status',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-06-29',
    tags: ['frontend', 'feature'],
  },
  {
    id: '4',
    title: 'Create Board',
    description: 'Render all columns',
    status: 'todo',
    priority: 'low',
    dueDate: '',
    tags: ['architecture'],
  },
  {
    id: '5',
    title: 'Implement search',
    description: 'Filter tasks by title as the user types',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-07-10',
    tags: ['feature', 'search'],
  },
  {
    id: '6',
    title: 'Update README',
    description: 'Document project setup and features',
    status: 'done',
    priority: 'low',
    dueDate: '',
    tags: [],
  },
];

export const taskStatusList: SelectOption<TaskStatus>[] = [
  {
    key: 'todo',
    name: 'To Do',
    icon: Circle,
    tone: 'light-primary ',
  },
  {
    key: 'in-progress',
    name: 'In Progress',
    icon: Circle,
    tone: 'warning',
  },
  {
    key: 'done',
    name: 'Done',
    icon: Circle,
    tone: 'success',
  },
];

export const priorityList: SelectOption<TaskPriority>[] = [
  {
    key: 'low',
    name: 'Low',
    icon: Circle,
    tone: 'success',
  },
  {
    key: 'medium',
    name: 'Medium',
    icon: Circle,
    tone: 'warning',
  },
  {
    key: 'high',
    name: 'High',
    icon: Circle,
    tone: 'danger',
  },
];
