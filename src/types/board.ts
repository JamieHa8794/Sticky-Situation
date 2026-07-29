import type { TaskStatus } from '../../shared/types/tasks';
import type { Board } from '../../shared/types/boards';

export type Column = {
  id: string;
  title: string;
  status: TaskStatus;
};

export type BoardsAction =
  | { type: 'LOAD_BOARDS'; payload: Board[] }
  | { type: 'ADD_BOARD'; payload: Board }
  | { type: 'UPDATE_BOARD'; payload: Board }
  | { type: 'DELETE_BOARD'; payload: string | null };
