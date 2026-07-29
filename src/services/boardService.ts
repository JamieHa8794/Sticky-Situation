import type { Board } from '../../shared/types/boards';

const API_URL = 'http://localhost:3000';

/**
 * Fetches all boards from the API.
 *
 * @returns A promise that resolves to the list of boards.
 * @throws {Error} If the request fails.
 */
export async function getBoards(): Promise<Board[]> {
  const resp = await fetch(`${API_URL}/boards`);

  if (!resp.ok) {
    throw new Error('Failed to get boards');
  }

  const boards = await resp.json();

  return boards;
}

/**
 * Fetches a single board by its ID.
 *
 * @param boardId - The ID of the board to retrieve.
 * @returns A promise that resolves to the requested board.
 * @throws {Error} If the request fails.
 */
export async function getBoard(boardId: string): Promise<Board> {
  const resp = await fetch(`${API_URL}/boards/${boardId}`);

  if (!resp.ok) {
    throw new Error('Failed to get board');
  }

  const board = await resp.json();

  return board;
}

/**
 * Retrieves all tasks belonging to the specified board.
 *
 * Throws an error if the request is unsuccessful.
 *
 * @param boardId - The unique identifier of the board whose tasks should be loaded.
 * @returns A promise that resolves to the board's tasks.
 */
export async function getBoardTasks(boardId: string): Promise<Task[]> {
  const resp = await fetch(`${API_URL}/boards/${boardId}/tasks`);

  if (!resp.ok) {
    throw new Error('Failed to get tasks');
  }

  const tasks = await resp.json();

  return tasks;
}
