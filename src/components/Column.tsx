import TaskCard from './TaskCard';

import type { Task } from '../types/task';

import '../styles/Column.css';

type ColumnProps = {
  columnName: string;
  tasks: Task[];
};

function Column({ columnName, tasks }: ColumnProps) {
  return (
    <div>
      <div>
        <div className="column-header">
          <div>{columnName}</div>
        </div>
        <div>
          {tasks.map((task) => {
            return <TaskCard key={task.id} task={task} />;
          })}
        </div>
      </div>
    </div>
  );
}
export default Column;
