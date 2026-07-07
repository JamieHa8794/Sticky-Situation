import { useState } from 'react';
import '../styles/TaskFormModal.css';

import type {
  Task,
  TaskStatus,
  TaskPriority,
  TaskFormState,
} from '../types/task';

type CreateTaskProps = {
  tasks: Task[];
  currentlyEditing: string | null;
  handleSubmitTask: (task: Task, type: string) => void;
  handleSetEditTask: (id: string | null) => void;
  handleToggleTaskFormModal: () => void;
};

function TaskFormModal(props: CreateTaskProps) {
  const {
    tasks,
    currentlyEditing,
    handleSubmitTask,
    handleSetEditTask,
    handleToggleTaskFormModal,
  } = props;

  const editTask = getEditTask();

  function getEditTask() {
    if (currentlyEditing === 'create') return null;

    const editTask = tasks.find((task) => task.id === currentlyEditing) || null;

    return editTask;
  }

  const initialFormState: TaskFormState = editTask
    ? {
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
        priority: editTask.priority,
        dueDate: editTask.dueDate,
        tags: editTask.tags,
      }
    : {
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        tags: [],
      };

  const [formState, setFormState] = useState<TaskFormState>(initialFormState);

  function onSubmitTask() {
    const formattedTags = formState.tags
      .filter((x) => x.trim() !== '')
      .map((x) => x.trim());

    const task: Task = {
      id: editTask?.id || crypto.randomUUID(),
      title: formState.title.trim(),
      description: formState.description.trim(),
      status: formState.status,
      priority: formState.priority,
      dueDate: formState.dueDate,
      tags: formattedTags,
    };
    const type = editTask ? 'edit' : 'create';
    handleSubmitTask(task, type);
    resetChanges();
  }

  function resetChanges() {
    handleSetEditTask(null);
    setFormState({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      tags: [],
    });
  }

  return (
    <div className="modal-overlay">
      <div className="task-modal-container">
        <div className="modal-header">
          <div>{currentlyEditing ? 'Edit a Task' : 'Create a New Task'}</div>
        </div>
        <div className="form-container">
          <div className="input-container">
            <div className="input-label">Title</div>
            <input
              placeholder="Insert Title"
              value={formState.title}
              onChange={(e) => {
                setFormState({ ...formState, title: e.target.value });
              }}
            ></input>
          </div>
          <div className="input-container">
            <div className="input-label">Description</div>
            <input
              placeholder="Insert Description"
              value={formState.description}
              onChange={(e) => {
                setFormState({ ...formState, description: e.target.value });
              }}
            ></input>
          </div>
          <div className="input-container">
            <div className="input-label">Status</div>
            <select
              value={formState.status}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  status: e.target.value as TaskStatus,
                })
              }
            >
              <option value={'todo'}>To Do</option>
              <option value={'in-progress'}>In Progress</option>
              <option value={'done'}>Done</option>
            </select>
          </div>
          <div className="input-container">
            <div className="input-label">Priority</div>
            <select
              value={formState.priority}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  priority: e.target.value as TaskPriority,
                });
              }}
            >
              <option value={'low'}>Low</option>
              <option value={'medium'}>Medium</option>
              <option value={'high'}>High</option>
            </select>
          </div>
          <div className="input-container">
            <div className="input-label">Due Date</div>
            <input
              type="date"
              value={formState.dueDate ?? ''}
              onChange={(e) => {
                setFormState({ ...formState, dueDate: e.target.value });
              }}
            ></input>
          </div>
          <div className="input-container">
            <div className="input-label">
              Tags: Insert as a comma seperated list
            </div>
            <input
              value={formState.tags}
              onChange={(e) => {
                const inputArr = e.target.value.split(',');
                setFormState({ ...formState, tags: inputArr });
              }}
            ></input>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              resetChanges();
              handleToggleTaskFormModal();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmitTask();
              handleToggleTaskFormModal();
            }}
          >
            {editTask ? 'Edit Task' : 'Create New Task'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskFormModal;
