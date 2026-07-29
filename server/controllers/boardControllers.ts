import type { Request, Response } from 'express';

import {
  getBoard,
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardTasks,
} from '../services/boardService';
import type {
  BoardIdParams,
  CreateBoardInput,
} from '../../shared/types/boards';

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

export async function createBoardController(
  req: Request,
  res: Response,
): Promise<void> {
  const newBaord = req.body as CreateBoardInput;

  const createdBoard = await createBoard(newBaord);

  res.status(201).json(createdBoard);
}

export async function deleteBoardController(
  req: Request<BoardIdParams>,
  res: Response,
): Promise<void> {
  const boardId = req.params.boardId;

  const deletedBoard = await deleteBoard(boardId);

  if (!deletedBoard) {
    res.status(404).json({
      message: 'Board not found',
    });
    return;
  }

  res.status(202).send();
}

export async function updateBoardController(
  req: Request<BoardIdParams>,
  res: Response,
): Promise<void> {
  const boardId = req.params.boardId;
  const updates = req.body;

  const updatedBoard = await updateBoard(boardId, updates);

  if (!updateBoard) {
    res.status(404).json({
      message: 'Board not found',
    });
    return;
  }

  res.send(202).send(updatedBoard);
}

export async function getBoardTasksController(
  req: Request<BoardIdParams>,
  res: Response,
): Promise<void> {
  const boardId = req.params.boardId;

  const tasks = await getBoardTasks(boardId);

  res.json(tasks);
}
