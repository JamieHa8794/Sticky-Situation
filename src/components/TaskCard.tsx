import { formatDateString, formatToProperCase } from '../utils';

import type { Task } from '../../shared/types/tasks';

import '../styles/TaskCard.css';
import { Pencil, Trash2, CalendarFold, CircleCheck } from 'lucide-react';

type TaskCardProps = {
  task: Task;
  draggedTaskId: string | null;
  handleSetEditTask: (id: string | null) => void;
  handleSetDeleteTaskId: (id: string) => void;
  handleToggleTaskFormModal: () => void;
  handleDragStart: (id: string) => void;
  handleDragEnd: () => void;
};

function TaskCard(props: TaskCardProps) {
  const {
    task: { id, title, description, priority, dueDate, tags, status },
    handleSetEditTask,
    handleSetDeleteTaskId,
    handleToggleTaskFormModal,
    handleDragStart,
    handleDragEnd,
    draggedTaskId,
  } = props;

  const formattedDueDate = formatDateString(dueDate);
  const formattedPriority = formatToProperCase(priority);

  const isDragged = draggedTaskId === id;

  return (
    <div
      className={`card-container ${isDragged ? 'dragged' : ''}`}
      draggable
      onDragStart={() => {
        handleDragStart(id);
      }}
      onDragEnd={() => handleDragEnd()}
    >
      <div className="card-header">
        <div className="card-title">{title}</div>
        <div>
          <div className={`badge priority ${priority}`}>
            {formattedPriority}
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="card-description">{description}</div>

        <div className="tag-container">
          {tags.map((tag, idx) => {
            return (
              <li className="badge tag" key={idx}>
                {formatToProperCase(tag)}
              </li>
            );
          })}
        </div>
      </div>
      <div className="card-footer">
        <div className="card-footer-start">
          <CalendarFold className="icon med-grey xs" />
          <div className="due-date">
            {dueDate ? formattedDueDate : 'No Due Date'}
          </div>
        </div>
        <div className="card-footer-end">
          {status === 'done' ? (
            <CircleCheck className="icon green lg" />
          ) : (
            <div>
              <button
                className="btn icon"
                onClick={() => {
                  handleSetEditTask(id);
                  handleToggleTaskFormModal();
                }}
              >
                <Pencil className="icon med-grey xs" />
              </button>
              <button
                className="btn icon"
                onClick={() => {
                  handleSetEditTask(null);
                  handleSetDeleteTaskId(id);
                }}
              >
                <Trash2 className="icon med-grey xs" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TaskCard;
