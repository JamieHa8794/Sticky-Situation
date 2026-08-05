import type { BoardIconName } from '../../src/types/icons';

type BoardBase = {
  id: string;
  title: string;
  description: string;
  icon: BoardIconName;
  taskCount?: number;
};

export type Board = BoardBase & {
  createdAt?: string;
  updatedAt?: string;
};

export type BoardRecord = BoardBase & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateBoardInput = {
  title: string;
  description: string;
  icon: BoardIconName;
};

export type BoardUpdates = Partial<
  Pick<Board, 'title' | 'description' | 'icon'>
>;

export type BoardIdParams = {
  boardId: string;
};
