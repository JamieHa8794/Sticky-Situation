import { useState } from 'react';

import IconModal from './IconModal';

import { getChangedFields } from '../../utils';

import { BOARD_ICON_OPTIONS } from '../../data/icons';

import type { Board } from '../../../shared/types/boards';
import type { BoardFormState } from '../../types/board';
import type { BoardIconName } from '../../types/icons';

import { Image, Rocket } from 'lucide-react';

import '../../styles/boards/BoardFormModal.css';
import { useNavigate } from 'react-router';

type BoardFormProps = {
  boards: Board[];
  currentlyEditing: string | null;
  handleSubmitCreateForm: (board: BoardFormState) => void;
  handleSubmitEditForm: (
    boardId: string,
    boardDetails: Partial<BoardFormState>,
  ) => void;
};

function BoardFormModal(props: BoardFormProps) {
  const {
    boards,
    currentlyEditing,
    handleSubmitCreateForm,
    handleSubmitEditForm,
  } = props;

  const navigate = useNavigate();
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
        icon: editBoard.icon || 'rocket',
      }
    : {
        title: '',
        description: '',
        icon: 'rocket',
      };

  const [formState, setFormState] = useState(initialFormState);
  const [showIconModal, setShowIconModal] = useState(false);

  const formMode = currentlyEditing === null ? 'create' : 'edit';
  const boardId = editBoard?.id || '';

  async function onSubmitBoard() {
    const type = formMode;

    if (type === 'create') {
      const boardDetails: BoardFormState = {
        title: formState.title,
        description: formState.description,
        icon: formState.icon,
      };
      await handleSubmitCreateForm(boardDetails);
    }

    if (type === 'edit') {
      const updatedTasks = getChangedFields(initialFormState, formState);

      await handleSubmitEditForm(boardId, updatedTasks);
    }

    navigate('/boards');
  }

  function setIcon(iconId: BoardIconName) {
    setFormState((currentFormState) => {
      return {
        ...currentFormState,
        icon: iconId,
      };
    });
  }

  const selectedIconOption = BOARD_ICON_OPTIONS.find(
    (iconOption) => iconOption.id === formState.icon,
  );

  const SelectedIcon = selectedIconOption?.Icon ?? Rocket;
  const accentColor = selectedIconOption?.accent || 'green';

  return (
    <div className="modal-overlay">
      <div
        className="modal-container board-modal"
        style={{
          width: '100%',
          maxWidth: '650px',
        }}
      >
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
              <div className="form-column is-two-fifths">
                <div className="form-item">
                  <div>Board Icon</div>
                  <div className={`icon-container accent-${accentColor}`}>
                    <SelectedIcon
                      className={`icon xxl  accent-${accentColor}`}
                    />
                  </div>
                  <div>
                    <button
                      className="btn outlined"
                      onClick={() => {
                        setShowIconModal(true);
                      }}
                    >
                      <Image className="icon sm" />
                      Change Icon
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-column">
                <div className="form-row">
                  <div className="form-item">
                    <div className="input-label">Title</div>
                    <div className="input-container">
                      <input
                        className="inpt"
                        placeholder="Enter Board Title"
                        value={formState.title}
                        onChange={(e) => {
                          setFormState((currentFormState) => {
                            return {
                              ...currentFormState,
                              title: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                    <div className="input-label">Description</div>
                    <textarea
                      className="txt-area"
                      style={{
                        height: '100%',
                        minHeight: '150px',
                      }}
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
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn secondary"
                onClick={() => {
                  navigate('/boards');
                }}
              >
                Cancel
              </button>
              <button className="btn primary" onClick={onSubmitBoard}>
                {editBoard ? 'Save Changes' : 'Create Board'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showIconModal ? (
        <IconModal
          setShowIconModal={setShowIconModal}
          selectedIcon={formState.icon}
          setIcon={setIcon}
        />
      ) : (
        ''
      )}
    </div>
  );
}
export default BoardFormModal;
