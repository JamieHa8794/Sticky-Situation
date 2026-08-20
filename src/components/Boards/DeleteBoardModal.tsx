import { TriangleAlert, NotepadText, Calendar } from 'lucide-react';
import type { Board } from '../../../shared/types/boards';

import '../../styles/boards/DeleteBoardModal.css';

type DeleteBoardModalProps = {
  deleteBoardId: string | null;
  boards: Board[];
  handleConfirmDelete: (boardId: string | null) => void;
};
function DeleteBoardModal(props: DeleteBoardModalProps) {
  const { deleteBoardId, boards, handleConfirmDelete } = props;

  const deleteBoard = boards.find((board) => board.id === deleteBoardId);

  return (
    <div className="modal-overlay">
      <div className="delete-board-modal modal-container">
        <div className="modal-header">
          <div className="modal-title">Delete Board?</div>
        </div>
        <div className="modal-body">
          <div className="modal-body-icon">
            <TriangleAlert className="icon xl danger-600" />
          </div>
          <div className="modal-body-text-container">
            <div className="modal-body-text">
              Are you sure you want to delete:
            </div>
            <div className="modal-body-text bold">
              "{deleteBoard?.title}"<span className="modal-body-text">?</span>
            </div>
            <div className="modal-body-text">This action cannot be undone.</div>
          </div>
          <div className="delete-board-info-container">
            <div className="delete-board-info-item">
              <NotepadText className="icon md danger-500" />
              <div className="modal-body-text">
                {deleteBoard?.taskCount} tasks will be permanently deleted
              </div>
            </div>
            {/* <div className="delete-board-info-item">
              <Users />
              <div className="modal-body-text">{usersCount} members will lose access to this board</div>
            </div> */}
            <div className="delete-board-info-item">
              <Calendar className="icon md danger-500" />{' '}
              <div className="modal-body-text">
                This will not affect other boards
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn secondary"
            onClick={() => handleConfirmDelete(null)}
          >
            Cancel
          </button>
          <button
            className="btn primary destructive"
            onClick={() => handleConfirmDelete(deleteBoardId)}
          >
            Delete Board
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteBoardModal;
