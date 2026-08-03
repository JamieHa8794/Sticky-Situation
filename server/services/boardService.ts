import { prisma } from '../lib/prisma';

import type { BoardRecord, CreateBoardInput } from '../../shared/types/boards';
import type { Task } from '../../shared/types/tasks';
import { BoardUpdateInput } from '../generated/prisma/models';

export async function getBoards(): Promise<BoardRecord[]> {
  const boards = await prisma.board.findMany({
    include: {
      _count: {
        select: {
          tasks: true,
        },
      },
    },
  });

  return boards.map((board) => {
    const { _count, ...boardData } = board;
    return {
      ...boardData,
      taskCount: _count.tasks,
    };
  });
}

export function getBoard(boardId: string): Promise<BoardRecord | null> {
  return prisma.board.findUnique({
    where: { id: boardId },
  });
}

export function createBoard(newBoard: CreateBoardInput): Promise<BoardRecord> {
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
export function deleteBoard(boardId: string): Promise<BoardRecord> {
  return prisma.board.delete({
    where: {
      id: boardId,
    },
  });
}

export function updateBoard(
  boardId: string,
  updates: BoardUpdateInput,
): Promise<BoardRecord> {
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
