import type { Task } from './tasks';

export type Board = {
  id: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  tasks?: Task[];
};

export type BoardIdParams = {
  boardId: string;
};
