import type { Task } from '../types/task';

import '../styles/DeleteModal.css';

type DeleteModalProps = {
  deleteTaskId: string | null;
  tasks: Task[];
  handleConfirmDelete: (id: string | null) => void;
};

function DeleteModal(props: DeleteModalProps) {
  const { deleteTaskId, tasks, handleConfirmDelete } = props;

  const deleteTask = tasks.find((task) => task.id === deleteTaskId);

  return (
    <div className="modal-overlay">
      <div className="delete-modal-container">
        <div className="modal-header">
          <div>Confirm Delete?</div>
        </div>
        <div className="modal-body">
          You are about to delete the task: {deleteTask?.title}. This cannot be
          undone.
        </div>

        <div className="modal-footer">
          <button onClick={() => handleConfirmDelete(null)}>Cancel</button>
          <button onClick={() => handleConfirmDelete(deleteTaskId)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
