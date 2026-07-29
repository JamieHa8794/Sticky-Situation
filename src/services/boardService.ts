import type { Board } from '../../shared/types/boards';

const API_URL = 'http://localhost:3000';

export async function getBoards(): Promise<Board[]> {
  const resp = await fetch(`${API_URL}/boards`);

  if (!resp.ok) {
    throw new Error('Failed to get boards');
  }

  const boards = await resp.json();

  return boards;
}

export async function getBoard(boardId: string): Promise<Board> {
  const resp = await fetch(`${API_URL}/boards/${boardId}`);

  if (!resp.ok) {
    throw new Error('Failed to get board');
  }

  const board = await resp.json();

  return board;
}
