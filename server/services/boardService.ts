import { prisma } from '../lib/prisma';

import type { Board, CreateBoardInput } from '../../shared/types/boards';
import type { Task } from '../../shared/types/tasks';
import { BoardUpdateInput } from '../generated/prisma/models';

export function getBoards(): Promise<Board[]> {
  return prisma.board.findMany();
}

export function getBoard(boardId: string): Promise<Board | null> {
  return prisma.board.findUnique({
    where: { id: boardId },
  });
}

export function createBoard(newBoard: CreateBoardInput): Promise<Board> {
  return prisma.board.create({
    data: newBoard,
  });
}

/**
 * Deletes a board by its ID.
 *
 * Associated tasks are automatically deleted by the database
 * via the foreign key's `onDelete: Cascade` relationship.
 *
 * @param boardId - The ID of the board to delete.
 * @returns The deleted board.
 */
export function deleteBoard(boardId: string): Promise<Board> {
  return prisma.board.delete({
    where: {
      id: boardId,
    },
  });
}

export function updateBoard(
  boardId: string,
  updates: BoardUpdateInput,
): Promise<Board> {
  return prisma.board.update({
    where: {
      id: boardId,
    },
    data: updates,
  });
}

export function getBoardTasks(boardId: string): Promise<Task[]> {
  return prisma.task.findMany({
    where: { boardId: boardId },
  });
}
