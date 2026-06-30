import { useState } from 'react';
import '../styles/TaskForm.css';

import type { Task } from '../types/task';

type CreateTaskProps = {
  tasks: Task[];
  currentlyEditing: string | null;
  handleSubmitTask: (task: Task, type: string) => void;
  handleSetEditTask: (id: string | null) => void;
};

function TaskForm(props: CreateTaskProps) {
  const editTask = getEditTask();

  const [title, setTitle] = useState(editTask ? editTask.title : '');
  const [description, setDescription] = useState(
    editTask ? editTask.description : '',
  );

  function getEditTask() {
    if (props.currentlyEditing === 'create') return null;

    const editTask =
      props.tasks.find((task) => task.id === props.currentlyEditing) || null;

    return editTask;
  }

  function onSubmitTask() {
    const task: Task = {
      id: editTask?.id || crypto.randomUUID(),
      title,
      description,
      status: editTask?.status || 'todo',
    };
    const type = editTask ? 'edit' : 'create';
    props.handleSubmitTask(task, type);
    props.handleSetEditTask(null);
    setTitle('');
    setDescription('');
  }

  function resetChanges() {
    props.handleSetEditTask(null);
    setTitle('');
    setDescription('');
  }

  return (
    <div>
      <div className="create-task-container">
        <div className="modal-header">
          <div>
            {props.currentlyEditing ? 'Edit a Task' : 'Create a New Task'}
          </div>
        </div>
        <div className="form-container">
          <div className="input-container">
            <div className="input-label">Title</div>
            <input
              placeholder="Insert Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div className="input-container">
            <div className="input-label">Description</div>
            <input
              placeholder="Insert Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
          </div>
          <button onClick={resetChanges}>Cancel</button>
          <button onClick={onSubmitTask}>
            {editTask ? 'Edit Task' : 'Create New Task'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
