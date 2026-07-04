import { useEffect, useReducer, useState } from 'react';

import Column from './Column';
import TaskForm from './TaskForm';

import type { Task, TaskAction } from '../types/task';
import { tasks as InitialTasks } from '../data/tasks';

import '../styles/Board.css';

function Board() {
  const columns = [
    { id: 1, title: 'To Do', status: 'todo' },
    { id: 2, title: 'In Progress', status: 'in-progress' },
    { id: 3, title: 'Done', status: 'done' },
  ];

  const [tasks, dispatch] = useReducer(taskReducer, undefined, getInitialTasks);
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [serachText, setSearchText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleSubmitTask(task: Task, type: string) {
    const { id, title, description, status, priority, dueDate } = task;
    const newTask: Task = {
      id,
      title,
      description,
      status,
      priority,
      dueDate,
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

  function handleDeleteTask(id: string) {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }

  function getFilteredTasks() {
    const filteredTitle = tasks.filter((task) => {
      return task.title.toLowerCase().includes(serachText.toLowerCase());
    });

    if (selectedPriority) {
      return filteredTitle.filter((task) => task.priority === selectedPriority);
    } else {
      return filteredTitle;
    }
  }
  const filteredTasks = getFilteredTasks();

  return (
    <div>
      <TaskForm
        key={currentlyEditing ?? 'create'}
        tasks={tasks}
        handleSubmitTask={handleSubmitTask}
        currentlyEditing={currentlyEditing}
        handleSetEditTask={handleSetEditTask}
      />
      <div className="board-container">
        <div className="board-toolbar">
          <input
            placeholder="Search"
            value={serachText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value={''}>Filter by Priority</option>
            <option value={'low'}>Low</option>
            <option value={'medium'}>Medium</option>
            <option value={'high'}>High</option>
          </select>
        </div>
        <div className="column-container">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.status,
            );
            return (
              <Column
                key={column.id}
                columnName={column.title}
                tasks={columnTasks}
                handleSetEditTask={handleSetEditTask}
                handleDeleteTask={handleDeleteTask}
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

    default:
      return tasks;
  }
}

export default Board;
