import { useEffect, useReducer, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router';

import type { Board } from '../../../shared/types/boards';

import type { BoardFormState, BoardsAction } from '../../types/board';
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
} from '../../services/boardService';
import BoardFormModal from './BoardFormModal';
import BoardCard from './BoardCard';

import '../../styles/boards/BoardList.css';
import { FolderOpen, Plus } from 'lucide-react';
import DeleteBoardModal from './DeleteBoardModal';

function BoardsList() {
  const navigate = useNavigate();
  const isCreateBoardRoute = Boolean(useMatch('/boards/new'));
  const { boardId } = useParams();
  const currentlyEditing = boardId || null;
  const isEditBoardRoute = Boolean(useMatch(`/boards/${boardId}/edit`));

  const showForm = isCreateBoardRoute || isEditBoardRoute;

  const [boards, dispatch] = useReducer(boardsReducer, []);
  const [deleteBoardId, setDeleteBoardId] = useState<string | null>(null);

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

  function handleConfirmDelete(boardId: string | null) {
    if (boardId === null) {
      setDeleteBoardId(null);
      return;
    }
    handleDeleteBoard(boardId);
    setDeleteBoardId(null);
  }

  async function handleDeleteBoard(boardId: string) {
    deleteBoard(boardId);
    dispatch({ type: 'DELETE_BOARD', payload: boardId });
  }

  const showEmptyState = boards.length === 0;

  function getEmptyState() {
    return (
      <div className="boards-page">
        <div className="empty-state-board">
          <FolderOpen className="icon light-primary xxl" />
          <div className="message">No boards yet</div>
          <div className="sub-message">
            Create your first board to start orgainizing tasks
          </div>
          <button
            className="btn primary"
            onClick={() => navigate('/boards/new')}
          >
            <Plus className="icon md" />
            Create Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showEmptyState ? (
        getEmptyState()
      ) : (
        <div className="boards-page">
          <div className="page-header">
            <div className="page-header-start">
              <div className="page-title">Boards</div>
              <div className="page-description">
                Create and manage your project boards
              </div>
            </div>
            <div className="page-header-end">
              <button
                className="btn primary"
                onClick={() => navigate('/boards/new')}
              >
                <Plus className="icon md" />
                Create Board
              </button>
            </div>
          </div>
          <div className="page-main">
            <ul className="boards-list">
              {boards.map((board) => {
                return (
                  <li key={board.id}>
                    <BoardCard
                      boards={boards}
                      boardId={board.id}
                      setDeleteBoardId={setDeleteBoardId}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {showForm ? (
        <BoardFormModal
          boards={boards}
          currentlyEditing={currentlyEditing}
          handleSubmitCreateForm={handleSubmitCreateForm}
          handleSubmitEditForm={handleSubmitEditForm}
        />
      ) : (
        ''
      )}
      {deleteBoardId ? (
        <DeleteBoardModal
          boards={boards}
          deleteBoardId={deleteBoardId}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : (
        ''
      )}
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
