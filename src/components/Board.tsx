import { useEffect, useReducer, useState } from 'react';

import Column from './Column';
import TaskFormModal from './TaskFormModal';

import type { Task, TaskAction, TaskStatus, sortOptions } from '../types/task';
import { PRIORITY_ORDER } from '../types/task';
import {
  tasks as InitialTasks,
  taskStatusList,
  priorityList,
} from '../data/tasks';

import { columns, sortList } from '../data/board';

import '../styles/Board.css';
import DeleteModal from './DeleteModal';

function Board() {
  const [tasks, dispatch] = useReducer(taskReducer, undefined, getInitialTasks);
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [serachText, setSearchText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelctedStatus] = useState('');
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

  function getFilteredTasks() {
    let filteredTaskList = tasks.filter((task) => {
      return task.title.toLowerCase().includes(serachText.toLowerCase());
    });

    if (selectedPriority) {
      filteredTaskList = filteredTaskList.filter(
        (task) => task.priority === selectedPriority,
      );
    }
    if (selectedStatus) {
      filteredTaskList = filteredTaskList.filter(
        (task) => task.status === selectedStatus,
      );
    }

    return filteredTaskList;
  }
  const filteredTasks = getFilteredTasks();

  function resetView() {
    setSearchText('');
    setSelectedPriority('');
    setSelctedStatus('');
    setSortBy('default');
  }

  function sortTasks() {
    if (sortBy === 'default') {
      return filteredTasks;
    } else if (sortBy === 'due-date') {
      return filteredTasks.sort((a, b) =>
        (a.dueDate || '').localeCompare(b.dueDate || ''),
      );
    } else if (sortBy === 'priority') {
      return filteredTasks.sort((a, b) => {
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      });
    } else if (sortBy === 'title') {
      return filteredTasks.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
  }

  const sortedTaskList = sortTasks();
  const formattedTaskList = sortedTaskList || [];

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
        <div className="board-toolbar">
          <div className="board-toolbar-start">
            <button onClick={handleToggleTaskFormModal}>Create New Task</button>
          </div>
          <div className="board-toolbar-end">
            <div className="board-toolbar-item">
              <input
                placeholder="Search"
                value={serachText}
                onChange={(e) => setSearchText(e.target.value)}
              ></input>
            </div>
            <div className="board-toolbar-item">
              <select
                value={selectedStatus}
                onChange={(e) => setSelctedStatus(e.target.value)}
              >
                <option value={''}>Filter by Status</option>
                {taskStatusList.map((status, idx) => {
                  return (
                    <option value={status.key} key={idx}>
                      {status.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="board-toolbar-item">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value={''}>Filter by Priority</option>
                {priorityList.map((priorityItem, idx) => {
                  return (
                    <option value={priorityItem.key} key={idx}>
                      {priorityItem.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="board-toolbar-item">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as sortOptions)}
              >
                {sortList.map((sortListItem, idx) => {
                  return (
                    <option value={sortListItem.key} key={idx}>
                      {sortListItem.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="board-toolbar-item">
              <button onClick={resetView}>Reset View</button>
            </div>
          </div>
        </div>

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
