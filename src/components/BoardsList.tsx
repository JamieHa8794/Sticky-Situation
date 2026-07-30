import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router';

import type { Board } from '../../shared/types/boards';

import type { BoardFormState, BoardsAction } from '../types/board';
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
} from '../services/boardService';
import BoardFormModal from './BoardFormModal';

function BoardsList() {
  const [boards, dispatch] = useReducer(boardsReducer, []);
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadBoards() {
    const boards = await getBoards();
    dispatch({ type: 'LOAD_BOARDS', payload: boards });
  }

  useEffect(() => {
    void loadBoards();
  }, []);

  async function handleSubmitCreateForm(boardDetails: BoardFormState) {
    const createdBoard = await createBoard(boardDetails);
    dispatch({ type: 'ADD_BOARD', payload: createdBoard });
    loadBoards();
  }

  async function handleSubmitEditForm(
    boardId: string,
    boardDetails: Partial<BoardFormState>,
  ) {
    const editBoard = await updateBoard(boardId, boardDetails);
    dispatch({ type: 'UPDATE_BOARD', payload: editBoard });
    loadBoards();
  }

  function handleConfirmDelete(boardId: string) {
    console.log(boards);
    console.log(boardId);
    const confirmed = window.confirm(
      'Are you sure you want to delete this board? Doing so will delete all associated tickets',
    );
    if (confirmed) {
      deleteBoard(boardId);
      dispatch({ type: 'DELETE_BOARD', payload: boardId });
    }
  }

  return (
    <div>
      <div>This is a placehodler page for boards list</div>
      <br />
      {!showForm ? (
        <button onClick={() => setShowForm(!showForm)}>Create Board</button>
      ) : (
        ''
      )}
      {showForm ? (
        <BoardFormModal
          boards={boards}
          currentlyEditing={currentlyEditing}
          setCurrentlyEditting={setCurrentlyEditing}
          handleSubmitCreateForm={handleSubmitCreateForm}
          handleSubmitEditForm={handleSubmitEditForm}
          setShowForm={setShowForm}
        />
      ) : (
        ''
      )}
      <ul>
        {boards.map((board) => {
          return (
            <li key={board.id}>
              <Link to={`/boards/${board.id}`}>{board.title}</Link>
              <button
                onClick={() => {
                  setCurrentlyEditing(board.id);
                  setShowForm(true);
                }}
              >
                Edit Board
              </button>
              <button onClick={() => handleConfirmDelete(board.id)}>
                Delete Board
              </button>
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
    case 'ADD_BOARD':
      return [...boards, action.payload];
    case 'UPDATE_BOARD':
      return boards.map((board) => {
        if (board.id === action.payload.id) {
          return action.payload;
        } else {
          return board;
        }
      });
    case 'DELETE_BOARD':
      return boards.filter((board) => board.id !== action.payload);
    default:
      return boards;
  }
}

export default BoardsList;
