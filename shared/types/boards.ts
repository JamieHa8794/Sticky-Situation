import type { Task } from './tasks';

export type Board = {
  id: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  tasks?: Task[];
};

export type CreateBoardInput = {
  title: string;
  description: string;
};

export type BoardUpdates = Partial<Pick<Board, 'title' | 'description'>>;

export type BoardIdParams = {
  boardId: string;
};
