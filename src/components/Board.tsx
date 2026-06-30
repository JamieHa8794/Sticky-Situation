import { useState } from 'react';

import Column from './Column';
import TaskForm from './TaskForm';

import type { Task } from '../types/task';
import { tasks as InitialTasks } from '../data/tasks';

import '../styles/Board.css';

function Board() {
  const columns = [
    { id: 1, title: 'To Do', status: 'todo' },
    { id: 2, title: 'In Progress', status: 'in-progress' },
    { id: 3, title: 'Done', status: 'done' },
  ];

  const [tasks, setTasks] = useState<Task[]>(InitialTasks);
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);

  function handleSubmitTask(task: Task, type: string) {
    const { id, title, description, status } = task;
    const newTask: Task = {
      id,
      title,
      description,
      status,
    };
    if (type === 'create') {
      setTasks([...tasks, newTask]);
    } else if (type === 'edit') {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks([...filteredTasks, newTask]);
    }
  }

  function handleSetEditTask(id: string | null) {
    setCurrentlyEditing(id);
  }

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
        <div className="column-container">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.status,
            );
            return (
              <Column
                key={column.id}
                columnName={column.title}
                tasks={columnTasks}
                handleSetEditTask={handleSetEditTask}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Board;
