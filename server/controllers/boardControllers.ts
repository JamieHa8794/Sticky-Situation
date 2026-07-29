import type { Request, Response } from 'express';

import { getBoard, getBoards, getBoardTasks } from '../services/boardService';
import type { BoardIdParams } from '../../shared/types/boards';

export async function getBoardsController(
  req: Request,
  res: Response,
): Promise<void> {
  const boards = await getBoards();

  if (!boards) {
    res.status(404).json({
      message: 'Boards not found',
    });
    return;
  }

  res.json(boards);
}

export async function getBoardController(
  req: Request<BoardIdParams>,
  res: Response,
): Promise<void> {
  const boardId = req.params.boardId;

  const board = await getBoard(boardId);

  if (!board) {
    res.status(404).json({
      message: 'Board not found',
    });
    return;
  }

  res.json(board);
}

export async function getBoardTasksController(
  req: Request<BoardIdParams>,
  res: Response,
): Promise<void> {
  const boardId = req.params.boardId;

  const tasks = await getBoardTasks(boardId);

  res.json(tasks);
}
