import { useState } from 'react';

import type { Task } from '../../shared/types/tasks';
import type { TaskFormState } from '../types/task';
import CustomDropdown from './customDropdown';
import { priorityList, taskStatusList } from '../data/tasks';

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

  function handleSetFormState<K extends keyof Task>(
    stateKey: K,
    value: Task[K],
  ) {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [stateKey]: value,
    }));
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container task-modal">
        <div className="modal-header">
          <div className="modal-title">
            {currentlyEditing ? 'Edit a Task' : 'Create a New Task'}
          </div>
        </div>
        <div className="modal-body">
          <div className="form-container">
            <div className="form-row">
              <div className="form-item">
                <div className="input-label">Title</div>
                <div className="input-container">
                  <input
                    className="inpt"
                    placeholder="Enter task title"
                    value={formState.title}
                    onChange={(e) => {
                      setFormState({ ...formState, title: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="input-label">Status</div>
                <CustomDropdown
                  options={taskStatusList}
                  placeholderText={`Status`}
                  selectedOption={formState.status}
                  onChange={(value) => handleSetFormState('status', value)}
                  showOptionIcons
                />
              </div>
              <div className="form-item">
                <div className="input-label">Priority</div>
                <CustomDropdown
                  options={priorityList}
                  placeholderText={`Priority`}
                  selectedOption={formState.priority}
                  onChange={(value) => handleSetFormState('priority', value)}
                  showOptionIcons
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="input-label">Due Date</div>
                <div className="input-container">
                  <input
                    className="inpt"
                    type="date"
                    value={formState.dueDate ?? ''}
                    onChange={(e) => {
                      setFormState({ ...formState, dueDate: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="input-label">Description</div>
                <textarea
                  className="txt-area"
                  placeholder="Add a description..."
                  value={formState.description}
                  onChange={(e) => {
                    setFormState({ ...formState, description: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="input-label">
                  Tags: Insert as a comma seperated list
                </div>
                <div className="input-container">
                  <input
                    className="inpt"
                    placeholder="Frontend, Bug, Urgent"
                    value={formState.tags}
                    onChange={(e) => {
                      const inputArr = e.target.value.split(',');
                      setFormState({ ...formState, tags: inputArr });
                    }}
                  ></input>
                </div>
                <div className="input-helper-text">
                  Seperate tags with commas.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn secondary"
            onClick={() => {
              resetChanges();
              handleToggleTaskFormModal();
            }}
          >
            Cancel
          </button>
          <button
            className="btn primary"
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
