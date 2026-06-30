import type { Task } from '../types/task';

import '../styles/TaskCard.css';

type TaskCardProps = {
  task: Task;
  handleSetEditTask: (id: string) => void;
};

function TaskCard({
  task: { id, title, description, status },
  handleSetEditTask,
}: TaskCardProps) {
  return (
    <div>
      <div className="card-container">
        <div className="card-header">
          <div>{title}</div>
        </div>
        <div className="card-body">
          <div>{description}</div>
          <div>{status}</div>
        </div>
        <div className="card-footer">
          <button
            onClick={() => {
              handleSetEditTask(id);
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
