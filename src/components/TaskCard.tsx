import type { Task } from '../types/task';

import '../styles/TaskCard.css';

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task: { title, description, status } }: TaskCardProps) {
  return (
    <div>
      <div className="card-container">
        <div>{title}</div>
        <div>{description}</div>
        <div>{status}</div>
      </div>
    </div>
  );
}
export default TaskCard;
