import { Circle } from 'lucide-react';
import type { SelectOption } from '../types/common';
import type { TaskStatus, TaskPriority } from '../../shared/types/tasks';

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
