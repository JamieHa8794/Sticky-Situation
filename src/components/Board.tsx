import { useEffect, useReducer, useState } from 'react';

import Column from './Column';
import TaskFormModal from './TaskFormModal';
import BoardToolbar from './BoardToolBar';

import type { Task, TaskAction, TaskStatus, sortOptions } from '../types/task';
import { PRIORITY_ORDER } from '../types/task';
import { tasks as InitialTasks } from '../data/tasks';

import { columns } from '../data/board';

import '../styles/Board.css';
import DeleteModal from './DeleteModal';

function Board() {
  const [tasks, dispatch] = useReducer(taskReducer, undefined, getInitialTasks);
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [serachText, setSearchText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState<sortOptions>('default');
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleSubmitTask(task: Task, type: string) {
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
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } else if (type === 'edit') {
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

  function handleDeleteTask(id: string) {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }

  function handleSearchText(newSearchText: string) {
    setSearchText(newSearchText);
  }
  function handleSetSelectedStatus(newStatus: string) {
    setSelectedStatus(newStatus);
  }
  function handleSetSelectedPriority(newPriority: string) {
    setSelectedPriority(newPriority);
  }
  function handleSetSortBy(newSortBy: sortOptions) {
    setSortBy(newSortBy);
  }
  function resetView() {
    setSearchText('');
    setSelectedPriority('');
    setSelectedStatus('');
    setSortBy('default');
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
    if (sortBy === 'default') {
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

  function handleDropTask(newTaskStatus: TaskStatus) {
    if (!draggedTaskId) return;

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
    <div>
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
      <div className="board-container">
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
    </div>
  );
}

function getInitialTasks() {
  const savedData = localStorage.getItem('tasks');
  if (savedData) {
    return JSON.parse(savedData);
  }
  return InitialTasks;
}

function taskReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
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
