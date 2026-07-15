import { useEffect, useReducer, useState } from 'react';

import Column from './Column';
import TaskFormModal from './TaskFormModal';
import BoardToolbar from './Toolbar';

import type { Task, TaskStatus } from '../../shared/types/tasks';
import type { TaskAction, sortOptions } from '../types/task';
import { PRIORITY_ORDER } from '../types/task';

import { columns, boardTitle, boardSubtitle } from '../data/board';

import '../styles/Board.css';
import DeleteModal from './DeleteModal';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../services/taskService';
// import { EllipsisVertical } from 'lucide-react';

function Board() {
  const [title, setTitle] = useState(boardTitle);
  const [subtitle, setSubtitle] = useState(boardSubtitle);

  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [serachText, setSearchText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState<sortOptions>('newest');
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      const tasks = await getTasks();
      dispatch({ type: 'LOAD_TASKS', payload: tasks });
    }
    void loadTasks();
  }, []);

  async function handleSubmitTask(task: Task, type: string) {
    const { id, title, description, status, priority, dueDate, tags } = task;
    const newTask: Task = {
      id,
      title,
      description,
      status,
      priority,
      dueDate,
      tags,
    };
    if (type === 'create') {
      const createdTask = await createTask(newTask);
      dispatch({ type: 'ADD_TASK', payload: createdTask });
    } else if (type === 'edit') {
      await updateTask(newTask.id, newTask);
      dispatch({ type: 'UPDATE_TASK', payload: newTask });
    }
  }

  function handleSetEditTask(id: string | null) {
    setCurrentlyEditing(id);
  }

  function handleSetDeleteTaskId(id: string | null) {
    setDeleteTaskId(id);
  }
  function handleConfirmDelete(id: string | null) {
    if (id === null) {
      setDeleteTaskId(null);
      return;
    }

    handleDeleteTask(id);
    setDeleteTaskId(null);
  }

  async function handleDeleteTask(id: string) {
    await deleteTask(id);
    dispatch({ type: 'DELETE_TASK', payload: id });
  }

  function handleSearchText(newSearchText: string) {
    setSearchText(newSearchText);
  }
  function handleSetSelectedStatus(newStatus: string) {
    if (newStatus === selectedStatus) {
      setSelectedStatus('');
    } else {
      setSelectedStatus(newStatus);
    }
  }
  function handleSetSelectedPriority(newPriority: string) {
    if (newPriority === selectedPriority) {
      setSelectedPriority('');
    } else {
      setSelectedPriority(newPriority);
    }
  }
  function handleSetSortBy(newSortBy: sortOptions) {
    if (newSortBy === selectedStatus) {
      setSortBy('newest');
    } else {
      setSortBy(newSortBy);
    }
  }
  function resetView() {
    setSearchText('');
    setSelectedPriority('');
    setSelectedStatus('');
    setSortBy('newest');
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLocaleLowerCase()
      .includes(serachText.toLowerCase());

    const matchesPriority = selectedPriority
      ? task.priority === selectedPriority
      : true;

    const matchesStatus = selectedStatus
      ? task.status === selectedStatus
      : true;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const sortedTaskList = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'newest') {
      return 0;
    } else if (sortBy === 'due-date') {
      return (a.dueDate || '').localeCompare(b.dueDate || '');
    } else if (sortBy === 'priority') {
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  const formattedTaskList = sortedTaskList;

  function handleToggleTaskFormModal() {
    setIsTaskFormModalOpen(!isTaskFormModalOpen);
  }

  function handleDragStart(id: string) {
    setDraggedTaskId(id);
  }

  function clearDragState() {
    setDraggedTaskId(null);
    setHoveredColumn(null);
  }

  function handleDragEnd() {
    clearDragState();
  }

  async function handleDropTask(newTaskStatus: TaskStatus) {
    if (!draggedTaskId) return;

    await updateTask(draggedTaskId, { status: newTaskStatus });

    dispatch({
      type: 'MOVE_TASK',
      payload: {
        taskId: draggedTaskId,
        status: newTaskStatus,
      },
    });
    clearDragState();
  }

  function handleHoverColumn(columnName: string) {
    setHoveredColumn(columnName);
  }

  return (
    <div className="board-page-container">
      <div className="board-header">
        <div className="board-header-start">
          <div className="board-title">{title}</div>
          <div className="board-subtitle">{subtitle}</div>
        </div>
        {/* <div className="board-header-end">
          <button className="btn icon">
            <EllipsisVertical className="icon grey lg" />
          </button>
        </div> */}
      </div>
      <div className="board-main-container">
        <BoardToolbar
          handleToggleTaskFormModal={handleToggleTaskFormModal}
          serachText={serachText}
          handleSearchText={handleSearchText}
          selectedStatus={selectedStatus}
          handleSetSelectedStatus={handleSetSelectedStatus}
          selectedPriority={selectedPriority}
          handleSetSelectedPriority={handleSetSelectedPriority}
          sortBy={sortBy}
          handleSetSortBy={handleSetSortBy}
          resetView={resetView}
        />

        <div className="board-body">
          {columns.map((column) => {
            const columnTasks = formattedTaskList.filter(
              (task) => task.status === column.status,
            );
            return (
              <Column
                key={column.id}
                columnName={column.title}
                columnStatus={column.status}
                tasks={columnTasks}
                handleSetEditTask={handleSetEditTask}
                handleSetDeleteTaskId={handleSetDeleteTaskId}
                handleToggleTaskFormModal={handleToggleTaskFormModal}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDropTask={handleDropTask}
                handleHoverColumn={handleHoverColumn}
                draggedTaskId={draggedTaskId}
                hoveredColumn={hoveredColumn}
              />
            );
          })}
        </div>
      </div>
      {isTaskFormModalOpen ? (
        <TaskFormModal
          tasks={tasks}
          handleSubmitTask={handleSubmitTask}
          currentlyEditing={currentlyEditing}
          handleSetEditTask={handleSetEditTask}
          handleToggleTaskFormModal={handleToggleTaskFormModal}
        />
      ) : (
        ''
      )}
      {deleteTaskId ? (
        <DeleteModal
          tasks={tasks}
          deleteTaskId={deleteTaskId}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : (
        ''
      )}
    </div>
  );
}

function taskReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
    case 'LOAD_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...tasks, action.payload];
    case 'UPDATE_TASK':
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    case 'DELETE_TASK':
      return tasks.filter((task) => task.id !== action.payload);
    case 'MOVE_TASK':
      return tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, status: action.payload.status };
        }
        return task;
      });

    default:
      return tasks;
  }
}

export default Board;
