import { useEffect, useReducer } from 'react';
import { Link } from 'react-router';

import type { Board } from '../../shared/types/boards';

import { boardTitle, boardSubtitle } from '../data/board';
import type { BoardsAction } from '../types/board';
import { getBoards } from '../services/boardService';

function BoardsList() {
  const tempBoards: Board[] = [
    {
      id: 'seed-board-1',
      title: boardTitle,
      description: boardSubtitle,
    },
  ];

  const [boards, dispatch] = useReducer(boardsReducer, tempBoards);

  useEffect(() => {
    async function loadBoards() {
      const boards = await getBoards();
      dispatch({ type: 'LOAD_BOARDS', payload: boards });
    }
    void loadBoards();
  });

  return (
    <div>
      <div>This is a placehodler page for boards list</div>
      <br />
      <ul>
        {boards.map((board) => {
          return (
            <li key={board.id}>
              <Link to={`/boards/${board.id}`}>{board.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function boardsReducer(boards: Board[], action: BoardsAction) {
  switch (action.type) {
    case 'LOAD_BOARDS':
      return action.payload;
    default:
      return boards;
  }
}

export default BoardsList;
