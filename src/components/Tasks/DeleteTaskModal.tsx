import type { Task } from '../../../shared/types/tasks';

import '../../styles/tasks/DeleteTaskModal.css';
import { TriangleAlert } from 'lucide-react';

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
      <div className="delete-task-modal modal-container">
        <div className="modal-header">
          <div className="modal-title">Delete Task?</div>
        </div>
        <div className="modal-body">
          <div className="modal-body-icon">
            <TriangleAlert className="icon xl danger-600" />
          </div>
          <div className="modal-body-text-container">
            <div className="modal-body-text">
              Are you sure you want to delete:
            </div>
            <div className="modal-body-text bold">"{deleteTask?.title}"</div>
            <div className="modal-body-text">This action cannot be undone.</div>
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
            onClick={() => handleConfirmDelete(deleteTaskId)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
