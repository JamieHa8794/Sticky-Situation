import { formatDateString, formatToProperCase } from '../utils';

import type { Task } from '../types/task';

import '../styles/TaskCard.css';

type TaskCardProps = {
  task: Task;
  handleSetEditTask: (id: string | null) => void;
  handleSetDeleteTaskId: (id: string) => void;
  handleToggleTaskFormModal: () => void;
};

function TaskCard(props: TaskCardProps) {
  const {
    task: { id, title, description, priority, dueDate, tags },
    handleSetEditTask,
    handleSetDeleteTaskId,
    handleToggleTaskFormModal,
  } = props;

  const formattedDueDate = formatDateString(dueDate);
  const formattedPriority = formatToProperCase(priority);

  return (
    <div>
      <div className="card-container">
        <div className="card-header">
          <div>{title}</div>
          <button
            onClick={() => {
              handleSetEditTask(null);
              handleSetDeleteTaskId(id);
            }}
          >
            X
          </button>
        </div>
        <div className="card-body">
          <div>{description}</div>
          <div>{formattedPriority}</div>
          <div>{formattedDueDate}</div>
          <div className="tag-container">
            {tags.map((tag, idx) => {
              return <li key={idx}>#{tag}</li>;
            })}
          </div>
        </div>
        <div className="card-footer">
          <button
            onClick={() => {
              handleSetEditTask(id);
              handleToggleTaskFormModal();
            }}
          >
            Edit Card
          </button>
        </div>
      </div>
    </div>
  );
}
export default TaskCard;
