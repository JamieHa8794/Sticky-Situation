import TaskCard from './TaskCard';

import type { Task } from '../types/task';

import '../styles/Column.css';

type ColumnProps = {
  columnName: string;
  tasks: Task[];

  handleSetEditTask: (id: string) => void;
};

function Column({ columnName, tasks, handleSetEditTask }: ColumnProps) {
  const hasNoTasks = tasks.length === 0;

  return (
    <div>
      <div>
        <div className="column-header">
          <div>{columnName}</div>
        </div>
        <div>
          {hasNoTasks ? (
            <div className="empty-state-message">No Tasks Yet</div>
          ) : (
            tasks.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleSetEditTask={handleSetEditTask}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
export default Column;
