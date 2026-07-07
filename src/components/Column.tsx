import TaskCard from './TaskCard';

import type { Task, TaskStatus } from '../types/task';

import '../styles/Column.css';

type ColumnProps = {
  columnName: string;
  columnStatus: TaskStatus;
  tasks: Task[];
  draggedTaskId: string | null;
  hoveredColumn: string | null;

  handleSetEditTask: (id: string | null) => void;
  handleSetDeleteTaskId: (id: string) => void;
  handleToggleTaskFormModal: () => void;
  handleDragStart: (id: string) => void;
  handleDragEnd: () => void;
  handleDropTask: (newTaskStatus: TaskStatus) => void;
  handleHoverColumn: (columnName: string) => void;
};

function Column(props: ColumnProps) {
  const {
    columnName,
    columnStatus,
    tasks,
    handleSetEditTask,
    handleSetDeleteTaskId,
    handleToggleTaskFormModal,
    handleDragStart,
    handleDragEnd,
    handleDropTask,
    handleHoverColumn,
    draggedTaskId,
    hoveredColumn,
  } = props;
  const hasNoTasks = tasks.length === 0;

  const isDragging = !!draggedTaskId;
  const isHovered = isDragging && hoveredColumn === columnName;

  return (
    <div
      className={`column-container 
        ${isDragging ? 'dragging' : ''} 
        ${isHovered ? 'hovered' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        handleHoverColumn(columnName);
      }}
      onDrop={() => {
        handleDropTask(columnStatus);
      }}
    >
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
                handleSetDeleteTaskId={handleSetDeleteTaskId}
                handleToggleTaskFormModal={handleToggleTaskFormModal}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                draggedTaskId={draggedTaskId}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
export default Column;
