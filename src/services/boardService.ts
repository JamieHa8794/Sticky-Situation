import type { Board, BoardUpdates } from '../../shared/types/boards';
import type { Task } from '../../shared/types/tasks';

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
 * Creates a new board.
 *
 * @param newBoard - The task to create.
 * @returns A promise that resolves to the created board.
 * @throws {Error} If the request fails.
 */
export async function createBoard(newBoard: Board): Promise<Board> {
  const resp = await fetch(`${API_URL}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBoard),
  });

  if (!resp.ok) {
    throw new Error('Failed to create new board');
  }

  const createdBoard = await resp.json();
  return createdBoard;
}

/**
 * Deletes a board by its ID.
 *
 * @param boardId - The ID of the board to delete.
 * @returns A promise that resolves when the board has been deleted.
 * @throws {Error} If the request fails.
 */
export async function deleteBoard(boardId: string): Promise<void> {
  const resp = await fetch(`${API_URL}/boards/${boardId}`, {
    method: 'DELETE',
  });

  if (!resp.ok) {
    throw new Error('Failed to delete board');
  }
}

/**
 * Updates an existing board.
 *
 * @param boardId - The ID of the board to update.
 * @param updates - The fields to update on the board.
 * @returns A promise that resolves to the updated board.
 * @throws {Error} If the request fails.
 */
export async function updateBoard(
  boardId: string,
  updates: BoardUpdates,
): Promise<Board> {
  const resp = await fetch(`${API_URL}/boards/${boardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!resp.ok) {
    throw new Error('Failed to update board');
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
