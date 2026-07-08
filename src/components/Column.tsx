import TaskCard from './TaskCard';

import type { Task, TaskStatus } from '../types/task';

import '../styles/Column.css';
import { Inbox } from 'lucide-react';

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
        <div className="column-header-title">{columnName}</div>
        <div className="badge">{tasks.length}</div>
      </div>
      <div>
        {hasNoTasks ? (
          <div
            className={`empty-state-message
            ${isDragging ? 'dragging' : ''} 
            ${isHovered ? 'hovered' : ''}`}
          >
            <Inbox className="icon xl" />
            <div className="empty-state-message-header">No tasks yet</div>
            <div
              className={`empty-state-message-main
              ${isDragging ? 'dragging' : ''} 
              ${isHovered ? 'hovered' : ''}`}
            >
              Drag tasks here or create a new task
            </div>
          </div>
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
