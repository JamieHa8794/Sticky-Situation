import { useState } from 'react';

import type { BoardFormState } from '../types/board';
import type { Board } from '../../shared/types/boards';

type BoardFormProps = {
  boards: Board[];
  currentlyEditing: string | null;
  setCurrentlyEditting: (boardId: string | null) => void;
  handleSubmitCreateForm: (board: BoardFormState) => void;
  handleSubmitEditForm: (
    boardId: string,
    boardDetails: Partial<BoardFormState>,
  ) => void;
  setShowForm: (isOpen: boolean) => void;
};

function BoardFormModal(props: BoardFormProps) {
  const {
    boards,
    currentlyEditing,
    setCurrentlyEditting,
    handleSubmitCreateForm,
    handleSubmitEditForm,
    setShowForm,
  } = props;

  const editBoard = getEditBoard();
  function getEditBoard() {
    if (currentlyEditing === null) return null;

    const editBoard = boards.find((board) => board.id === currentlyEditing);
    return editBoard;
  }

  const initialFormState: BoardFormState = editBoard
    ? {
        title: editBoard.title,
        description: editBoard.description,
      }
    : {
        title: '',
        description: '',
      };

  const [formState, setFormState] = useState(initialFormState);
  const formMode = currentlyEditing === null ? 'create' : 'edit';
  const boardId = editBoard?.id || '';

  async function onSubmitBoard() {
    const type = formMode;

    if (type === 'create') {
      const boardDetails: BoardFormState = {
        title: formState.title,
        description: formState.description,
      };
      await handleSubmitCreateForm(boardDetails);
    }

    if (type === 'edit') {
      const boardDetails: Partial<BoardFormState> = {};
      if (initialFormState.title !== formState.title) {
        boardDetails.title = formState.title;
      }

      if (initialFormState.description !== formState.description) {
        boardDetails.description = formState.description;
      }

      await handleSubmitEditForm(boardId, boardDetails);
    }

    setShowForm(false);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container board-modal">
        <div className="modal-header">
          <div className="modal-title">
            {formMode === 'create'
              ? 'Create a new board'
              : 'Edit board details'}
          </div>
        </div>
        <div className="modal-body">
          <div className="form-container">
            <div className="form-row">
              <div className="form-item">
                <div className="input-label">Title</div>
                <input
                  className="inpt"
                  placeholder="Insert Board Title"
                  value={formState.title}
                  onChange={(e) => {
                    setFormState((currentFormState) => {
                      return { ...currentFormState, title: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="input-label">Description</div>
                <input
                  className="inpt"
                  placeholder="Insert Board Description"
                  value={formState.description}
                  onChange={(e) => {
                    setFormState((currentFormState) => {
                      return {
                        ...currentFormState,
                        description: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setCurrentlyEditting(null);
                  setShowForm(false);
                }}
              >
                Cancel
              </button>
              <button onClick={onSubmitBoard}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BoardFormModal;
