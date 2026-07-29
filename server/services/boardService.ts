import { prisma } from '../lib/prisma';

import type { Board } from '../../shared/types/boards';
import type { Task } from '../../shared/types/tasks';

export function getBoard(boardId: string): Promise<Board | null> {
  return prisma.board.findUnique({
    where: { id: boardId },
  });
}

export function getBoards(): Promise<Board[]> {
  return prisma.board.findMany();
}

export function getBoardTasks(boardId: string): Promise<Task[]> {
  return prisma.task.findMany({
    where: { boardId: boardId },
  });
}
