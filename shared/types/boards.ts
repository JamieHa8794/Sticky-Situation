type BoardBase = {
  id: string;
  title: string;
  description: string;
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
};

export type BoardUpdates = Partial<Pick<Board, 'title' | 'description'>>;

export type BoardIdParams = {
  boardId: string;
};
